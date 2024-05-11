module.exports = (product) => {
  let firstVariant = product.variants[0];
  let {pNum} = product;

  return `
<div data-amp-bind-hidden="!!cart.p${pNum}_btn_loaded">
  <span>Total: </span><span >&#36;${firstVariant.price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}</span>
</div>
  `;
};