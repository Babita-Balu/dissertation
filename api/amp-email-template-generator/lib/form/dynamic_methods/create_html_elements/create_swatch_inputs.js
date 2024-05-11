/**
 * Returns html elements (radios buttons) for control the state of option selected.
 */

module.exports = (products,{groupNum = 1} = {}) => {
  let html = '';
  products.forEach((p,index)=>{
    let i = index + 1;
    html = html + `
<input name="g${groupNum}-swatch" type="radio" id="p${p.pNum}-swatch" ${i===1?'checked':''}/>
`;
  });

  return html;
};