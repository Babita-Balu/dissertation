/**
 * Returns css used to show/hide elements base on which swatch input is active
 * @param products - a list of products
 * @returns {string}
 */
module.exports = (products) =>{
  // this part add/remove a border to swatch images

  let swatchLabelSelectors = [];
  products.forEach((p,index)=>{
    swatchLabelSelectors.push(`#p${p.pNum}-swatch:checked~div #p${p.pNum}-swatch-la`);
  });

  let css = `${swatchLabelSelectors.join(',')} {     border-bottom: 1px solid #aaa;  }`;


  // this part show/hide product parts above and bellow the swatches

  let productPartsSelectors = [];

  products.forEach((p,index)=>{
    productPartsSelectors.push(`#p${p.pNum}-swatch:checked~div .p${p.pNum}-part`);
  });

  css = css + `
${productPartsSelectors.join(',')} { display: block; }`;

  return css;
};