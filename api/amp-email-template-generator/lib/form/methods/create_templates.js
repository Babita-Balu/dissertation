const createNoCartElements = require('./create_no_cart_elements');

module.exports = (data, options) =>{
  let {products} = data;
  let {cartLayout, buyButtonText} = options;

  if (cartLayout === 'none') {
    //no cart, does not need item list etc
    return createNoCartElements.createCartTemplate(options);
  }

  let pNum = 0;
  let lines = [];

  const createItem = (p) =>{
    let pId = `p${p.pNum}`;
    let html = `
{{#items.${pId}}}
<div class="sk-item mb1 sk-show-flex">
<div class="sk-thumb">
<amp-img class="cover" layout="fill" src="${p.images[0].src}"></amp-img>
</div>
<div class="sk-pd-info">
  <div class="sk-txt1" style="text-align: left">{{items.${pId}.title}}</div>
  <div class="sk-txt2" style="text-align: left">{{items.${pId}.option1}}</div>
  <div class="sk-txt2" style="text-align: left">&#36;{{items.${pId}.price}} x {{items.${pId}.qty}}</div>
</div>
<div class="sk-remove" on="tap:AMP.setState({
    p${p.pNum}: null,
    cart: {size: cart.size-1, p${p.pNum}: null}
  }),skipify-cart-form.submit" role="button" tabindex="6">
X
</div>

</div>
{{/items.${pId}}}

    `;
    lines.push(html);
  };

  products.forEach(p=>{
    if (Array.isArray(p)) {
      p.forEach((ps) =>{
        if (Array.isArray(ps)) {
          ps.forEach(pps=>{
            pNum ++;
            createItem(pps);
          });
        } else{
          pNum ++;
          createItem(ps);
        }

      });
    } else {
      pNum ++;
      createItem(p);
    }
  });

  const createBuyBtn = ()=>{
    if (cartLayout === 'default') {
      return `
<div class="sk-checkout">
<div on="tap:AMP.setState({
cart: {
visible: false
               }
})" role="button" tabindex="99" class="sk-btn mb1 light sk-hide-mobile" >Add more items</div>
</div>        
{{#link}}
<div class="sk-btns sk-checkout">
<a href="{{link}}">
<div role="button" tabindex="10" class="sk-btn mb1" >
<div class="sk-logo"></div>
${buyButtonText}
</div></a>
</div>
{{/link}}
      `;
    } else if (cartLayout === 'minimal') {
      return `      
{{#link}}
<div class="sk-btns sk-checkout">
<a href="{{link}}">
<div role="button" tabindex="10" class="sk-btn mb1" >
<div class="sk-logo"></div>
${buyButtonText} (&#36;{{total}})
</div></a>
</div>
{{/link}}
      `;
    }
  };

  if (cartLayout === 'minimal'){

    return `
    <!--START OF SKIPIFY SHOPPABLE TEMPLATES-->
<template id="skipify-cart" type="amp-mustache">
${createBuyBtn()}
</template>
    <!--END OF SKIPIFY SHOPPABLE TEMPLATES-->
    `;
  }


  return `
<!--START OF SKIPIFY SHOPPABLE TEMPLATES-->
<template id="skipify-cart"
          type="amp-mustache">
  <h2 style="text-align: left">      YOUR CART </h2>
  {{#items}}
      ${lines.join('\n')}
  {{/items}}
  {{#total}}
  
  <div class="sk-total">
  <span class="text-3">Total: </span><span class="sk-txt2" >&#36;{{total}}</span>
  </div>
  {{/total}}
      
  ${createBuyBtn()}
</template>
<!--END OF SKIPIFY SHOPPABLE TEMPLATES-->
  `;
};