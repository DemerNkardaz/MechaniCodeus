$(document).ready(function () {
    var storedSkin = localStorage.getItem('selectedSkin');
    if (storedSkin) {
        loadSkin(storedSkin);
    }

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

        localStorage.setItem('selectedSkin', skin);
    }

    $('.skin_setup [id^="skin_"]').on('click', function () {
        var selectedSkin = $(this).data('skin');
        if (!selectedSkin) {
            selectedSkin = 'default.css';
        }
        loadSkin(selectedSkin);
    });
})