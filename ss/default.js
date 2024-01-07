function initializePage() {
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
    });


    $(document).ready(function () {
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
    });

    function generateMeaningfulBinaryCode(length) {
        let binaryCode = '';
        for (let i = 0; i < length; i++) {
            const randomBit = Math.round(Math.random());
            binaryCode += randomBit;
        }
        return binaryCode;
    }

    $(document).ready(function () {
        $('a[href^="http://"], a[href^="https://"]').each(function () {
            if ($(this).contents().length === 1 && $(this).contents().get(0).nodeType === 3) {
                $(this).append('<span class="material-icons external">launch</span>');
            }
        });
    });







    $(document).ready(function () {
        var languages = [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'ru', name: 'Русский', flag: '🇷🇺' },
            { code: 'jp', name: '日本語', flag: '🇯🇵' },
        ];

        var selectedLanguage = localStorage.getItem('selectedLanguage') || 'ru';

        var selectHtml = '<select class="form-select" id="languageSelect">';
        for (var i = 0; i < languages.length; i++) {
            var selected = languages[i].code === selectedLanguage ? 'selected' : '';
            selectHtml += '<option value="' + languages[i].code + '" ' + selected + '>' + languages[i].flag + ' ' + languages[i].name + '</option>';
        }
        selectHtml += '</select>';

        $('#languageSelectorContainer').html(selectHtml);

        function updateLanguage(selectedLanguage) {
            // Изменяем язык в теге <html>
            var htmlElement = document.querySelector('html');
            htmlElement.setAttribute('lang', selectedLanguage);

            // Загрузка данных для выбранного языка
            $.getJSON('ss/lang_' + selectedLanguage + '.json', function (data) {
                $('[data-key]').each(function () {
                    var dataKey = $(this).data('key');
                    $(this).html(data.items[0][dataKey]);
                });
                updatePlaceholderText(data);
            });
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


    $(document).ready(function () {
        $(".container.right *").each(function () {
            var currentText = $(this).text();
            if (currentText && !currentText.replace(/.* — /, '').trim()) {
                $(this).append(" N/A");
            }
        });
    });


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



$(document).ready(function () {
    $('#contentAreaContainer').load('wikies/testpage.html', function () {
        initializePage();
    });
    $('#randomPage').on('click', function () {
        $.ajax({
            url: 'wikies/',
            success: function (data) {
                var files = $(data).find('a[href$=".html"]').map(function () {
                    return $(this).attr('href');
                }).get();

                var randomFile = files[Math.floor(Math.random() * files.length)];

                $('#contentAreaContainer').load(randomFile, function () {
                    initializePage();
                });
            }
        });
    });
});



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

        $(this).children('.hierarchical_arrow').click(function (e) {
            e.stopPropagation();
            $ul.slideToggle();
            $(this).toggleClass('rotated');
        });

    });

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


});

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
