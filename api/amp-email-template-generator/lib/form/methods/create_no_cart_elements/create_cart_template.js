module.exports = (options) => {
  let {buyButtonText} = options;
  return`
<!--START OF SKIPIFY SHOPPABLE TEMPLATES-->
<template id="skipify-cart"
          type="amp-mustache">
  {{#total}}
  <div>
    <span>Total: </span><span >&#36;{{total}}</span>
  </div>
  {{/total}}
  {{#link}}
  <div class="sk-btns sk-checkout">
    <a href="{{link}}">
      <div role="button" tabindex="0" class="sk-btn mb1" >
        <div class="sk-logo"></div>
        ${buyButtonText}
      </div></a>
  </div>
  {{/link}}
</template>
<!--END OF SKIPIFY SHOPPABLE TEMPLATES-->
`;
};