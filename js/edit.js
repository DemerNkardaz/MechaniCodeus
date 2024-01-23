$(document).ready(function () {
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
    var editor = ContentTools.EditorApp.get();

    $("#makeNewPage").on("click", function () {
        $("#pageNameModal").modal('show');
    });

    $("#savePageNameBtn").on("click", function () {
        var pageName = $("#pageNameInput").val();
        var mainTags = $("#pageMainTagsInput").val();
        var secondTags = $("#pageSecondTagsInput").val();

        $("#contentAreaContainer").load("html/pages/create_page.html", function () {
            $('*[data-editable]').find('*').attr('contenteditable', 'true');
            editor.init('*[data-editable]', 'data-name');

            $("#contentAreaContainer").html(function (i, html) {
                return html.replace('{NewPage}', pageName)
                    .replace('{MainTags}', mainTags.replace(/, /g, '&#8198;'))
                    .replace('{SecondaryTags}', secondTags.replace(/, /g, '<br>'));
            });

            $("#pageNameModal").modal('hide');
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