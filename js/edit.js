import { tagReplacements, decodeTagsReplaces, refreshCodeHighlight, disableCodeHighlight } from './page.js';
import { updateLanguage, selectedLanguage, langSelectOption } from './lang.js';
import * as $item from './variables.js';
$(document).ready(function () {
    $("#showThePageCommands").click(function () {
        var buttonRoll = $("#homePageButtonRoll");
        var currentMargin = parseInt(buttonRoll.css("margin-left"));
        if (currentMargin === -35) {
            buttonRoll.animate({ marginLeft: 15 }, { duration: 400, easing: 'easeOutQuad' });
            $("#showThePageCommands").removeClass('more');
            $("#showThePageCommands").addClass('more_active');

        } else {
            buttonRoll.animate({ marginLeft: -35 }, { duration: 250, easing: 'easeInQuad' });
            $("#showThePageCommands").removeClass('more_active');
            $("#showThePageCommands").addClass('more');
        }
    });


    $("#downloadCurrentPage").on("click", function () {
        var contentHtml = $("#contentAreaContainer").html();
        var blob = new Blob([contentHtml], { type: "text/html" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "page.html";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    $('#editCurrentPage').attr('data-state', 'off').text('edit');
    $('#codeCurrentPage').attr('data-state', 'off').text('code');

    $('#editCurrentPage').on('click', function () {
        var currentState = $(this).attr('data-state') || 'off';
        if (currentState === 'off') {
            $(this).attr('data-state', 'on');
            $(this).text('edit_off');

            $item.rightContainer.attr('contentEditable', 'true');
        } else {
            $(this).attr('data-state', 'off');
            $(this).text('edit');

            $item.rightContainer.attr('contentEditable', 'false');
        }
    });


  $('#codeCurrentPage').on('click', function () {
    var currentState = $(this).attr('data-state') || 'off';
    var $contentAreaContainer = $item.rightContainer.find('#contentAreaContainer');

    if (currentState === 'off') {
      $(this).attr('data-state', 'on');
      $(this).text('code_off');

      $contentAreaContainer.wrapInner('<pre><code class="language-html"></code></pre>');
      var $codeElement = $contentAreaContainer.find('pre code');

      $codeElement.html(function (_, oldHtml) {
        return oldHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      });
      hljs.initHighlightingOnLoad();


    } else {

      $(this).attr('data-state', 'off');
      $(this).text('code');
      $contentAreaContainer.children().children().contents().unwrap().unwrap();
      let collectText = $contentAreaContainer.text().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      $contentAreaContainer.html(collectText);
      //$contentAreaContainer.find('pre code').html(function (_, oldHtml) {
      //  return oldHtml.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      //});

      $contentAreaContainer.find('pre code').contents().unwrap().unwrap();
    }
  });



    $('#homePageControls *').on("click", function () {
        $(this).tooltip('dispose');
        $(this).tooltip('show');
    });


    var editor = ContentTools.EditorApp.get();

    $("#makeNewPage").on("click", function () {
        $("#pageNameModal").modal('show');
    });

    $("#savePageNameBtn").on("click", function () {

        var pageName = $("#pageNameInput").val();
        var mainTags = $("#pageMainTagsInput").val();
        var secondTags = $("#pageSecondTagsInput").val();
        var authorName = $("#pageAuthorNameInput").val();
        var authorURL = $("#pageAuthorURLInput").val();

        $("#contentAreaContainer").load("html/pages/create_page.html", function () {
            var $editableElement = $item.rightContainer.find('element-trigger[data-editable="true"]');
            if ($editableElement.length > 0) {
                editor.init($item.rightContainer.children(), 'data-name');
            }

            $("#contentAreaContainer").html(function (i, html) {
                html = html.replace('{NewPage}', pageName)
                    .replace('{MainTags}', mainTags.replace(/, /g, '&#8198;'))
                    .replace('{SecondaryTags}', secondTags.replace(/, /g, '<br>'));

                if (authorName) {
                    if (authorURL) {
                        html = html.replace('{AuthorName}', '<a href="' + authorURL + '">' + authorName + '</a>');
                    } else {
                        html = html.replace('{AuthorName}', authorName);
                    }
                } else {
                    html = html.replace('{AuthorName}', '<i><span data-key="UnknownEntity"></span></i>');
                }

                return html;
            });

            $("#pageNameModal").modal('hide');
            tagReplacements();
            updateLanguage(selectedLanguage);

        });
    });

    function split(val) {
        return val.split(/,\s*/);
    }
    function extractLast(term) {
        return split(term).pop();
    }
    $("#pageMainTagsInput").on("click", function () {
        $(this).autocomplete("search", "");
    });

    $("#pageMainTagsInput").autocomplete({
        source: [
            "tag_ability",
            "tag_addons",
            "tag_entity",
            "tag_formations",
            "tag_modifiers",
            "tag_race",
            "tag_requirements",
            "tag_research",
            "tag_squad",
            "tag_tables",
            "tag_tuning",
            "tag_types",
            "tag_weapon",
            "tag_lua",
            "tag_scar",
            "tag_map",
            "tag_guide",
            "tag_ui",
            "tag_3d",
            "tag_textures",
            "tag_fx",
            "tag_sfx"
        ],
        minLength: 0,
        autoFocus: true,
        select: function (event, ui) {
            var terms = split(this.value);
            terms.pop();
            terms.push(ui.item.value);
            terms.push("");
            this.value = terms.join(", ");
            return false;
        },
        search: function () {
            $(this).autocomplete("widget").css("display", "block");
        }
    });
    $("#pageSecondTagsInput").on("click", function () {
        $(this).autocomplete("search", "");
    });

    $("#pageSecondTagsInput").autocomplete({
        source: [
            "tag_abilityext",
            "tag_addonext",
            "tag_ebpextension",
            "tag_raceextension",
            "tag_requiredextension",
            "tag_researchextension",
            "tag_sbpextension",
            "tag_weapextension"
        ],
        minLength: 0,
        autoFocus: true,
        select: function (event, ui) {
            var terms = split(this.value);
            terms.pop();
            terms.push(ui.item.value);
            terms.push("");
            this.value = terms.join(", ");
            return false;
        },
        search: function () {
            $(this).autocomplete("widget").css("display", "block");
        }
    });

});