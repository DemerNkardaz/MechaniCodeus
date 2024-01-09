

function initializePage() {
    function generateMeaningfulBinaryCode(length) {
        let binaryCode = '';
        for (let i = 0; i < length; i++) {
            const randomBit = Math.round(Math.random());
            binaryCode += randomBit;
        }
        return binaryCode;
    }

    $(document).ready(function () {
        $(':header').each(function () {
            var headerLevel = parseInt(this.tagName.substring(1));
            var baseSize = 1.75;
            var newSize = baseSize - (headerLevel - 1) * 0.15;

            $(this).css({
                'font-size': 'calc(' + newSize + 'em)',
                'font-weight': '700'
            });
        });

        const binaryCodeElement = $('#LexMechanicus').find('span:first');
        const dotsElement = $('#LexMechanicus').find('span').eq(1);

        let binaryCodeIntervalId, dotsIntervalId;
        let numDots = 1;

        function updateBinaryCode() {
            const meaningfulBinaryCode = generateMeaningfulBinaryCode(25);
            binaryCodeElement.text(meaningfulBinaryCode);
        }

        function updateDots() {
            dotsElement.text('.'.repeat(numDots));

            numDots++;
            if (numDots > 5) {
                numDots = 1;
            }
        }

        $('#LexGearus').on({
            mouseover: function () {
                binaryCodeElement.addClass('animated');
                dotsElement.addClass('animated');

                binaryCodeElement.css({
                    'font-family': 'Tektur',
                    'font-size': '0.6em'
                });
                dotsElement.css({
                    'font-family': 'Tektur',
                    'font-size': '0.6em'
                });

                updateBinaryCode();
                binaryCodeIntervalId = setInterval(updateBinaryCode, 50);

                updateDots();
                dotsIntervalId = setInterval(updateDots, 500);
            },
            mouseout: function () {
                binaryCodeElement.removeClass('animated');
                dotsElement.removeClass('animated');

                clearInterval(binaryCodeIntervalId);
                clearInterval(dotsIntervalId);

                let remainingTime = 700;
                const originalTextElement = $('#LexMechanicus span:first');
                const dataKey = originalTextElement.data('key');

                const generateAfterMouseout = function () {
                    if (remainingTime > 0) {
                        updateBinaryCode();
                        updateDots();
                        remainingTime -= 50;
                        setTimeout(generateAfterMouseout, 50);
                    } else {
                        const selectedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
                        $.getJSON('ss/lang_' + selectedLanguage + '.json', function (data) {
                            originalTextElement.text(data.items[0][dataKey]);
                            dotsElement.text('');

                            binaryCodeElement.css({
                                'font-family': '',
                                'font-size': ''
                            });
                            dotsElement.css({
                                'font-family': '',
                                'font-size': ''
                            });
                        });
                    }
                };


                setTimeout(generateAfterMouseout, 50);
            }
        });

        // Add icon after external links
        $('a[href^="http://"], a[href^="https://"]').each(function () {
            var existingSpans = $(this).find('.material-icons.external');

            if (existingSpans.length === 0 && !$(this).children('img').length) {
                $(this).append('<span class="material-icons external">launch</span>');
            }
        });

        // Language setup
        var languages = [
            { code: 'la', short: 'AG', name: 'Altum Gothicum', flag: '🏛️' },
            { code: 'en', short: 'EN', name: 'English', flag: '🇺🇸' },
            { code: 'ru', short: 'РУ', name: 'Русский', flag: '🇷🇺' },
            { code: 'jp', short: '日本語', name: '日本語', flag: '🇯🇵' },
        ];

        var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

        var selectHtml = '<div class="custom-select" id="languageSelectWrapper">';
        selectHtml += '<div class="select-styled" id="languageSelect">' + getSelectedLanguageName(selectedLanguage) + '</div>';
        selectHtml += '<ul class="select-options">';
        for (var i = 0; i < languages.length; i++) {
            var selected = languages[i].code === selectedLanguage ? 'selected' : '';
            selectHtml += '<li data-value="' + languages[i].code + '" ' + selected + '>' + languages[i].flag + ' ' + languages[i].name + '</li>';
        }
        selectHtml += '</ul></div>';

        $('#languageSelectorContainer').html(selectHtml);

        // Добавляем обработчик события для открытия/закрытия списка
        $('#languageSelect').on('click', function () {
            $(this).toggleClass('active');
            $('.select-options').toggleClass('active');
        });

        // Добавляем обработчик события для выбора языка
        $('#languageSelectWrapper li').on('click', function () {
            var selectedLanguage = $(this).data('value');
            updateLanguage(selectedLanguage);

            // Закрываем список после выбора
            $('#languageSelect').removeClass('active');
            $('.select-options').removeClass('active');
        });

        // Добавляем обработчик события для скрытия блока выбора языка при клике за его пределами
        $(document).on('click', function (event) {
            var languageSelectWrapper = $('#languageSelectWrapper');

            // Проверяем, был ли клик вне блока выбора языка
            if (!languageSelectWrapper.is(event.target) && languageSelectWrapper.has(event.target).length === 0) {
                // Если клик был вне блока, скрываем его
                $('#languageSelect').removeClass('active');
                $('.select-options').removeClass('active');
            }
        });

        function updateLanguage(selectedLanguage) {
            var htmlElement = document.querySelector('html');
            htmlElement.setAttribute('lang', selectedLanguage);

            $('#languageSelect').html(getSelectedLanguageName(selectedLanguage));


            // Сохраняем выбранный язык в кеше
            localStorage.setItem('selectedLanguage', selectedLanguage);

            $.getJSON('ss/lang_' + selectedLanguage + '.json', function (data) {
                $('[data-key]').each(function () {
                    var dataKey = $(this).data('key');
                    $(this).html(data.items[0][dataKey]);
                });
                updatePlaceholderText(data);
            });
        }


        function getSelectedLanguageName(code) {
            for (var i = 0; i < languages.length; i++) {
                if (languages[i].code === code) {
                    return languages[i].flag + '&#8201;' + languages[i].short;
                }
            }
            return '';
        }



        function updatePlaceholderText(data) {
            var inputSearchTextPlaceholder = data.items[1].inputSearchTextPlaceholder;
            $('#searchAttrib').attr('placeholder', inputSearchTextPlaceholder);
        }

        $('#languageSelectorContainer').on('change', '#languageSelect', function () {
            var selectedLanguage = $(this).val();
            localStorage.setItem('selectedLanguage', selectedLanguage);
            updateLanguage(selectedLanguage);
        });

        updateLanguage(selectedLanguage);
    });

    // Adding N/A for undescribed attribs
    $(document).ready(function () {
        $(".container.right * li").each(function () {
            var currentText = $(this).text();
            if (currentText && !currentText.replace(/.* — /, '').trim()) {
                $(this).append(" N/A");
            }
        });
    });

    // Colorize attrib names
    $(document).ready(function () {
        setTimeout(function () {
            $('.coloredType li').each(function () {
                var text = $(this).html().trim();
                var parts = text.split(' — ');

                if (parts.length === 2 && parts[0].trim() !== "") {
                    var span = $('<span>').addClass('child_list_highlight').html(parts[0]);
                    $(this).html('').append(span).append(' — ' + parts[1]);
                }
            });
        }, 50);
    });


    $(document).ready(function () {
        var $firstSpan = $('#hierarchyAttributes li').children('span').first();
        var $lastSpan = $('#hierarchyAttributes li').children('span').last();

        $firstSpan.mouseover(function () {
            if ($(this).hasClass('hierarchical_arrow')) {
                $(this).addClass('listElement_Arrow');
            }
        });
        $firstSpan.mouseout(function () {
            $(this).removeClass('listElement_Arrow');
        });

    });

    $(document).ready(function () {
        var lastModifiedSpan = $('#lastModified');

        $.ajax({
            type: 'HEAD',
            url: window.location.href,
            success: function (data, status, xhr) {
                var lastModifiedDate = new Date(xhr.getResponseHeader('Last-Modified'));
                var formattedDate = `${addZero(lastModifiedDate.getDate())}.${addZero(lastModifiedDate.getMonth() + 1)}.${lastModifiedDate.getFullYear()} ${addZero(lastModifiedDate.getHours())}:${addZero(lastModifiedDate.getMinutes())}:${addZero(lastModifiedDate.getSeconds())}`;
                lastModifiedSpan.text(formattedDate);
            }
        });
    });
    function addZero(number) {
        return number < 10 ? '0' + number : number;
    }

    $(document).ready(function () {
        // Заменяем все вхождения тегов на соответствующий HTML-код
        $('#contentAreaContainer').html(function (index, oldHtml) {
            var replacements = {
                'tag_ability': '<span class="badge bg-primary align-self-start pink">Ability</span>',
                'tag_addons': '<span class="badge bg-primary align-self-start red">Addons</span>',
                'tag_entity': '<span class="badge bg-primary align-self-start blue">Entity</span>',
                'tag_formations': '<span class="badge bg-primary align-self-start yellow">Formations</span>',
                'tag_modifiers': '<span class="badge bg-primary align-self-start turquoise">Modifiers</span>',
                'tag_race': '<span class="badge bg-primary align-self-start darkred">Race</span>',
                'tag_requirements': '<span class="badge bg-primary align-self-start lightindigo">Requirements</span>',
                'tag_research': '<span class="badge bg-primary align-self-start grey">Research</span>',
                'tag_squad': '<span class="badge bg-primary align-self-start purple">Squad</span>',
                'tag_tables': '<span class="badge bg-primary align-self-start lightbrown">Tables</span>',
                'tag_tuning': '<span class="badge bg-primary align-self-start cyan1">Tuning</span>',
                'tag_types': '<span class="badge bg-primary align-self-start lavanda">Types</span>',
                'tag_weapon': '<span class="badge bg-primary align-self-start green">Weapon</span>',
                'tag_lua': '<span class="badge bg-primary align-self-start lua">Lua</span>',
                'tag_scar': '<span class="badge bg-primary align-self-start relic">Scar</span>',
                'tag_map': '<span class="badge bg-primary align-self-start lime">Map</span>',
                'tag_guide': '<span class="badge bg-primary align-self-start guide">Guide</span>',
                'tag_ui': '<span class="badge bg-primary align-self-start skyblue">UI</span>',
                'tag_3d': '<span class="badge bg-primary align-self-start orange">3D</span>',
                'tag_textures': '<span class="badge bg-primary align-self-start lavandadark">Textures</span>',
                'tag_fx': '<span class="badge bg-primary align-self-start lightpink">FX</span>',
                'tag_sfx': '<span class="badge bg-primary align-self-start sfx">SFX</span>',
                'tag_error': '<span class="badge bg-primary align-self-start red">ERROR</span>',

                'tag_abilityext': '<p data-key="abilextension"><i>Расширение Блюпринта Способности</i></p>',
                'tag_addonext': '<p data-key="addonextension"><i>Расширение Блюпринта Улучшения</i></p>',
                'tag_ebpextension': '<p data-key="ebpextension"><i>Расширение Блюпринта Энтити</i></p>',
                'tag_raceextension': '<p data-key="raceextension"><i>Расширение Блюпринта Расы</i></p>',
                'tag_requiredextension': '<p data-key="requiredextension"><i>Расширение Блюпринта Требований</i></p>',
                'tag_researchextension': '<p data-key="researchextension"><i>Расширение Блюпринта Исследований</i></p>',
                'tag_sbpextension': '<p data-key="sbpextension"><i>Расширение Блюпринта Отряда</i></p>',
                'tag_weapextension': '<p data-key="weapextension"><i>Расширение Блюпринта Оружия</i></p>',
            };

            for (var tag in replacements) {
                // Use word boundaries (\b) in the regular expression
                oldHtml = oldHtml.replace(new RegExp('\\b' + tag + '\\b', 'g'), replacements[tag]);
            }

            return oldHtml;
        });
    });


}

