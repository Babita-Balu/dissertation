/**
 * This returns the labels/buttons for color swatches
 */

module.exports = (products) =>{
  let html = '';

  products.forEach((p,index)=>{
    html += `<label style="background: url(${p.swatch.image.src})" class="sk-swatch" id="p${p.pNum}-swatch-la" for="p${p.pNum}-swatch"><img src="${p.swatch.image.src}"></label>`;
  });

  html = `
<div class="sk-center mb1 mt1">
${html}
</div>`;

  return html;

};