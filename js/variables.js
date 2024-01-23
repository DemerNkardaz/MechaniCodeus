let HeadText;
let HeadText_Title;
let HeadText_AfterTitle;
let HeadLogo;
let dataErrorum;
let dataErrorum_overflow;
let dataErrorum_anim;
let searchPanel;
let contentAreaContainer;
let leftContainer;
let rightContainer;
let classesTypeSelector;
let deployerList;
let deployerTypesList;
let externalLinkElement;
let listArrowMarker;
let LanguageSelector;
let updatedRightContent;
let updateRightContent;

$(document).ready(function () {
    HeadText = $('#LexMechanicus');
    HeadText_Title = HeadText.find('span:first');
    HeadText_AfterTitle = HeadText.find('span').eq(1);
    HeadLogo = $('#LexGearus');
    dataErrorum = $('#erroremCogitatorum');
    dataErrorum_overflow = $('#currentGearDegree');
    dataErrorum_anim = ['alertingMig_00', 'alertingMig_01', 'alertingMig_02', 'alertingMig_03'];
    searchPanel = $('#searchAttrib');
    contentAreaContainer = $('#contentAreaContainer');
    leftContainer = $('#leftContainer');
    rightContainer = $('#rightContainer');
    classesTypeSelector = $('#ClassesTypeSelector');
    deployerList = $('#hierarchyDeployer');
    deployerTypesList = $('#attributeTypesDeploy')
    externalLinkElement = (
        '<span class="material-icons external">launch</span>'
    );
    listArrowMarker = (
        '<span class="material-icons hierarchical_arrow">chevron_right</span>'
    );
    LanguageSelector = $('#languageSelectorContainer');

    updateRightContent = function () {
        updatedRightContent = rightContainer.html();
    }

});

export {
    HeadText,
    HeadText_Title,
    HeadText_AfterTitle,
    HeadLogo,
    dataErrorum,
    dataErrorum_overflow,
    dataErrorum_anim,
    searchPanel,
    contentAreaContainer,
    leftContainer,
    rightContainer,
    classesTypeSelector,
    deployerList,
    deployerTypesList,
    externalLinkElement,
    listArrowMarker,
    LanguageSelector,
    updatedRightContent,
    updateRightContent
};