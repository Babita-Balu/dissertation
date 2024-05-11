/**
 * Returns html elements display different options in a button
 */

module.exports = (product) => {
  let html = '';
  product.variants.forEach((v,index)=>{
    let i = index + 1;

    html = html + `
<label class="sk-btn opt-btn" id="p${product.pNum}-opt1-${i}-la" for="p${product.pNum}-opt1-${i}">${v.title || v.option1}</label>`;
  });

  html = `
<div class="sk-center">
${html}
</div>`;

  return html;
};