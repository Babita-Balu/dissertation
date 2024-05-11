/**
 * This returns the css used for show/hide different buy buttons for different variant
 *
 * @param product A single product object
 * @param optionIndex Option number, use shopify as an example, we have option1, option2, option3, option4 etc..
 */


module.exports = (product, {optionIndex = 1} = {}) => {
  let selectors = [];
  product.variants.forEach((v,index)=>{
    let i = index + 1;
    selectors.push(`#p${product.pNum}-opt${optionIndex}-${i}:checked~div #p${product.pNum}-opt${optionIndex}-${i}-btn`);
  });

  return  `${selectors.join(',')} { display: block; }`;
};