$(document).ready(function () {
    initializePage();
});


// Search

$(document).ready(function () {
    $('#searchAttrib').on('input', function () {
        var searchText = $(this).val().toLowerCase();
        $('#hierarchyMain li').hide();
        $('#hierarchyMain li:containsOrInChildren("' + searchText + '")').show();
        localStorage.setItem('lastSearch', searchText);
    });

    var lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        $('#searchAttrib').val(lastSearch).trigger('input');
    }
});

$.expr[":"].containsOrInChildren = $.expr.createPseudo(function (text) {
    return function (elem) {
        return $(elem).find('*').addBack().filter(function () {
            return $(this).text().toLowerCase().indexOf(text.toLowerCase()) !== -1;
        }).length > 0;
    };
});


let lastLoadedWikiePath = '';
let lastLoadedHierarchyPath = '';
let lastLoadedTypesPath = '';

let cachedWikiePath = localStorage.getItem('lastLoadedWikiePath');
let cachedHierarchyPath = localStorage.getItem('cachedHierarchyPath');
let cachedTypesPath = localStorage.getItem('cachedTypesPath');

let cachedGame = localStorage.getItem('cachedGame');
let lastLoadedGame = cachedGame;

let cachedOption = localStorage.getItem('cachedOption');
let lastLoadedOption = cachedOption;


