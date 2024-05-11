/**
 * Returns html elements (radios buttons) for control the state of option selected.
 */

module.exports = (product, {optionIndex=1}={}) => {
  let html = '';
  product.variants.forEach((v,index)=>{
    let i = index + 1;
    html = html + `
<input name="p${product.pNum}-opt${optionIndex}" type="radio" id="p${product.pNum}-opt${optionIndex}-${i}" ${i===1?'checked':''}/>
`;
  });

  return html;
};