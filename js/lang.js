import * as $item from './_variables.js';
let updateLanguage;
let selectedLanguage;
let langSelectOption;
let updatePlaceholderText;
let updateTooltips;
$(document).ready(function () {
    var languages = [
        { code: 'la', short: 'AG', name: 'Altum Gothicum', flag: '🏛️' },
        { code: 'en', short: 'EN', name: 'English', flag: '🇺🇸' },
        { code: 'ru', short: 'РУ', name: 'Русский', flag: '🇷🇺' },
        { code: 'jp', short: '日本語', name: '日本語', flag: '🇯🇵' },
    ];
    selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    langSelectOption = '';

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
    $item.LanguageSelector.html(selectLangDrop);
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

    updateLanguage = function (selectedLanguage) {
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

    updatePlaceholderText = function (data) {
        if (data.items && data.items[1]) {
            var inputSearchTextPlaceholder = data.items[1].inputSearchTextPlaceholder;
            $item.searchPanel.attr('placeholder', inputSearchTextPlaceholder);
        }
    }
    $item.LanguageSelector.on('change', LanguageMenu, function () {
        var selectedLanguage = $(this).val();
        localStorage.setItem('selectedLanguage', selectedLanguage);
        updateLanguage(selectedLanguage);
    });
    updateTooltips = function (data) {
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
});
export {
    updateLanguage,
    selectedLanguage,
    langSelectOption
};