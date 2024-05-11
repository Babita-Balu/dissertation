const AttributeRemoverFromTags = (data) => {
  let regexForAnchor = /<a[^>]*?>/gim;
  let regexForAlt = /alt="([^"]+)"/gim;

  let anchorArray = data.match(regexForAnchor);
  if (anchorArray !== null) {
    if (anchorArray.length > 0) {
      anchorArray.forEach((a) => {
        if (a.includes(`alt="`)) {
          let newValue = a.replace(regexForAlt, '');
          data = data.replace(a, newValue);
        }
      });
    }
  }

  let regexForP = /<p[^>]*?>/gim;
  const regexForWidth = /width="([^"]+)"/gim;
  const regexForHeight = /height="([^"]+)"/gim;

  let parahraphArray = data.match(regexForP);
  if (parahraphArray !== null) {
    if (parahraphArray.length > 0) {
      parahraphArray.forEach((p) => {
        let oldP = p;
        p = p.replace(regexForHeight, '').replace(regexForWidth, '');
        data = data.replace(oldP, p);
      });
    }
  }

  let regexForDiv = /<div[^>]*?>/gim;
  let regexForTable = /<table[^>]*?>/gim;
  let regexForTD = /<td[^>]*?>/gim;
  const regexForBG = /background="([^"]+)"/gim;
  const regexForSrc = /src="([^"]+)"/gim;

  let divArray = data.match(regexForDiv);
  let tableArray = data.match(regexForTable);
  let TDArray = data.match(regexForTD);

  if (divArray !== null) {
    if (divArray.length > 0) {
      divArray.forEach((p) => {
        let oldP = p;
        p = p
          .replace(regexForHeight, '')
          .replace(regexForSrc, '')
          .replace(regexForAlt, '')
          .replace('alt', '');

        data = data.replace(oldP, p);
      });
    }
  }

  if (tableArray !== null) {
    if (tableArray.length > 0) {
      tableArray.forEach((p) => {
        let oldP = p;
        p = p.replace(regexForHeight, '');
        data = data.replace(oldP, p);
      });
    }
  }

  if (TDArray !== null) {
    if (TDArray.length > 0) {
      TDArray.forEach((p) => {
        let oldP = p;
        p = p.replace(regexForBG, '');
        data = data.replace(oldP, p);
      });
    }
  }

  return data;
};

module.exports = {
  AttributeRemoverFromTags,
};
