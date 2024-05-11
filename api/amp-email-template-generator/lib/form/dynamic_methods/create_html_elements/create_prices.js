/**
 * Returns html elements display different prices for different variant
 */

module.exports = (product) =>{
  let html = '';
  product.variants.forEach((v,index)=>{
    let i = index + 1;

    html = html + `
<div class="mt1 mb1 sk-hide sk-center sk-txt2" id="p${product.pNum}-price${i}">&#36;${v.price.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</div> 
    `;
  });

  return html;
};