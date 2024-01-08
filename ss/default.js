

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
        var $firstSpan = $('#hierarchyAtrributes li').children('span').first();
        var $lastSpan = $('#hierarchyAtrributes li').children('span').last();

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




function initializeRoot() {
    // Loading the info pages
    var lastLoadedWikiePath = '';
    $('#hierarchyAtrributes li').each(function () {
        $(this).children('span').last().each(function () {
            if (!$(this).attr('data-wikie')) {
                $(this).attr('data-wikie', 'wikies\\404.html');
            }
        });

        $('span[data-wikie]').on('click', function () {
            var wikiePath = $(this).data('wikie');

            if (wikiePath !== lastLoadedWikiePath) {
                $('#contentAreaContainer').load(wikiePath, function () {
                    initializePage();
                    lastLoadedWikiePath = wikiePath;
                });
            }
        });
    });


    $(document).ready(function () {
        $('#contentAreaContainer').load('wikies/testpage.html', function () {
            initializePage();
        });

        $('#randomPage').on('click', function () {
            $.ajax({
                url: 'https://api.github.com/repos/demernkardaz/MechaniCodeus/contents/wikies',
                success: function (data) {
                    var files = data.map(function (file) {
                        return file.name;
                    });
                    var randomFile = files[Math.floor(Math.random() * files.length)];
                    $('#contentAreaContainer').load('wikies/' + randomFile, function () {
                        initializePage();
                    });
                }
            });
        });
    });

    // List functions
    $(document).ready(function () {

        $('#hierarchyAtrributes li').each(function () {
            if ($(this).find('ul').length > 0) {
                $(this).prepend('<span class="material-icons hierarchical_arrow">chevron_right</span>');
                $(this).addClass('has-child');
            }
        });

        $('#hierarchyAtrributes li.has-child').each(function () {
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
                var $elements = $('#hierarchyAtrributes li.has-child ul');
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

        $(document).ready(function () {
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

    });

}

// Load the common list
$(document).ready(function () {
    $('#hierarchyDeployer').load('hi_attri.html', function () {
        initializeRoot();
    });
});



function setRandomDuration() {
    var noiseBar = document.querySelector('.noise-bar');
    var randomDuration = Math.floor(Math.random() * (30 - 3 + 1)) + 3;
    noiseBar.style.setProperty('--animation-duration-3to30', randomDuration + 's');
}
document.addEventListener("animationiteration", setRandomDuration);
setTimeout(setRandomDuration, 500);