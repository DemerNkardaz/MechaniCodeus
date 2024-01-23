import * as $item from './variables.js';
let tagReplacements;
let decodeTagsReplaces;
let refreshCodeHighlight;
let disableCodeHighlight;
$(document).ready(function () {
    var tagReplacementsGroup = {
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
    tagReplacements = function () {
        $item.contentAreaContainer.html(function (index, oldHtml) {

            for (var tag in tagReplacementsGroup) {
                oldHtml = oldHtml.replace(new RegExp('\\b' + tag + '\\b', 'g'), tagReplacementsGroup[tag]);
            }

            return oldHtml;
        });
    }
    decodeTagsReplaces = function () {
        $item.contentAreaContainer.html(function (index, oldHtml) {

            // Перебираем все теги в обратном порядке
            for (var tag in tagReplacementsGroup) {
                var regex = new RegExp(tagReplacementsGroup[tag], 'g');
                oldHtml = oldHtml.replace(regex, tag);
            }

            return oldHtml;
        });
    }
    $(document).on('click', '#decodeTags', function () {
        decodeTagsReplaces();
    });
    $(document).on('click', '#encodeTags', function () {
        tagReplacements();
    });


    refreshCodeHighlight = function () {

    }
    disableCodeHighlight = function () {

    }

})

export {
    tagReplacements,
    decodeTagsReplaces,
    refreshCodeHighlight,
    disableCodeHighlight
};