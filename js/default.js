import { updateLanguage, selectedLanguage, langSelectOption } from './lang.js';
import { tagReplacements } from './page.js';
import * as $item from './variables.js';

$(document).ready(function () {


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
        $item.rightContainer.find('.child_attributes_list li').each(function () {
            var currentText = $(this).text();
            if (currentText && !currentText.replace(/.* — /, '').trim()) {
                $(this).append(" N/A");
            }
        });
        $item.rightContainer.find('.coloredType li').each(function () {
            var text = $(this).html().trim();
            var parts = text.split(' — ');

            if (parts.length === 2 && parts[0].trim() !== "") {
                var span = $('<span>').addClass('child_list_highlight').html(parts[0]);
                $(this).html('').append(span).append(' — ' + parts[1]);
            }
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
            $item.HeadText_Title.text(meaningfulBinaryCode);
        }

        function updateDots() {
            $item.HeadText_AfterTitle.text('.'.repeat(numDots));
            numDots++;
            if (numDots > 5) {
                numDots = 1;
            }
        }

        $item.HeadLogo.on({
            mouseover: function () {
                cancelAnimationFrame(animationFrameId);

                $item.HeadText_Title.addClass('animated');
                $item.HeadText_AfterTitle.addClass('animated');

                $item.HeadText_Title.css({
                    'font-family': 'Tektur',
                    'font-size': '0.6em'
                });
                $item.HeadText_AfterTitle.css({
                    'font-family': 'Tektur',
                    'font-size': '0.6em'
                });

                updateBinaryCode();
                binaryCodeIntervalId = setInterval(updateBinaryCode, 50);

                updateDots();
                dotsIntervalId = setInterval(updateDots, 500);
            },
            mouseout: function () {
                $item.HeadText_Title.removeClass('animated');
                $item.HeadText_AfterTitle.removeClass('animated');

                clearInterval(binaryCodeIntervalId);
                clearInterval(dotsIntervalId);

                let remainingTime = 3100;

                const dataKey = $item.HeadText_Title.data('key');
                const generateAfterMouseout = function () {
                    if (remainingTime > 0) {
                        updateBinaryCode();
                        updateDots();
                        remainingTime -= 50;
                        animationFrameId = requestAnimationFrame(generateAfterMouseout);
                    } else {
                        const selectedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
                        $.getJSON('json/lang_' + selectedLanguage + '.json', function (data) {
                            $item.HeadText_Title.text(data.items[0][dataKey]);
                            $item.HeadText_AfterTitle.text('');

                            $item.HeadText_Title.css({
                                'font-family': '',
                                'font-size': ''
                            });
                            $item.HeadText_AfterTitle.css({
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
                    $item.dataErrorum.css('display', 'block');
                }

                $item.dataErrorum_overflow.text(rotationDegrees);

                rotateTimeout = setTimeout(function () {
                    let currentDegreeValue = rotationDegrees;
                    decreaseInterval = setInterval(function () {
                        const randomStep = Math.floor(Math.random() * currentDegreeValue * 0.35) + 1;
                        currentDegreeValue -= randomStep;
                        if (currentDegreeValue < 0) {
                            currentDegreeValue = 0;
                        }
                        $item.dataErrorum_overflow.text(currentDegreeValue);
                        $item.HeadLogo.css('transform', 'rotate(' + currentDegreeValue + 'deg)');

                        if (currentDegreeValue <= 0) {
                            clearInterval(decreaseInterval);
                            $item.HeadLogo.css('transform', 'rotate(0deg)');
                            $item.HeadLogo.removeAttr('style');
                        }
                    }, 20);

                }, 2000);
                erroremCogitatorumTimer = setTimeout(function () {
                    dataErrorum_RandomAnim();
                    setTimeout(() => {
                        $item.dataErrorum.removeAttr('style');
                    }, 2000);
                }, 5000);
            }
        });
        function dataErrorum_RandomAnim() {
            var randomAnimation = dataErrorum_anim[Math.floor(Math.random() * $item.dataErrorum_anim.length)];
            $item.dataErrorum.css('animation', randomAnimation + ' 3s infinite');
        }

        // Add icon after external links
        $('a[href^="http://"], a[href^="https://"]').each(function () {
            var href = $(this).attr('href');

            if (href && href.indexOf('https://github.com/DemerNkardaz/MechaniCodeus') === -1) {
                var existingSpans = $(this).find('.material-icons.external');

                if (existingSpans.length === 0 && !$(this).children('img').length) {
                    $(this).append($item.externalLinkElement);
                }
            }
        });

        var $firstSpan = $item.deployerList.find('li').children('span').first();
        var $lastSpan = $item.deployerList.find('li').children('span').last();

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
        tagReplacements();
        updateLanguage(selectedLanguage);
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
                    $item.searchPanel.on('input', function () {
                        var searchText = $(this).val().toLowerCase();
                        $item.deployerList.find('li').hide();
                        $item.deployerList.find('li:containsOrInChildren("' + searchText + '")').show();
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
        $item.deployerList.find('li').each(function () {
            $(this).children('span').last().each(function () {
                $(this).attr('data-wikie', $(this).data('wikie') || 'html/pages/404.html');
            });
            $('span[data-wikie]').on('click', function () {
                var wikiePath = $(this).data('wikie');
                if (wikiePath !== lastLoadedWikiePath) {
                    $item.contentAreaContainer.load(wikiePath, function () {
                        initializePage();
                        lastLoadedWikiePath = wikiePath;
                        localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                        updateContentStyles();
                    });
                }
                var $this = $(this);
                $this.addClass('listHoverAnimation');
                setTimeout(function () {
                    $this.removeClass('listHoverAnimation');
                }, 75);
            });
        });

        $item.deployerList.find('li').each(function () {
            if ($(this).find('ul').length > 0) {
                $(this).prepend($item.listArrowMarker);
                $(this).addClass('has-child');
            }
        });

        $item.deployerList.find('li.has-child').each(function () {
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
                var $elements = $item.deployerList.find('li.has-child ul');
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
                    var $this = $(this);
                    $('.optionloader').removeClass('selected');
                    $this.addClass('selected');
                    localStorage.setItem('cachedOption', $this.attr('id'));
                    $this.addClass('listHoverAnimation');
                    setTimeout(function () {
                        $this.removeClass('listHoverAnimation');
                    }, 75);
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

    $item.deployerList.load(cachedHierarchyPath || 'html/pages/dowss/dowss_attrib.html', function () {
        initializeRoot();
    });
    $item.deployerTypesList.load(cachedTypesPath || 'html/pages/dowss/dowss_opts.html', function () {
        setDefaultUrl();
        identifyTheOptions();
    });
    $item.contentAreaContainer.load(cachedWikiePath || 'html/pages/home.html', function () {
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
    if (lastLoadedGame) {
        $('.attributeLoader[data-game="' + lastLoadedGame + '"] img').addClass('selected');
    } else {
        $('.attributeLoader[data-game="SS"] img').addClass('selected');
    }
    $('.attributeLoader').on('click', handleImageSelection);

    function handleImageSelection() {
        $('.attributeLoader').find('img').removeClass('selected');
        $(this).find('img').addClass('selected');
        lastLoadedGame = $(this).data('game');
        localStorage.setItem('cachedGame', lastLoadedGame);
    }

    $(document).on('mouseover', 'span[data-wikie]', function () {
        var $this = $(this);
        $this.siblings('span[data-wikie]').removeClass('hovered');
        $this.siblings('span.hierarchical_arrow').addClass('listElement_Arrow');
        $this.addClass('listHoverAnimation');
        setTimeout(function () {
            $this.removeClass('listHoverAnimation');
        }, 150);
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
        var pageUrls = [
            'html/pages/dowss/attrib',
            'html/pages/dowss/guides',
            'html/pages/dowss/struc',
            'html/pages/dow2r/attrib',
            'html/pages/dow2r/guides',
            'html/pages/dow2r/struc',
            'html/pages/sm/attrib',
            'html/pages/sm/guides',
            'html/pages/sm/struc',
            'html/pages/home.html'
        ];
        $.ajax({
            url: pageUrls[Math.floor(Math.random() * pageUrls.length)],
            success: function (data) {
                var files = data.map(function (file) {
                    return file.name;
                });
                var randomFile = files[Math.floor(Math.random() * files.length)];
                var wikiePath = 'wikies/' + randomFile;

                lastLoadedWikiePath = wikiePath;
                $item.contentAreaContainer.load(wikiePath, function () {
                    initializePage();
                    localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                    updateContentStyles();
                });

            }
        });
    });
    $(document).on('click', '#homePage', function () {
        if (lastLoadedWikiePath !== 'html/pages/home.html') {
            $item.contentAreaContainer.load('html/pages/home.html', function () {
                initializePage();
                lastLoadedWikiePath = 'html/pages/home.html';
                cachedWikiePath = lastLoadedWikiePath;
                localStorage.setItem('lastLoadedWikiePath', lastLoadedWikiePath);
                updateContentStyles();
            });
        }
    });

    function homePageControlsPosition() {
        var homePageControls = $("#homePageControls");

        var rightContainerRect = $item.rightContainer.offset();
        var leftPosition = rightContainerRect.left + $item.rightContainer.width() + 10;

        homePageControls.css({
            "left": leftPosition + "px",
            "top": rightContainerRect.top + "px"
        });
    }
    homePageControlsPosition();
    $(window).on("resize", function () {
        homePageControlsPosition();
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