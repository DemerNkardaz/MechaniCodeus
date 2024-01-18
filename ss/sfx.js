$(document).ready(function () {
    function applySfxClassToNewItems() {
        $('#hierarchyDeployer').find('li:not(.sfx_common)').addClass('sfx_common');
    }
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                applySfxClassToNewItems();
            }
        });
    });
    var hierarchyDeployer = document.getElementById('hierarchyDeployer');
    if (hierarchyDeployer) {
        observer.observe(hierarchyDeployer, { childList: true, subtree: true });
    } else {
        console.error("Element with id 'hierarchyDeployer' not found");
    }
    applySfxClassToNewItems();
    $('#ClassesTypeSelector').find('.attributeLoader').addClass('sfx_common');

    var isSoundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    var commonSoundsFX = [
        'loopSound',
        'generic_hover',
        'generic_click',
        'generic_click_2',
        'generic_close'
    ];
    function updateSoundButton() {
        var button = $('#silenceToggle');
        var iconClass = isSoundEnabled ? 'volume_up' : 'volume_off';
        button.find('#silenceToggle').text(iconClass);
        button.text(iconClass);
    }
    function toggleSound() {
        isSoundEnabled = !isSoundEnabled;
        localStorage.setItem('soundEnabled', isSoundEnabled);
        updateSoundButton();
        for (var i = 0; i < commonSoundsFX.length; i++) {
            window[commonSoundsFX[i]].mute(!isSoundEnabled);
        }
    }
    $('#silenceToggle').on('click', toggleSound);
    updateSoundButton();
    for (var i = 0; i < commonSoundsFX.length; i++) {
        window[commonSoundsFX[i]].mute(!isSoundEnabled);
    }
});


var loopSound = new Howl({
    src: ['sfx/loop.mp3'],
    volume: 0.5,
    loop: true
});

var generic_hover = new Howl({
    src: ['sfx/on_hover.mp3'],
    volume: 1.0
});

var generic_click = new Howl({
    src: ['sfx/on_select.mp3'],
    volume: 1.0
});

var generic_click_2 = new Howl({
    src: ['sfx/on_select_2.mp3'],
    volume: 1.0
});

var generic_close = new Howl({
    src: ['sfx/on_close.mp3'],
    volume: 1.0
});

$(document).on('mouseover', '.sfx_common, .sfx_close', function () {
    generic_hover.stop();
    generic_hover.play();
});

$(document).on('click', '.sfx_common', function () {
    generic_click.stop();
    generic_click.play();
});

$(document).on('click', '.form-control', function () {
    generic_click_2.stop();
    generic_click_2.play();
});

$(document).on('click', '.sfx_close', function () {
    generic_close.stop();
    generic_close.play();
});



/* 'Shadows and Dust' by Scott Buckley - released under CC-BY 4.0. */
/* 'Decoherence' by Scott Buckley - released under CC-BY 4.0. */
/* 'The Distant Sun' by Scott Buckley - released under CC-BY 4.0. */
/* 'The Encounter' by Scott Buckley - released under CC-BY 4.0. */
/* 'Falling Together' by Scott Buckley - released under CC-BY 4.0. */
/* 'Ephemera' by Scott Buckley - released under CC-BY 4.0. */
/* 'Computations in a Snowstorm' by Scott Buckley - released under CC-BY 4.0. */
/* 'The Old Ones' by Scott Buckley - released under CC-BY 4.0. */
/* 'Soul Searcher' by Scott Buckley - released under CC-BY 4.0. */
/* 'Machina' by Scott Buckley - released under CC-BY 4.0. */
/* www.scottbuckley.com.au */

/* List of tracks for offline/local server without CORS */
var randomizedAmbienceListLocal = [
    'sfx/ambience/ShadowsAndDust.mp3',
    'sfx/ambience/Decoherence.mp3',
    'sfx/ambience/monomyth_1_thedistantsun.mp3',
    'sfx/ambience/monomyth_7_theencounter.mp3',
    'sfx/ambience/Ephemera.mp3',
    'sfx/ambience/ComputationsInASnowstorm.mp3',
    'sfx/ambience/TheOldOnes.mp3',
    'sfx/ambience/sb_soulsearcher.mp3',
    'sfx/ambience/Machina.mp3'
];
/* Directly loading from Scott Buckley's website */
var randomizedAmbienceListWEB = [
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2023/11/ShadowsAndDust.mp3',
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2022/03/sb_decoherence.mp3',
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2019/07/sb_monomyth_1_thedistantsun.mp3',
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2019/07/sb_monomyth_7_theencounter.mp3',
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2020/03/sb_ephemera.mp3',
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2019/01/sb_computations.mp3',
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2018/10/sb_theoldones.mp3',
    'https://www.scottbuckley.com.au/wp-content/uploads/sb_soulsearcher.mp3',
    'https://www.scottbuckley.com.au/library/wp-content/uploads/2019/12/sb_machina.mp3'
];

var isLocalServer = window.location.href.startsWith('http://localhost') || window.location.href.startsWith('http://127.0.0.1');
var randomizedAmbienceList = randomizedAmbienceListLocal;
/*var randomizedAmbienceList = isLocalServer ? randomizedAmbienceListLocal : randomizedAmbienceListWEB;*/

let currentTrackIndex = Math.floor(Math.random() * randomizedAmbienceList.length);
var ambientMusic = {};
function playRandomTrack() {
    ambientMusic = new Howl({
        src: [randomizedAmbienceList[currentTrackIndex]],
        volume: parseFloat(localStorage.getItem('ambientVolume')) || 0.05,
        loop: false,
        onend: playRandomTrack
    });

    if (ambientMusic.playing()) {
        ambientMusic.stop();
    }
    currentTrackIndex = Math.floor(Math.random() * randomizedAmbienceList.length);
    ambientMusic.play();
}
playRandomTrack();

$(document).ready(function () {
    var $volumeSlider = $('#volumeSlider');
    var $volumeText = $('#volumeText');

    // Инициализация значений
    $volumeSlider.val(ambientMusic.volume());
    $volumeText.val(Math.round(ambientMusic.volume() * 100));

    $volumeSlider.on('input', function () {
        var volume = parseFloat($volumeSlider.val());
        ambientMusic.volume(volume);
        localStorage.setItem('ambientVolume', volume.toString());

        $volumeText.val(Math.round(volume * 100));
    });

    $volumeText.on('input', function () {
        var volume = Math.round(parseFloat($volumeText.val())) / 100;
        ambientMusic.volume(volume);
        localStorage.setItem('ambientVolume', volume.toString());
        $volumeSlider.val(volume);
    });

    var isMusicEnabled = localStorage.getItem('musicEnabled') !== 'false';
    function updateMusicButton() {
        var button = $('#musicSilenceToggle');
        var iconClass = isMusicEnabled ? 'play_arrow' : 'play_disabled';
        button.find('#musicSilenceToggle').text(iconClass);
        button.text(iconClass);
    }

    function toggleMusic() {
        isMusicEnabled = !isMusicEnabled;
        localStorage.setItem('musicEnabled', isMusicEnabled);
        updateMusicButton();

        if (isMusicEnabled) {
            playRandomTrack();
        } else {
            ambientMusic.stop();
        }
    }

    $('#musicSilenceToggle').on('click', toggleMusic);
    updateMusicButton();
    ambientMusic.mute(!isMusicEnabled);
});

