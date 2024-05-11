module.exports = (product, options = {}) => {
  let {pNum} = product;
  let {token, purchaseLink, apiRoot } = options;

  return `
<div data-amp-bind-hidden="!cart.p${pNum}_btn_loaded">
  <form method="post" id="skipify-cart-form-p${pNum}" action-xhr="${apiRoot}/link_checkouts/email_form/${token}">
    <input hidden name="p${pNum}" data-amp-bind-value="cart.p${pNum}" />
    <input hidden type="number" name="p${pNum}_qty" data-amp-bind-value="cart.p${pNum}_qty" />
    <input hidden name="token" value="${token}" />
    <input hidden name="t" value="tracking" />
    <input hidden name="purchase_link" value="${purchaseLink}" />
    <div submit-success template="skipify-cart"></div>
  </form>
</div>
`;
};