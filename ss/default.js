$(document).ready(function () {
    $(':header').each(function () {
        var headerLevel = parseInt(this.tagName.substring(1)); // Получаем уровень заголовка (1, 2, 3, ...)
        var baseSize = 1.75; // Базовый размер шрифта
        var newSize = baseSize - (headerLevel - 1) * 0.15; // Рассчитываем новый размер

        $(this).css({
            'font-size': 'calc(' + newSize + 'em)',
            'font-weight': '700'
        });
    });
});


$(document).ready(function () {
    const originalText = $('#LexMechanicus span:first').text();
    const binaryCodeElement = $('#LexMechanicus').find('span:first');
    const dotsElement = $('#LexMechanicus').find('span:last');
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

            // Change font and size during mouseover
            binaryCodeElement.css({
                'font-family': 'Tektur',
                'font-size': '0.6em'
            });
            dotsElement.css({
                'font-family': 'Tektur',
                'font-size': '0.6em'
            });

            updateBinaryCode(); // Update initially
            binaryCodeIntervalId = setInterval(updateBinaryCode, 50);

            updateDots(); // Update initially
            dotsIntervalId = setInterval(updateDots, 500);
        },
        mouseout: function () {
            binaryCodeElement.removeClass('animated');
            dotsElement.removeClass('animated');

            clearInterval(binaryCodeIntervalId);
            clearInterval(dotsIntervalId);

            // Продолжаем генерацию бинарного кода и точек ещё секунду после ухода курсора
            let remainingTime = 700; // Время в миллисекундах
            const generateAfterMouseout = function () {
                if (remainingTime > 0) {
                    updateBinaryCode();
                    updateDots();
                    remainingTime -= 50; // Интервал генерации
                    setTimeout(generateAfterMouseout, 50);
                } else {
                    binaryCodeElement.text(originalText);
                    dotsElement.text('');

                    // Remove font style and size after 700ms
                    binaryCodeElement.css({
                        'font-family': '',
                        'font-size': ''
                    });
                    dotsElement.css({
                        'font-family': '',
                        'font-size': ''
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
        // Генерируем случайный бит (0 или 1)
        const randomBit = Math.round(Math.random());

        // Просто добавляем этот бит к общей последовательности
        binaryCode += randomBit;
    }

    return binaryCode;
}
















$(document).ready(function () {
    var languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
    ];

    // Получаем текущий выбранный язык из локального хранилища
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'ru';

    var selectHtml = '<select class="form-select" id="languageSelect">';
    for (var i = 0; i < languages.length; i++) {
        var selected = languages[i].code === selectedLanguage ? 'selected' : '';
        selectHtml += '<option value="' + languages[i].code + '" ' + selected + '>' + languages[i].flag + ' ' + languages[i].name + '</option>';
    }
    selectHtml += '</select>';

    $('#languageSelectorContainer').html(selectHtml);

    $('#languageSelect').change(function () {
        var selectedLanguage = $(this).val();
        localStorage.setItem('selectedLanguage', selectedLanguage);
        // Дополнительные действия при изменении языка (если необходимо)
    });
});