function initializeRoot() {
    // Loading the info pages

    $('#hierarchyAttributes li').each(function () {
        $(this).children('span').last().each(function () {
            if (!$(this).attr('data-wikie')) {
                $(this).attr('data-wikie', 'wikies/404.html');
            }
        });

        $('span[data-wikie]').on('click', function () {
            var wikiePath = $(this).data('wikie');

            if (wikiePath !== lastLoadedWikiePath) {
                $('#contentAreaContainer').load(wikiePath, function () {
                    initializePage();
                    lastLoadedWikiePath = wikiePath;
                    localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                });
            }
        });
    });

    $('#randomPage').on('click', function () {
        $.ajax({
            url: 'https://api.github.com/repos/demernkardaz/MechaniCodeus/contents/wikies',
            success: function (data) {
                var files = data.map(function (file) {
                    return file.name;
                });
                var randomFile = files[Math.floor(Math.random() * files.length)];
                var wikiePath = 'wikies/' + randomFile;

                lastLoadedWikiePath = wikiePath;
                $('#contentAreaContainer').load(wikiePath, function () {
                    initializePage();
                    localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                });

            }
        });
    });


    // List functions
    $(document).ready(function () {

        $('#hierarchyAttributes li').each(function () {
            if ($(this).find('ul').length > 0) {
                $(this).prepend('<span class="material-icons hierarchical_arrow">chevron_right</span>');
                $(this).addClass('has-child');
            }
        });

        $('#hierarchyAttributes li.has-child').each(function () {
            var $ul = $(this).children('ul');
            $ul.hide();
            var $arrow = $(this).children('.hierarchical_arrow');

            $(this).children('.hierarchical_arrow').click(function (e) {
                e.stopPropagation();
                $ul.slideToggle({
                    duration: 'fast',
                    start: observeListState,
                    complete: observeListState,
                });
            });
            $(this).children().next().dblclick(function (e) {
                e.stopPropagation();
                $ul.slideToggle({
                    duration: 'fast',
                    start: observeListState,
                    complete: observeListState,
                });
            });

            var isAllOpen = false;

            $('#collapseShowAllLists').click(function (e) {
                var $elements = $('#hierarchyAttributes li.has-child ul');
                var $button = $(this);

                if (isAllOpen) {
                    $elements.slideUp({
                        duration: 'fast',
                        start: observeListState,
                        complete: observeListState,
                    });
                    $button.text('unfold_more');
                } else {
                    $elements.slideDown({
                        duration: 'fast',
                        start: observeListState,
                        complete: observeListState,
                    });
                    $button.text('unfold_less');
                }

                isAllOpen = !isAllOpen;
            });

            var observeListState = function () {
                if ($ul.css('display') === 'none') {
                    $arrow.removeClass('rotated');
                } else {
                    $arrow.addClass('rotated');
                }
            };
            observeListState();

        });


        $('span[data-wikie]').on('mouseover', function () {
            $(this).siblings('span.hierarchical_arrow').addClass('listElement_Arrow');
        });
        $('span[data-wikie]').on('mouseout', function () {
            $(this).siblings('span.hierarchical_arrow').removeClass('listElement_Arrow');
        });

        $('span.hierarchical_arrow').on('mouseover', function () {
            $(this).siblings('span[data-wikie]').addClass('hovered');
            $(this).addClass('listElement_Arrow');
        });
        $('span.hierarchical_arrow').on('mouseout', function () {
            $(this).siblings('span[data-wikie]').removeClass('hovered');
            $(this).removeClass('listElement_Arrow');
        });


    });

    var filesQueue = [
        'lists/dowss_opts.html',
        'lists/dow2ret_opts.html',
        'lists/sm_opts.html',
    ]





}
// Load the common list
$(document).ready(function () {
    $('#hierarchyDeployer').load(cachedHierarchyPath || 'lists/dowss_attrib.html', function () {

    });
    $('#attributeTypesDeploy').load(cachedTypesPath || 'lists/dowss_opts.html', function () {
        initializeRoot();
    });
    $('#contentAreaContainer').load(cachedWikiePath || 'wikies/testpage.html', function () {
        initializePage();
    });


    $('.attributeLoader').on('click', function () {
        var optionsUrl = $(this).attr('data-options-url') || 'lists/404opts.html';
        var fileUrl = $(this).data('file-url') || 'lists/404atr.html';

        lastLoadedHierarchyPath = fileUrl;
        lastLoadedTypesPath = optionsUrl;
        localStorage.setItem('cachedHierarchyPath', lastLoadedHierarchyPath);
        localStorage.setItem('cachedTypesPath', lastLoadedTypesPath);

        $('#hierarchyDeployer').load(fileUrl);
        $('#attributeTypesDeploy').load(optionsUrl, function () {
            initializePage();
            initializeRoot();
        });
    });

    $(document).on('click', '.optionloader', function () {
        var fileUrl = $(this).data('file-url') || 'lists/404atr.html';

        lastLoadedHierarchyPath = fileUrl;
        localStorage.setItem('cachedHierarchyPath', lastLoadedHierarchyPath);

        $('#hierarchyDeployer').load(fileUrl, function () {
            $('.attributeLoader').data('file-url', fileUrl);

            initializePage();
            initializeRoot();
        });
    });

    function handleImageSelection() {
        $('.attributeLoader img').removeClass('selected');
        $(this).find('img').addClass('selected');
        lastLoadedGame = $(this).find('img').attr('src');
        localStorage.setItem('cachedGame', lastLoadedGame);
    }
    $('.attributeLoader').on('click', handleImageSelection);
    $('.attributeLoader img[src="' + (lastLoadedGame || $('.attributeLoader img:first').attr('src')) + '"]').addClass('selected');

    function observeChangesInAttributeType() {
        var targetElement = document.getElementById('attributeType');

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {

                if (mutation.type === 'childList') {
                    $('.optionloader').each(function () {
                        var selectedOptionIndex = $(this).index();
                        var selectedOptionID = 'selectedOptionID_' + (selectedOptionIndex + 1);
                        $(this).attr('id', selectedOptionID);

                        $(document).on('click', '#' + selectedOptionID, function () {
                            $('.optionloader').removeClass('selected');
                            $(this).addClass('selected');
                            localStorage.setItem('cachedOption', $(this).attr('id'));
                        });
                    });
                    var cachedOption = localStorage.getItem('cachedOption');
                    if (cachedOption) {
                        // Удаление класса 'selected' у всех опций
                        $('.optionloader').removeClass('selected');

                        // Установка класса 'selected' для сохраненной опции
                        $('#' + cachedOption).addClass('selected');
                    } else {
                        // Установка первой опции по умолчанию
                        $('.optionloader:first').addClass('selected');
                    }
                }
            });
        });

        var config = { childList: true, subtree: true };
        observer.observe(targetElement, config);

        return observer;
    }

    var mutationObserverInstance = observeChangesInAttributeType();



});

$(document).ready(function () {
    $('#cleanTheCache').on('click', function () {
        localStorage.clear();
        location.reload();
    });
});



function setRandomDuration() {
    var noiseBars = document.querySelectorAll('.noise-bar');
    noiseBars.forEach(function (noiseBar) {
        var randomDuration = Math.floor(Math.random() * (30 - 3 + 1)) + 3;
        noiseBar.style.setProperty('--animation-duration-3to30', randomDuration + 's');
    });
}

document.addEventListener("animationiteration", setRandomDuration);
setTimeout(setRandomDuration, 500);