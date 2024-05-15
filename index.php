<?php

?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>МеханиКодеус</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/dark-hive/jquery-ui.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ContentTools@1.6.1/build/content-tools.min.css">
    <script src="https://cdn.jsdelivr.net/npm/ContentTools@1.6.1/build/content-tools.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

    <link rel="stylesheet" href="css/default.css">
    <script type="module" src="js/variables.js"></script>
    <script type="module" src="js/lang.js"></script>
    <script type="module" src="js/default.js"></script>
    <script type="module" src="js/page.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js"></script>
    <script src="js/sfx.js"></script>
    <script type="module" src="js/skins.js"></script>
    <script type="module" src="js/git.js"></script>
    <script type="module" src="js/edit.js"></script>
</head>

<body>
    <div id="backgroundVideo">
        <video autoplay loop muted>
            <source src="bgsndl_low.mp4" type="video/mp4">
        </video>
        <div></div>
    </div>
    <div id="erroremCogitatorum" class="glitch">
        <span data-key="erroremCogitatorum">Перегрузка систем когитатора!<br>Сверхнорма данных на:</span>&#8195;<span id="currentGearDegree" style="display: inline-block; width: 120px; max-width: 280px; text-align: right;"></span>
    </div>

    <section class="mecha_header">
        <div class="flex-container">
            <span id="LexGearus" class="material-icons">
                settings
            </span>
            <a href="index.html" id="MechaHeader">
                <h1 id="LexMechanicus">
                    <span data-key="MechaTitle">МеханиКодеус</span><span></span>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        DEV
                    </span>
                </h1>

            </a>
            <div id="searchPanelScreen" class="iron_border">

                <div class="input-group secondaryScreen">
                    <span class="input-group-text material-icons">
                        search
                    </span>
                    <input type="text" class="form-control" id="searchAttrib" aria-label="Search" aria-describedby="button-addon">
                    <div class="noise_glitch" style="opacity: 0.3;"></div>
                </div>

            </div>
        </div>

    </section>
    <div class="flex-container">
        <div class="container left" id="leftContainer">
            <div>
                <div id="ClassesTypeSelector">
                    <div id="selectGame">
                        <div class="attributeLoader iron_border" data-file-url="html/pages/dowss/dowss_attrib.html" data-options-url="html/pages/dowss/dowss_opts.html" data-game="SS">
                            <div class="insetShadowImg"><span><img src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/9450/d13abadb0f456659a634d2cd8286665a0c76a2c6.jpg"></span></div>
                        </div>&#x2006;<div class="attributeLoader iron_border" data-game="2R">
                            <div class="insetShadowImg"><span><img class="disabled" src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/56400/56241ad73fdc9a4d208d5417a0d9109e9a6e29cd.jpg"></span></div>
                        </div>&#x2006;<div class="attributeLoader iron_border" data-game="SM">
                            <div class="insetShadowImg"><span><img class="disabled" src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/55150/46b0ce6e587472d1d56cc88dd32c8b57392f8b10.jpg"></span></div>
                        </div>
                    </div>
                    <div id="attributeType">
                        <div class="iron_border">
                            <div class="secondaryScreen">
                                <div id="attributeTypesDeploy">
                                    <span class="optionloader material-icons"></span>
                                </div>
                                <div class="noise_glitch"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr>

            <div class="iron_border">
                <div id="hierarchyMain">
                    <div class="noise-bar"></div>
                    <div class="hierarchyControls">
                        <span class="material-icons">
                            <button type="button" class="btn btn-primary sfx_common" id="collapseShowAllLists">unfold_more</button>&#x2006;<!---<&#x2006;button type="button"
                                    class="btn btn-primary">filter_list_off</button>---><button id="randomPage" class="btn btn-primary sfx_common"><span class="material-icons sfx_common">shuffle</span></button>&#x2006;<button type="button" class="btn btn-primary sfx_common" id="homePage">home</button>
                            <div class="language-selector" id="languageSelectorContainer"></div>&#x2006;<button type="button" class="btn btn-primary sfx_common" data-bs-toggle="modal" data-bs-target="#helpModal">help_outline</button>
                        </span>
                    </div>
                    <div id="hierarchyDeployer"></div>
                    <div class="cogitatorInterface glitch">
                        <span>+++&#8195;</span>
                        <span data-key="cogitatorInterface">Интерфейс Когитатора / Доступ подключен</span>
                        <span>&#8195;+++</span>
                    </div>
                    <div class="noise_glitch"></div>
                </div>
            </div>

        </div>
        <div class="container right" id="rightContainer">
            <div class="subcontainer">
                <div id="contentAreaContainer"></div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
        <div class="modal-dialog HelpPopup iron_border">
            <div class="modal-content HelpPopup Greyish secondaryScreen">

                <div class="modal-header HelpPopup">
                    <a class="sfx_common" href="https://store.steampowered.com/app/9450/Warhammer_40000_Dawn_of_War__Soulstorm">
                        <img id="SteamSSLink" src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/9450/d13abadb0f456659a634d2cd8286665a0c76a2c6.jpg">
                    </a>
                    <h5 class="modal-title" id="helpModalLabel" data-key="Help_Title">МеханиКодеус: описания атрибутов</h5>
                    <button type="button" class="btn-close sfx_close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p data-key="Help_Description_1">На данном ресурсе располагается информация об атрибутах, задействованных в стратегии «Warhammer 40,000: Dawn of War — Soulstorm».</p>
                    <p class="smalltext">
                        <span data-key="Help_Description_2">Предлагать исправления вы можете на <a href="https://github.com/DemerNkardaz/MechaniCodeus/issues">странице Issues GitHub</a>.</span>
                        <br>
                        <span data-key="Help_Description_5">Для предложения улучшений вы можете написать в <a href="https://github.com/DemerNkardaz/MechaniCodeus/discussions/1">Обсуждение идей</a>.</span>
                        <br>
                        <span data-key="Help_Description_6">А в <a href="https://github.com/DemerNkardaz/MechaniCodeus/discussions/2">Обсуждении для реквестов авторских материалов</a> вы можете отправить запрос на добавление своих материалов в базу знаний.</span>
                    </p>
                    <p class="smalltext" data-key="Help_Description_3">На фоне изображена запись из игры «Warhammer 40,000: Space Marine (2011)».</p>
                    <p class="smalltext"><span data-key="Help_Description_4">Последнее изменение: </span><span id="lastModified"></span>.</p>

                    <div class="container additional">
                        <h5 data-key="Help_Resources">Ресурсы</h5>
                        <hr>
                        <h6 data-key="Help_Main">Основное</h6>
                        <ul class="list-group">
                            <li class="list-group-item"><a href="https://modstudio.corsix.org">Corsix's Mod Studio</a></li>
                            <li class="list-group-item"><a href="https://vk.com/dowmod">«Dawn Of War 1,2,3 - Создание карт, модов» <span data-key="Help_Main_VK">ВКонтакте</span></a></li>
                            <li class="list-group-item"><a href="http://forums.warforge.ru/index.php?showforum=97">«Warhammer 40,000: Dawn of War > Лаборатория модификаций» WARFORGE</a></li>
                            <li class="list-group-item"><a href="http://www.mediafire.com/view/jj35xkeyt3z56jx">3ds Max 2008 Santos Tools</a></li>
                            <li class="list-group-item"><a href="https://www.moddb.com/games/dawn-of-war-dark-crusade/downloads/dark-crusade-mod-tools">Dark Crusade Mod Tools</a></li>
                            <li class="list-group-item"><a href="https://skins.hiveworldterra.co.uk/Downloads/detail_DawnOfWarTextureTool.html">Texture Tool</a></li>
                            <li class="list-group-item"><a href="https://www.moddb.com/games/dawn-of-war/downloads/relic-audio-converter">Relic's Audio Converter</a></li>
                        </ul>
                        <h6>Google Fonts</h6>
                        <ul class="list-group">
                            <li class="list-group-item"><a href="https://fonts.google.com/icons">Material Icons</a></li>
                            <li class="list-group-item"><a href="https://fonts.google.com/icons" style="font-family: IBM Plex Mono">IBM Plex Mono</a></li>
                            <li class="list-group-item"><a href="https://fonts.google.com/specimen/Cormorant+Garamond" style="font-family: Cormorant Garamond">Cormorant Garamond</a></li>
                            <li class="list-group-item"><a href="https://fonts.google.com/specimen/Tektur" style="font-family: Tektur">Tektur</a></li>
                            <li class="list-group-item"><a href="https://fonts.google.com/specimen/Noto+Color+Emoji?query=Noto+Color+Emoji">Noto Color Emoji</a></li>
                        </ul>
                        <h6 data-key="Music">Музыка</h6>
                        <ul class="list-group">
                            <li class="list-group-item">'Shadows and Dust' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'Decoherence' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'The Distant Sun' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'The Encounter' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'Ephemera' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'Computations in a Snowstorm' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'The Old Ones' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'Soul Searcher' by Scott Buckley - released under CC-BY 4.0.</li>
                            <li class="list-group-item">'Machina' by Scott Buckley - released under CC-BY 4.0.</li>
                        </ul>
                        <a href="www.scottbuckley.com.au" class="scottLink">www.scottbuckley.com.au</a>
                    </div>

                    <div class="modalSetupBottom">
                        <span class="material-icons"><button type="button" class="btn btn-primary sfx_common" id="cleanTheCache" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Clean Cache" data-key="CacheCleaning">cleaning_services</button></span>&#x2006;<span class="material-icons" style="margin-top: 7px;"><button type="button" class="btn btn-primary sfx_common" id="silenceToggle" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="On/Off UI Sounds" data-key="UISounds">volume_up</button></span>&ensp;
                        <span class="ambienceBlock">
                            <span class="material-icons"><button type="button" class="btn btn-primary sfx_common" id="musicSilenceToggle" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="On/Off Music" data-key="AmbienceMusic">play_arrow</button></span>&#x2006;<span class="sliderParent"><input class="commonSliders sfx_common" type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.25"></span>&#x2006;
                            <span><input type="text" class="btn btn-primary sfx_common" id="volumeText" value="0.25"></span>
                        </span>&ensp;
                        <span class="skin_setup"><span class="material-icons skinsIcon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="UI Themes" data-key="ThemesOption">color_lens</span>&#x2006;<span class="btn btn-primary sfx_common" id="skin_default" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Monitorum Mechanicum" data-key="SkinDefault">
                                <div class="skin_preview"></div>
                            </span>&#x2006;
                            <span class="btn btn-primary sfx_common" id="skin_yellow" data-skin="css/skins/skins_yellow.css" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Classical Marine" data-key="SkinYellow">
                                <div class="skin_preview"></div>
                            </span>&#x2006;
                            <span class="btn btn-primary sfx_common" id="skin_red" data-skin="css/skins/skins_red.css" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Bloodpact" data-key="SkinRed">
                                <div class="skin_preview"></div>
                            </span>&#x2006;
                            <span class="btn btn-primary sfx_common" id="skin_blue" data-skin="css/skins/skins_blue.css" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Dark Bork'an" data-key="SkinBlue">
                                <div class="skin_preview"></div>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="homePageControls">
        <span class="material-icons controlIcons more sfx_common" id="showThePageCommands">more_vert</span>
        <div id="homePageButtonRoll">
            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Create Page" data-key="CreatePage" id="makeNewPage">post_add</span>
            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Edit Page" data-key="EditPage" id="editCurrentPage" data-state="off">edit</span>
            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Code Page" data-key="CodePage" id="codeCurrentPage" data-state="off">code</span>
            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Save Page" data-key="SavePage" id="saveCurrentPage">save</span>
            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Reset Page" data-key="ResetPage" id="resertCurrentPage">restart_alt</span>
            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Download Page" data-key="DownloadPage" id="downloadCurrentPage">file_download</span>

            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Download Page" data-key="encodeTags" id="encodeTags" style="margin-top:32px;">label</span>
            <span class="material-icons controlIcons sfx_common" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="generic_tooltip" data-bs-title="Download Page" data-key="decodeTags" id="decodeTags">label_off</span>
        </div>
    </div>

    <div class="modal fade" id="pageNameModal" tabindex="-1" aria-labelledby="pageNameModalLabel" aria-hidden="true">
        <div class="modal-dialog HelpPopup iron_border">
            <div class="modal-content HelpPopup Greyish secondaryScreen">
                <div class="modal-header HelpPopup">
                    <h5 class="modal-title" id="pageNameModalLabel" data-key="EnterPageNameForm">Имя страницы</h5>
                    <button type="button" class="btn-close sfx_close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pageCreationInput">
                    <input type="text" id="pageNameInput" class="form-control" placeholder>
                    <br><span data-key="pageMainTags">Основные теги</span>
                    <input type="text" id="pageMainTagsInput" class="form-control" placeholder>
                    <br><span data-key="pageSecondTags">Вторичные теги</span>
                    <input type="text" id="pageSecondTagsInput" class="form-control" placeholder>
                    <div class="doubleInputFlex">
                        <span data-key="pageAuthorName">Автор</span>
                        <span class="halvedInputs"><input type="text" id="pageAuthorNameInput" class="form-control" placeholder><input type="text" id="pageAuthorURLInput" class="form-control" placeholder="URL"></span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary sfx_close" data-bs-dismiss="modal" data-key="CancelPageForm">Отмена</button>
                    <button type="button" class="btn btn-primary sfx_common" id="savePageNameBtn" data-key="CreatePageForm">Создать</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        hljs.initHighlightingOnLoad();
    </script>
</body>

</html>