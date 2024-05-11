module.exports = (data, options) => {

  let { quantityStyle, cartLayout } = options;

  if (cartLayout === 'none') return '';

  let itemsCounter = `
  (<span data-amp-bind-text="cart.size"></span>&nbsp;
          <span data-amp-bind-class='(cart.size > 1 ? "sk-show-inline":"hide")'>items</span>
          <span data-amp-bind-class='(cart.size <= 1 ? "sk-show-inline":"hide")'>item</span>)
  `;
  if (quantityStyle === 'dropdown') itemsCounter = ''; //can't count cart size for now because dropdown force string value
  // and we can't use parseInt in amp.

  let classBindingHtml = 'data-amp-bind-class=\'(!cart.visible ? "sk-hide-mobile":"hide")+ " sk-checkout sk-blk"\' class="sk-checkout sk-hide-mobile sk-blk"';

  if (cartLayout === 'minimal') {
    classBindingHtml = 'class="sk-checkout sk-blk" data-amp-bind-class=\'(cart.size < 1 ? "show":"hide")+ " sk-checkout sk-blk"\'';
  }

  let checkoutHtml = `
    <div on="tap:AMP.setState({
        cart: {
           visible: true
                           }
      }),skipify-cart-form.submit" role="button" tabindex="99" class="sk-btn hide" data-amp-bind-class='(cart.size >= 1 ? "sk-show-flex":"hide") + " sk-btn"'>
      <div class="sk-cart-icon"></div>BUY WITHIN EMAIL ${itemsCounter}  </div>
  `;



  return `

<div ${classBindingHtml}>  
  ${cartLayout === 'minimal' ? '' : checkoutHtml}
  <div class="sk-btn disabled" data-amp-bind-class='(cart.size < 1 ? "sk-show-flex":"hide") + " sk-btn disabled"'>
  <div class="sk-cart-icon"></div>
  Cart is empty</div>
</div>

`;
};