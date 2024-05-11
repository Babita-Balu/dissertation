/* eslint-disable no-useless-catch */
const { prepareData } = require('./lib/helpers');
const getFormAmp = require('./lib/form/amp');
const getFormAmpComponents = require('./lib/form/amp_components');
const _ = require('lodash');

const getTemplates = async (data, options = {}) => {
  let config = _.merge(data['config'] || {}, options); // merge in data config with programing data
  try {
    //set up default parameters
    let { apiRoot = 'https://dev-api.skipify.com/v2', //not include the trailing /
      apiKey = '',
      purchaseLink = 'https://dev.skipify.com/l', //the redirect link for making purchase
      type = 'form', // default inbox cart with form submission
      useCarousel = true, // display root product groups with carousels
      useLegacyMode = false, // for demo and testing
      productStyle = 'product-default', // product-default and product-compact
      themeColor = '#000000', //link, header and button theme color
      option1Style = 'dropdown', // choose between button and dropdown
      quantityStyle = 'button', // choose between button and dropdown
      maxWidth = '600px', //the wrapper max width on large screen
      mobileBreakpoint = '600px', //mobile break point for media query
      cartLayout = 'default', // choose between default and minimal

      carouselHeight = 1000, // carousel configs passing through
      carouselWidth = 'auto',
      carouselAutoplay = false,
      carouselDelay = '',
      carouselLoop = false,
      carouselLayout = 'fixed-height',
      dropdownHeight = 60, // dropdown configs passing through
      dropdownText = 'Select a size',

      disabledBuyButtonText = 'SELECT AN OPTION FIRST', // buy button configs passing through
      buyButtonText = 'BUY WITHIN EMAIL',
      buyButtonBgColor = 'black',
      buyButtonTextColor = 'white',
      customAmpCss = '',
      customHtmlCss = '',

      buyButtonImgSrc = 'https://storage.googleapis.com/skipify-assets/images/buy-btn.png', // for dynamic html only

      useAMPList = true,

    } = config;

    apiRoot = apiRoot.replace(/\/$/, ''); //remove trailing is there is one to avoid user mistake

    if (!data) throw new Error('Missing products data');
    else {
      //validate and transform given data, request api to generate all the links/token/ids needed.
      data = await prepareData(data, { apiRoot, type, useLegacyMode, apiKey });
    }

    if (data.hasOwnProperty('useAMPList')) useAMPList = data.useAMPList;

    let amp, amp_components;

    let opts = {
      purchaseLink,
      apiRoot,
      useCarousel,
      useLegacyMode,
      productStyle,
      themeColor,
      option1Style,
      quantityStyle,
      mobileBreakpoint,
      maxWidth,
      apiKey,
      cartLayout,
      useAMPList,
      carouselAutoplay,
      carouselDelay,
      carouselHeight,
      carouselWidth,
      carouselLoop,
      carouselLayout,
      dropdownHeight,
      dropdownText,
      buyButtonText,
      buyButtonBgColor,
      buyButtonTextColor,
      disabledBuyButtonText,
      customAmpCss,
      customHtmlCss,
      buyButtonImgSrc,
    };

    if (type === 'form') {
      amp = getFormAmp(data, opts);
      amp_components = getFormAmpComponents(data, opts);

    }
    else {
      throw new Error('Invalid type');
    }

    return { amp, amp_components };
  } catch (e) {
    throw e;
  }

};

module.exports = {
  getTemplates: getTemplates
};