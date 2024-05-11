module.exports = (data, options) => {
  let { purchaseLink, apiRoot, useLegacyMode, cartLayout } = options;

  if (cartLayout === 'none') return '';

  let { products } = data;
  let counter = 0;
  let inputs = [];
  products.forEach(p => {
    if (Array.isArray(p)) {
      p.forEach((ps) => {
        if (Array.isArray(ps)) {
          ps.forEach(pps => {
            counter++;
          });
        } else {
          counter++;

        }
      });
    } else {
      counter++;
    }
  });
  for (let i = 1; i <= counter; i++) {
    inputs.push(`<input hidden name="p${i}" data-amp-bind-value="cart.p${i}" />`);
    inputs.push(`<input hidden name="p${i}_option1" data-amp-bind-value="cart.p${i}_option1" />`);
    inputs.push(`<input hidden type="number" name="p${i}_qty" data-amp-bind-value="cart.p${i}_qty" />`);
  }
  let xhrSrc = `${apiRoot}/link_checkouts/email_form/${data.token}`;
  if (useLegacyMode) xhrSrc = 'https://skipify-staging-1.herokuapp.com/amp/button';
  let classBindingHtml = 'data-amp-bind-class=\'(cart.visible ? "show":"sk-hide-desktop") + " sk-blk"\' class="sk-hide-desktop sk-blk"';
  if (cartLayout === 'minimal') {
    classBindingHtml = 'data-amp-bind-class=\'(cart.size >= 1 ? "show":"hide") + " sk-blk"\' class="show sk-blk"';
  }
  return `
<!--START OF SKIPIFY SHOPPABLE FORM-->
<div ${classBindingHtml}>
<form method="post" id="skipify-cart-form" action-xhr="${xhrSrc}"
on="submit-success: AMP.setState({
                res: event.response
            })"
>
${inputs.join('\n')}
<input hidden name="token" value="${data.token}" />
<input hidden name="t" value="tracking" />
<input hidden name="purchase_link" value="${purchaseLink}" />
<div class="sk-cart-wrapper" submit-success template="skipify-cart"></div>


</form>
</div>
<div style="height: 10px;"></div>

<!--END OF SKIPIFY SHOPPABLE FORM-->
  `;
};