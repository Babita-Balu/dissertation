/**
 * Returns html elements for buy with 1-touch buttons for different variants in a single product
 */

module.exports = (product, options) => {
  let {token, purchaseLink, buyButtonImgSrc} = options;
  let html = '';
  product.variants.forEach((v,index)=>{
    let i = index + 1;
    html = html + `
<div id="p${product.pNum}-opt1-${i}-btn"
class="mt1 mb1 buy-btn btns sk-hide"> <a
  href="${purchaseLink}?variant_id=${v.id}&token=${token}">
  <img
    src="${buyButtonImgSrc}" />
</a> </div>
    `;
  });

  return html;
};