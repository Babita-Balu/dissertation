/**
 * Create the default checkout button for each product, this is needed because AMP cannot request server on load.
 * But user needs to see the buy button without clicking anything.
 * @param product
 * @param options
 * @returns {string}
 */
module.exports = (product, options = {}) => {
  let {pNum,} = product;
  let {token, purchaseLink, buyButtonText} = options;
  let firstVariant = product.variants[0];
  return `
<div data-amp-bind-hidden="!!cart.p${pNum}_btn_loaded" class="sk-btns sk-checkout">
<a href="${purchaseLink}?variant_id=${firstVariant['id']}_1&token=${token}&t=tracking">
  <div role="button" tabindex="0" class="sk-btn mb1" >
    <div class="sk-logo"></div>
    ${buyButtonText}
  </div></a>
</div>
`;
};