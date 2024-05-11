const {createFile} = require("./createFile");

const HeadExtractor = (data) => {
    const regex = /<head>(.+)((\s)+(.+))+<\/head>/gim;
    let m, headString;

    while ((m = regex.exec(data)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            if (groupIndex == 0) {
                headString = match;
            }
        });
    }
    return headString;
};

const ExtractDataHead = (data) => {
    console.log('In head converter')
    const regex = /<head>([^]*[^\/])<\/head>/gim;
    const regexToRemoveFontFace = /[ ?]*(@font\-face)[ ?]?(\{([^}]*)\})/gim;
    const regexToRemoveYahooMediaQuery = /(@media)?[ *]?(screen)[ *]?(yahoo)[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveWebkitKeyframes = /(@-webkit-keyframes)[ *]?(\s)[ *]?[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveImport = /(@import)[ ?]?(url)[ ?]?(\(([^}]*)\)\;)/gmi;
    const regexToRemoveMSViewPort = /^[ ?]*(@-ms-viewport)[ ?]?(\{([^}]*)\})/gmi;
    const regexToRemoveWebkitMediaQuery = /(@media)?[ *]?(screen)[ *]?(and)[ *]?(\(-webkit-min-device-pixel-ratio: 0)\)[^{]+\{([\s\S]+?})\s*}/gmi;
    // style @keyframes fixes
    const regexToRemoveUnecessary = /(@keyframes)?[ *]?(shake-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveUnecessary1 = /(@keyframes)?[ *]?(pulse-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveUnecessary2 = /(@keyframes)?[ *]?(fade-up-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveUnecessary3 = /(@keyframes)?[ *]?(fade-in-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveUnecessary4 = /(@keyframes)?[ *]?(spin-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveUnecessary5 = /(@keyframes)?[ *]?(bounceIn-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveUnecessary6 = /(@keyframes)?[ *]?(dots-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;
    const regexToRemoveUnecessary7 = /(@keyframes)?[ *]?(recording-data-v-0a2a5063)[ *]?()[^{]+\{([\s\S]+?})\s*}/gmi;

    let m, result;

    while ((m = regex.exec(data)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                result = match;
            }
        });
    }
    if (result !== undefined) {
        console.log('Not undefined')
        result = result
            .replace(regexToRemoveFontFace, '')
            .replace(regexToRemoveUnecessary, '')
            .replace(regexToRemoveUnecessary1, '')
            .replace(regexToRemoveUnecessary2, '')
            .replace(regexToRemoveUnecessary3, '')
            .replace(regexToRemoveUnecessary4, '')
            .replace(regexToRemoveUnecessary5, '')
            .replace(regexToRemoveUnecessary6, '')
            .replace(regexToRemoveUnecessary7, '')
            .replace(regexToRemoveMSViewPort, '')
            .replace(regexToRemoveWebkitMediaQuery, '')
            .replace(regexToRemoveYahooMediaQuery, '')
            .replace(regexToRemoveWebkitKeyframes, '')
            .replace(regexToRemoveImport, '')
            .replace(/!important/gim, '')
            .replace(/name="([^"]+)"/gim, '')
            .replace(/http-equiv="([^"]+)"/gim, '')
            .replace(/<title>([^]*[^\/])?<\/title>/gim, '')
            .replace(/<title>([^]*[^\/])<\/title>/gim, '')
            .replace(/charset="([^"]+)"/gim, '')
            .replace(/<link[^>]*?>/gim, '')
            .replace(
                /<style[^>]*?>/g,
                `<style amp-custom>
          img {
            height: 100%;
            object-fit: contain;
        }`
            );
        // console.log(result);
        return result;
    }
};

// ExtractDataHead("a");

module.exports = {
    HeadExtractor,
    ExtractDataHead,
};
