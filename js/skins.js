$(document).ready(function () {
    var storedSkin = localStorage.getItem('selectedSkin');
    if (!storedSkin) {
        storedSkin = 'default.css';
    }
    loadSkin(storedSkin);

    function loadSkin(skin) {
        $('link[id^="skinStyles"]').remove();

        if (skin !== 'default.css') {
            var newStylesheet = $('<link>', {
                id: 'skinStyles',
                rel: 'stylesheet',
                type: 'text/css',
                href: skin
            });
            $('head').append(newStylesheet);
        }

        if (skin === 'default.css') {
            addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/gigavolt.min.css');
        } else if (skin === 'css/skins/skins_yellow.css') {
            addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/mocha.min.css');
        } else if (skin === 'css/skins/skins_red.css') {
            addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/pojoaque.min.css');
        } else if (skin === 'css/skins/skins_blue.css') {
            addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/dark-violet.min.css');
        }

        localStorage.setItem('selectedSkin', skin);
    }

    $('.skin_setup [id^="skin_"]').on('click', function () {
        var selectedSkin = $(this).data('skin');
        if (!selectedSkin) {
            selectedSkin = 'default.css';
        }
        loadSkin(selectedSkin);
    });

    function addStylesheet(href) {
        var newStylesheet = $('<link>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: href
        });
        $('head').append(newStylesheet);
    }
});
