const { AttributeRemoverFromTags } = require('./attr-remover');

const BodyExtractor = (data) => {
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

const ExtractDataBody = async (data) => {
  const regex = /<body[^>]*[^\/]?>([^]*[^\/])<\/body>/gim;
  let m, result;

  while ((m = regex.exec(data)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    m.forEach((match, groupIndex) => {
      if (groupIndex == 1) {
        result = match;
      }
    });
  }
  console.log('In body converter')

  result = result
    // .replace(/valign="([^"]+)"/gim, '')
    // .replace(/align="([^"]+)"/gim, '')
    // .replace(/bgcolor="([^"]+)"/gim, '')
    .replace(/border="([^"]+)"/gim, '')
    .replace(/-webkit-([^;]+);/gim, '')
    .replace(/!important/gim, '')
    .replace(/-ms-([^;]+);/gim, '')
    .replace(/mso-([^;]+);/gim, '')
    .replace('action', 'action-xhr')
    .replace(/<center/gim, '<div ')
    .replace('</center>', '</div>')
    .replace(/<font/gim, '<span')
    .replace(/<\/font>/gim, '</span>')
    .replace(/ee-mobile-first="([^"]+)"/gim, '')
    .replace(/ee-show-font-styles="([^"]+)?"/gim, '')
    .replace(/ee-show-font-styles="([^"]+)"/gim, '')
    .replace(/ee-template-version="([^"]+)?"/gim, '')
    .replace(/ee-template-version="([^"]+)"/gim, '')
    .replace(/ee-type="([^"]+)"/gim, '');

  result = AttributeRemoverFromTags(result);

  return result;
};

module.exports = {
  BodyExtractor,
  ExtractDataBody,
};
