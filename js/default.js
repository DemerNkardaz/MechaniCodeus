$(document).ready(function () {
    const HeadText = $('#LexMechanicus');
    const HeadText_Title = HeadText.find('span:first');
    const HeadText_AfterTitle = HeadText.find('span').eq(1);
    const HeadLogo = $('#LexGearus');
    const dataErrorum = $('#erroremCogitatorum');
    const dataErrorum_overflow = $('#currentGearDegree');
    const dataErrorum_anim = ['alertingMig_00', 'alertingMig_01', 'alertingMig_02', 'alertingMig_03'];
    const searchPanel = $('#searchAttrib');
    const contentAreaContainer = $('#contentAreaContainer');
    const leftContainer = $('#leftContainer');
    const rightContainer = $('#rightContainer');
    const classesTypeSelector = $('#ClassesTypeSelector');
    const deployerList = $('#hierarchyDeployer');
    const deployerTypesList = $('#attributeTypesDeploy')
    const externalLinkElement = (
        '<span class="material-icons external">launch</span>'
    );
    const listArrowMarker = (
        '<span class="material-icons hierarchical_arrow">chevron_right</span>'
    );

    function headerInit() {
        $(':header').each(function () {
            const headerLevel = parseInt(this.tagName.substring(1));
            const baseSize = 1.75;
            const newSize = baseSize - (headerLevel - 1) * 0.15;
            $(this).css({
                'font-size': 'calc(' + newSize + 'em)',
                'font-weight': '700'
            });
        });
    }
    function observeHeaders() {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var headerChanges = $(mutation.target).find(':header').length > 0;
                if (headerChanges) {
                    headerInit();
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    observeHeaders();


    function updateContentStyles() {
        rightContainer.find('.child_attributes_list li').each(function () {
            var currentText = $(this).text();
            if (currentText && !currentText.replace(/.* — /, '').trim()) {
                $(this).append(" N/A");
            }
        });
        rightContainer.find('.coloredType li').each(function () {
            var text = $(this).html().trim();
            var parts = text.split(' — ');

            if (parts.length === 2 && parts[0].trim() !== "") {
                var span = $('<span>').addClass('child_list_highlight').html(parts[0]);
                $(this).html('').append(span).append(' — ' + parts[1]);
            }
        });
        contentAreaContainer.html(function (index, oldHtml) {
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
                oldHtml = oldHtml.replace(new RegExp('\\b' + tag + '\\b', 'g'), replacements[tag]);
            }

            return oldHtml;
        });
    }

    function initializePage() {
        let binaryCodeIntervalId, dotsIntervalId, rotateTimeout, animationFrameId, erroremCogitatorumTimer, decreaseInterval;;
        let numDots = 1, rotationDegrees = 0, clickTimestamp = 0;

        function generateMeaningfulBinaryCode(length) {
            let binaryCode = '';
            for (let i = 0; i < length; i++) {
                const randomBit = Math.round(Math.random());
                binaryCode += randomBit;
            }
            return binaryCode;
        }

        function updateBinaryCode() {
            const meaningfulBinaryCode = generateMeaningfulBinaryCode(25);
            HeadText_Title.text(meaningfulBinaryCode);
        }

        function updateDots() {
            HeadText_AfterTitle.text('.'.repeat(numDots));
            numDots++;
            if (numDots > 5) {
                numDots = 1;
            }
        }

        HeadLogo.on({
            mouseover: function () {
                cancelAnimationFrame(animationFrameId);

                HeadText_Title.addClass('animated');
                HeadText_AfterTitle.addClass('animated');

                HeadText_Title.css({
                    'font-family': 'Tektur',
                    'font-size': '0.6em'
                });
                HeadText_AfterTitle.css({
                    'font-family': 'Tektur',
                    'font-size': '0.6em'
                });

                updateBinaryCode();
                binaryCodeIntervalId = setInterval(updateBinaryCode, 50);

                updateDots();
                dotsIntervalId = setInterval(updateDots, 500);
            },
            mouseout: function () {
                HeadText_Title.removeClass('animated');
                HeadText_AfterTitle.removeClass('animated');

                clearInterval(binaryCodeIntervalId);
                clearInterval(dotsIntervalId);

                let remainingTime = 3100;

                const dataKey = HeadText_Title.data('key');
                const generateAfterMouseout = function () {
                    if (remainingTime > 0) {
                        updateBinaryCode();
                        updateDots();
                        remainingTime -= 50;
                        animationFrameId = requestAnimationFrame(generateAfterMouseout);
                    } else {
                        const selectedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
                        $.getJSON('json/lang_' + selectedLanguage + '.json', function (data) {
                            HeadText_Title.text(data.items[0][dataKey]);
                            HeadText_AfterTitle.text('');

                            HeadText_Title.css({
                                'font-family': '',
                                'font-size': ''
                            });
                            HeadText_AfterTitle.css({
                                'font-family': '',
                                'font-size': ''
                            });
                        });
                    }
                };
                animationFrameId = requestAnimationFrame(generateAfterMouseout);

            },
            click: function () {
                const currentTimestamp = new Date().getTime();
                const timeSinceLastClick = currentTimestamp - clickTimestamp;

                clearTimeout(erroremCogitatorumTimer);
                clearTimeout(rotateTimeout);

                let increment = 200;

                if (timeSinceLastClick < 5000) {
                    increment += rotationDegrees * 0.5;
                } else if (timeSinceLastClick >= 2000) {
                    rotationDegrees = 0;
                } else {
                    rotationDegrees = 90;
                }

                rotationDegrees += increment;
                clickTimestamp = currentTimestamp;

                clearInterval(decreaseInterval);

                $(this).css('transform', 'rotate(' + rotationDegrees + 'deg)');

                if (rotationDegrees > 1000000000) {
                    dataErrorum_RandomAnim();
                }
                if (rotationDegrees > 1000000) {
                    dataErrorum.css('display', 'block');
                }

                dataErrorum_overflow.text(rotationDegrees);

                rotateTimeout = setTimeout(function () {
                    let currentDegreeValue = rotationDegrees;
                    decreaseInterval = setInterval(function () {
                        const randomStep = Math.floor(Math.random() * currentDegreeValue * 0.35) + 1;
                        currentDegreeValue -= randomStep;
                        if (currentDegreeValue < 0) {
                            currentDegreeValue = 0;
                        }
                        dataErrorum_overflow.text(currentDegreeValue);
                        HeadLogo.css('transform', 'rotate(' + currentDegreeValue + 'deg)');

                        if (currentDegreeValue <= 0) {
                            clearInterval(decreaseInterval);
                            HeadLogo.css('transform', 'rotate(0deg)');
                            HeadLogo.removeAttr('style');
                        }
                    }, 20);

                }, 2000);
                erroremCogitatorumTimer = setTimeout(function () {
                    dataErrorum_RandomAnim();
                    setTimeout(() => {
                        dataErrorum.removeAttr('style');
                    }, 2000);
                }, 5000);
            }
        });
        function dataErrorum_RandomAnim() {
            var randomAnimation = dataErrorum_anim[Math.floor(Math.random() * dataErrorum_anim.length)];
            dataErrorum.css('animation', randomAnimation + ' 3s infinite');
        }

        // Add icon after external links
        $('a[href^="http://"], a[href^="https://"]').each(function () {
            var href = $(this).attr('href');

            if (href && href.indexOf('https://github.com/DemerNkardaz/MechaniCodeus') === -1) {
                var existingSpans = $(this).find('.material-icons.external');

                if (existingSpans.length === 0 && !$(this).children('img').length) {
                    $(this).append(externalLinkElement);
                }
            }
        });

        // Language setup
        const LanguageSelector = $('#languageSelectorContainer');
        var languages = [
            { code: 'la', short: 'AG', name: 'Altum Gothicum', flag: '🏛️' },
            { code: 'en', short: 'EN', name: 'English', flag: '🇺🇸' },
            { code: 'ru', short: 'РУ', name: 'Русский', flag: '🇷🇺' },
            { code: 'jp', short: '日本語', name: '日本語', flag: '🇯🇵' },
        ];
        var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        var langSelectOption = '';

        for (var i = 0; i < languages.length; i++) {
            var selected = languages[i].code === selectedLanguage ? 'selected' : '';
            langSelectOption += '<li class="sfx_common" data-value="' + languages[i].code + '" ' + selected + '>' + languages[i].flag + ' ' + languages[i].name + '</li>';
        }

        var selectLangDrop = (
            '<div class="custom-select sfx_common" id="languageSelectWrapper">' +
            '<div class="select-styled" id="languageSelect">' + getSelectedLanguageName(selectedLanguage) + '</div>' +
            '<ul class="select-options">' +
            langSelectOption +
            '</ul></div>'
        );
        LanguageSelector.html(selectLangDrop);
        const LanguageSelectWrapper = $('#languageSelectWrapper');
        const LanguageMenu = $('#languageSelect');
        const LanguageOption = $('.select-options');

        LanguageMenu.on('click', function () {
            $(this).toggleClass('active');
            LanguageOption.toggleClass('active');
        });

        LanguageSelectWrapper.on('click', 'li', function () {
            var selectedLanguage = $(this).data('value');
            updateLanguage(selectedLanguage);
            LanguageMenu.removeClass('active');
            LanguageOption.removeClass('active');
        });

        $(document).on('click', function (event) {
            if (!LanguageSelectWrapper.is(event.target) && LanguageSelectWrapper.has(event.target).length === 0) {
                LanguageMenu.removeClass('active');
                LanguageOption.removeClass('active');
            }
        });

        function updateLanguage(selectedLanguage) {
            var htmlElement = document.querySelector('html');
            htmlElement.setAttribute('lang', selectedLanguage);
            LanguageMenu.html(getSelectedLanguageName(selectedLanguage));
            localStorage.setItem('selectedLanguage', selectedLanguage);

            $.getJSON('json/lang_' + selectedLanguage + '.json', function (data) {
                $('[data-key]').each(function () {
                    var dataKey = $(this).data('key');
                    $(this).html(data.items[0][dataKey]);
                });
                updatePlaceholderText(data);
                updateTooltips(data);
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
            if (data.items && data.items[1]) {
                var inputSearchTextPlaceholder = data.items[1].inputSearchTextPlaceholder;
                searchPanel.attr('placeholder', inputSearchTextPlaceholder);
            }
        }
        LanguageSelector.on('change', LanguageMenu, function () {
            var selectedLanguage = $(this).val();
            localStorage.setItem('selectedLanguage', selectedLanguage);
            updateLanguage(selectedLanguage);
        });
        function updateTooltips(data) {
            $('[data-bs-toggle="tooltip"]').each(function () {
                const dataKey = $(this).data('key');
                if (data.items[2].hasOwnProperty(dataKey)) {
                    $(this).attr('data-bs-title', data.items[2][dataKey]);
                }
            });

            $('[data-bs-toggle="tooltip"]').tooltip('dispose');
            $('[data-bs-toggle="tooltip"]').tooltip();
        }

        $('[data-bs-toggle="tooltip"]').tooltip();


        updateLanguage(selectedLanguage);

        var $firstSpan = deployerList.find('li').children('span').first();
        var $lastSpan = deployerList.find('li').children('span').last();

        $firstSpan.mouseover(function () {
            if ($(this).hasClass('hierarchical_arrow')) {
                $(this).addClass('listElement_Arrow');
            }
        });
        $firstSpan.mouseout(function () {
            $(this).removeClass('listElement_Arrow');
        });


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

        function addZero(number) {
            return number < 10 ? '0' + number : number;
        }
    }

    initializePage();


    let lastLoadedWikiePath = '';
    let lastLoadedHierarchyPath = '';
    let lastLoadedTypesPath = '';

    let cachedWikiePath = localStorage.getItem('lastLoadedWikiePath');
    let cachedHierarchyPath = localStorage.getItem('cachedHierarchyPath');
    let cachedTypesPath = localStorage.getItem('cachedTypesPath');

    let cachedGame = localStorage.getItem('cachedGame');
    let lastLoadedGame = cachedGame;

    function deployerListInit() {
        $.expr[":"].containsOrInChildren = $.expr.createPseudo(function (text) {
            return function (elem) {
                return $(elem).find('*').addBack().filter(function () {
                    return $(this).text().toLowerCase().indexOf(text.toLowerCase()) !== -1;
                }).length > 0;
            };
        });
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.target.id === 'hierarchyDeployer') {
                    searchPanel.on('input', function () {
                        var searchText = $(this).val().toLowerCase();
                        deployerList.find('li').hide();
                        deployerList.find('li:containsOrInChildren("' + searchText + '")').show();
                        localStorage.setItem('lastSearch', searchText);
                    });
                    var lastSearch = localStorage.getItem('lastSearch');
                    if (lastSearch) {
                        searchPanel.val(lastSearch).trigger('input');
                    }
                }
            });
        });
        observer.observe(document.getElementById('hierarchyDeployer'), { childList: true, subtree: true });
    }
    deployerListInit();

    function initializeRoot() {
        deployerList.find('li').each(function () {
            $(this).children('span').last().each(function () {
                $(this).attr('data-wikie', $(this).data('wikie') || 'html/pages/404.html');
            });
            $('span[data-wikie]').on('click', function () {
                var wikiePath = $(this).data('wikie');
                if (wikiePath !== lastLoadedWikiePath) {
                    contentAreaContainer.load(wikiePath, function () {
                        initializePage();
                        lastLoadedWikiePath = wikiePath;
                        localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                        updateContentStyles();
                    });
                }
            });
        });

        deployerList.find('li').each(function () {
            if ($(this).find('ul').length > 0) {
                $(this).prepend(listArrowMarker);
                $(this).addClass('has-child');
            }
        });

        deployerList.find('li.has-child').each(function () {
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

            var collapsedAttrList = false;

            $(document).on('click', '#collapseShowAllLists', function (e) {
                var $elements = deployerList.find('li.has-child ul');
                var $button = $(this);

                if (collapsedAttrList) {
                    $elements.slideUp({
                        duration: 'fast',
                        start: observeListState,
                        complete: observeListState,
                    });
                    $button.text('unfold_more');
                    collapsedAttrList = false;
                } else {
                    $elements.slideDown({
                        duration: 'fast',
                        start: observeListState,
                        complete: observeListState,
                    });
                    $button.text('unfold_less');
                    collapsedAttrList = true;
                }
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
    }
    // Load the common list
    function setDefaultUrl() {
        $('.attributeLoader').each(function () {
            $(this).attr('data-file-url', $(this).data('file-url') || 'html/pages/404atr.html');
            $(this).attr('data-options-url', $(this).data('options-url') || 'html/pages/404opts.html');
        });
        $('.optionloader').each(function () {
            $(this).attr('data-file-url', $(this).data('file-url') || 'html/pages/404atr.html');
        });
    }
    function identifyTheOptions() {
        $('.optionloader').each(function () {
            if (!$(this).hasClass('glitch')) {
                var selectedOptionIndex = $(this).index();
                var selectedOptionID = 'selectedOptionID_' + (selectedOptionIndex + 1);
                $(this).attr('id', selectedOptionID);

                $(document).on('click', '#' + selectedOptionID, function () {
                    $('.optionloader').removeClass('selected');
                    $(this).addClass('selected');
                    localStorage.setItem('cachedOption', $(this).attr('id'));
                });
            }
        });
        var cachedOption = localStorage.getItem('cachedOption');
        if (cachedOption) {
            $('.optionloader').removeClass('selected');

            $('#' + cachedOption).addClass('selected');
        } else {
            $('.optionloader:first').addClass('selected');
        }
    }

    deployerList.load(cachedHierarchyPath || 'html/pages/dowss/dowss_attrib.html', function () {
        initializeRoot();
    });
    deployerTypesList.load(cachedTypesPath || 'html/pages/dowss/dowss_opts.html', function () {
        setDefaultUrl();
        identifyTheOptions();
    });
    contentAreaContainer.load(cachedWikiePath || 'html/pages/home.html', function () {
        initializePage();
        updateContentStyles();
    });

    $(document).on('click', '.attributeLoader', function () {
        var optionsUrl = $(this).attr('data-options-url');
        var fileUrl = $(this).data('file-url');

        lastLoadedHierarchyPath = fileUrl;
        lastLoadedTypesPath = optionsUrl;
        localStorage.setItem('cachedHierarchyPath', lastLoadedHierarchyPath);
        localStorage.setItem('cachedTypesPath', lastLoadedTypesPath);

        $('#hierarchyDeployer').load(fileUrl);
        $('#attributeTypesDeploy').load(optionsUrl, function () {
            initializePage();
            initializeRoot();
            setDefaultUrl();
            identifyTheOptions();
        });
    });

    $(document).on('click', '.optionloader', function () {
        var fileUrl = $(this).data('file-url');

        lastLoadedHierarchyPath = fileUrl;
        localStorage.setItem('cachedHierarchyPath', lastLoadedHierarchyPath);
        $('#hierarchyDeployer').load(fileUrl, function () {
            initializePage();
            initializeRoot();
        });

        var game = $(this).data('game');
        var attributeLoaderSelector = '.attributeLoader[data-game="' + game + '"]';
        $(attributeLoaderSelector).data('file-url', fileUrl);
    });
    function handleImageSelection() {
        $('.attributeLoader').find('img').removeClass('selected');
        $(this).find('img').addClass('selected');
        lastLoadedGame = $(this).find('img').attr('src');
        localStorage.setItem('cachedGame', lastLoadedGame);
    }
    $('.attributeLoader').on('click', handleImageSelection);
    $('.attributeLoader').find('img[src="' + (lastLoadedGame || $('.attributeLoader').find('img:first').attr('src')) + '"]').addClass('selected');


    $(document).on('mouseover', 'span[data-wikie]', function () {
        $(this).siblings('span.hierarchical_arrow').addClass('listElement_Arrow');
    });
    $(document).on('mouseout', 'span[data-wikie]', function () {
        $(this).siblings('span.hierarchical_arrow').removeClass('listElement_Arrow');
    });

    $(document).on('mouseover', 'span.hierarchical_arrow', function () {
        $(this).siblings('span[data-wikie]').addClass('hovered');
        $(this).addClass('listElement_Arrow');
    });
    $(document).on('mouseout', 'span.hierarchical_arrow', function () {
        $(this).siblings('span[data-wikie]').removeClass('hovered');
        $(this).removeClass('listElement_Arrow');
    });

    $(document).on('click', '#randomPage', function () {
        $.ajax({
            url: 'https://api.github.com/repos/demernkardaz/MechaniCodeus/contents/wikies',
            success: function (data) {
                var files = data.map(function (file) {
                    return file.name;
                });
                var randomFile = files[Math.floor(Math.random() * files.length)];
                var wikiePath = 'wikies/' + randomFile;

                lastLoadedWikiePath = wikiePath;
                contentAreaContainer.load(wikiePath, function () {
                    initializePage();
                    localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                    updateContentStyles();
                });

            }
        });
    });
    $(document).on('click', '#homePage', function () {
        if (lastLoadedWikiePath !== 'html/pages/home.html') {
            contentAreaContainer.load('html/pages/home.html', function () {
                initializePage();
                lastLoadedWikiePath = 'html/pages/home.html';
                cachedWikiePath = lastLoadedWikiePath;
                localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                updateContentStyles();
            });
        }
    });
});


$(document).on('click', '#cleanTheCache', function () {
    localStorage.clear();
    location.reload();
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