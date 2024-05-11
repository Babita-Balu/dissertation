const createStandaloneBtn = require('./craete_standalone_btn');

module.exports = (data, options) => {
  let { products, token } = data;
  let { apiRoot, useCarousel, useLegacyMode, productStyle, option1Style, quantityStyle, cartLayout,
    carouselAutoplay,
    carouselDelay,
    carouselHeight,
    carouselWidth,
    carouselLayout,
    carouselLoop,
    dropdownHeight,
    dropdownText,
  } = options;

  let sgNum = 0;

  const createProductOptions = (p, i = 0) => {
    let pNum = p.pNum;
    let price = p.variants[0].price;
    let hasNoOption = (p.variants.length <= 1);

    let optionsHTML = '';
    //todo: only support 1 option right now
    let disabledBtn = '';

    if (!hasNoOption) {
      let jsonSrc = `${apiRoot}/link_checkouts/campaigns/${data.token}.json`;
      if (useLegacyMode) jsonSrc = `https://skipify-staging-1.herokuapp.com/amp/${data.token}.json`;
      disabledBtn = `
<div class="disabled sk-btn" data-amp-bind-class='((cart.p${pNum} || p${pNum}_candidate) ? "hide":"sk-show-flex") + " disabled sk-btn"'>
Add to cart
</div>
      `;
      let onOption1Change = `AMP.setState({p${pNum}_candidate: {id: event.value}})`;
      let disabledForOption1 = `data-amp-bind-disabled="!!cart.p${pNum}"`;
      let options = `
<option value="null">${dropdownText}</option>
{{#p${pNum}}}
<option value="{{id}}">{{title}}</option>
{{/p${pNum}}}
`;
      if (cartLayout === 'none') {
        onOption1Change = `AMP.setState({cart: {p${pNum}: event.value, p${pNum}_btn_loaded: true}}),skipify-cart-form-p${pNum}.submit`;
        disabledForOption1 = '';
        options = `
{{#p${pNum}}}
<option value="{{id}}">{{title}}</option>
{{/p${pNum}}}        
`;
      }
      let option1UI = `
<template type="amp-mustache">

<select ${disabledForOption1} id="p${pNum}_option1" on="change: ${onOption1Change}">
${options}
</select>

</template>
<div placeholder role="listitem">
<select disabled>
<option value>${dropdownText}</option>
</select>
</div>
      `;
      let onOption1Tap = `AMP.setState({p${pNum}_candidate: {id: '{{id}}' }})`;
      if (cartLayout === 'none') {
        onOption1Tap = `AMP.setState({cart: {p${pNum}: '{{id}}', p${pNum}_btn_loaded: true}}),skipify-cart-form-p${pNum}.submit`;
      }

      if (option1Style === 'button') {

        //AMP does not evaluate local state on load, we select first variant by default
        let activeCondition = `(p${pNum}_candidate.id == "{{id}}" || ("${p.variants[0].id}" == "{{id}}" && !p${pNum}_candidate.id))`;

        if (cartLayout === 'none') {
          activeCondition = `(cart.p${pNum} == "{{id}}" || ("${p.variants[0].id}" == "{{id}}" && !cart.p${pNum}))`;
        }

        option1UI = `
<template type="amp-mustache">
<div class="sk-opt-btns">
{{#p${pNum}}}
<div data-amp-bind-class='( ${activeCondition} ? "sk-active":"") + " sk-opt-btn"' class="sk-opt-btn" 
tabindex="0"
role="button" on="tap: ${onOption1Tap}">{{title}}</div>
{{/p${pNum}}}
</div>
</template>
        `;
        disabledBtn = '';
      }

      let binding = 'always';
      if (cartLayout === 'none') binding = 'always'; //"always" allow us to evaluate id returned from server immediately

      optionsHTML = `
        <div class="sk-opt1">
          <amp-list width="auto" height="${dropdownHeight}" layout="fixed-height" src="${jsonSrc}" binding="${binding}" single-item items="." noloading>
          ${option1UI}
          </amp-list>
        </div>
      `;
    }
    else if (p.variants.length === 1 && p.variants[0].option1) {
      optionsHTML = `<div class="sk-opt1"></div><div class="sk-txt2">${p.variants[0].option1}</div>`;
      if (option1Style === 'button') optionsHTML = `<div class="sk-opt1"><div class="sk-opt-btn sk-active">${p.variants[0].option1}</div></div>`;
    }

    let onQtyPlus = `AMP.setState({cart: {p${pNum}_qty: cart.p${pNum}_qty+1}})`;
    let onQtyMinus = `AMP.setState({cart: {p${pNum}_qty: cart.p${pNum}_qty-1}})`;

    let disabledForQtyPlus = `data-amp-bind-disabled='cart.p${pNum}_qty >= ${p.maxQuantity || 10} || !!cart.p${pNum}'`;
    let disabledForQtyMinus = `data-amp-bind-disabled='cart.p${pNum}_qty <= 1 || !!cart.p${pNum}'`;

    if (cartLayout === 'none') {
      onQtyPlus = `AMP.setState({cart: {p${pNum}_qty: cart.p${pNum}_qty+1, p${pNum}_btn_loaded: true}}),skipify-cart-form-p${pNum}.submit`;
      onQtyMinus = `AMP.setState({cart: {p${pNum}_qty: cart.p${pNum}_qty-1, p${pNum}_btn_loaded: true}}),skipify-cart-form-p${pNum}.submit`;
      disabledForQtyPlus = `data-amp-bind-disabled='cart.p${pNum}_qty >= ${p.maxQuantity || 10}'`;
      disabledForQtyMinus = `data-amp-bind-disabled='cart.p${pNum}_qty <= 1'`;
    }


    let qtyUI = `
    <div class="sk-qty">
<div class="sk-qty-label">Quantity:</div>
<button ${disabledForQtyMinus} disabled class="sk-qty_btn" role="button" tabindex="${pNum}" on="tap:${onQtyMinus}">-</button>
<p data-amp-bind-text="cart.p${pNum}_qty" class="sk-qty_num">1</p>

<button ${disabledForQtyPlus} class="sk-qty_btn" role="button" tabindex="${pNum}" on="tap:${onQtyPlus}">+</button>

</div>
    `;
    if (quantityStyle === 'dropdown') {
      let maxQuantity = p.maxQuantity || 10;
      let options = '';
      for (let i = 1; i <= maxQuantity; i++) {
        options = options + `<option value="${i}">${i}</option>`;
      }
      let onQtyChange = `AMP.setState({cart: {p${pNum}_qty: event.value}})`;
      let disabledForQtyDropdown = `data-amp-bind-disabled='cart.p${pNum}_qty >= ${p.maxQuantity || 10} || !!cart.p${pNum}'`;

      if (cartLayout === 'none') {
        onQtyChange = `AMP.setState({cart: {p${pNum}_qty: event.value, p${pNum}_btn_loaded: true}}),skipify-cart-form-p${pNum}.submit`;
        disabledForQtyDropdown = `data-amp-bind-disabled='cart.p${pNum}_qty >= ${p.maxQuantity || 10}'`;
      }



      qtyUI = `
      <div class="sk-qty">
      <div class="sk-qty-label">Quantity:</div>
      <select ${disabledForQtyDropdown}  class="qty_btn"  on="change:${onQtyChange}">
      ${options}  
      </select>

      </div>
      `;
    }

    if (cartLayout === 'none') {
      return `
${optionsHTML}
${qtyUI}
${createStandaloneBtn(p, { ...options, token })}
      `;
    }


    return `
${optionsHTML}
${qtyUI}


<div class="sk-btn rm hide" data-amp-bind-class='(cart.p${pNum} ? "sk-show-flex":"hide") + " sk-btn rm"' on="tap:AMP.setState({
      p${pNum}: null,
      cart: {size: cart.size-cart.p${pNum}_qty, p${pNum}: null}
    }),skipify-cart-form.submit" role="button" tabindex="${pNum}">
  Remove from cart
</div>
<div  data-amp-bind-class='((!cart.p${pNum}${(hasNoOption || option1Style === 'button') ? '' : ` && p${pNum}_candidate.id != null`})? "sk-show-flex":"hide") + " sk-btn"' class="sk-btn ${(hasNoOption || option1Style === 'button') ? '' : 'hide'}" on="tap:AMP.setState({
      p${pNum}_candidate: {id: (p${pNum}_candidate.id || '${p.variants[0].id}')},
      p${pNum}: {
      variant_id: ${hasNoOption ? `(p${pNum}_candidate.id || '${p.variants[0].id}')` : `p${pNum}_candidate.id`},
      },
      cart: {
                         size: cart.size+cart.p${pNum}_qty,
                         p${pNum}: ${hasNoOption ? `(p${pNum}_candidate.id || '${p.variants[0].id}')` : `p${pNum}_candidate.id`},
                         }
    }),skipify-cart-form.submit" role="button" tabindex="${pNum}">Add to cart
</div>
${disabledBtn}
    `;
  };
  const createVariantPrice = (p) => {
    let h = '';

    let showPriceCondition = (p, v, i) => `(${i === 0 ? `p${p.pNum}_candidate.id == null || p${p.pNum}_candidate.id == 'null' || ` : ''} p${p.pNum}_candidate.id == '${v.id}')`;

    if (cartLayout === 'none') {
      showPriceCondition = (p, v) => `cart.p${p.pNum} == '${v.id}'`;
    }

    p.variants.forEach((v, i) => {
      h = h + `
        <div data-amp-bind-class="${showPriceCondition(p, v, i)} ?'show mb1 mt1':'hide mb1 mt1'" class="mb1 mt1 ${i === 0 ? '' : 'hide'}">
        ${v.original_price > v.price ? '<span class="sk-txt2 mb1 sk-strike">$' + v.original_price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + '</span>' : ''}
        <span class="sk-txt2  mb1 sk-bold">$${v.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</span>
        </div>
          `;
    });

    return h;
  };
  const createProduct = (p) => {

    let price = p.variants[0].price;


    return `
<div class="sk-pd-wrapper ${productStyle === 'product-compact' ? 'sk-pd-compact' : ''} sk-blk">
<div class="sk-pd">

<div class="sk-pd-img">
  <amp-img alt="" class="cover mb1" layout="fill" src="${p.images[0].src}"></amp-img>
</div>
<div class="sk-pd-detail">
<div class="sk-txt1">${p.title}</div>
${createVariantPrice(p)}

${createProductOptions(p)}
</div>


</div>
</div>
    `;
  };

  const createCarousel = (ps) => {

    let html = '';
    ps.forEach(p => {
      if (Array.isArray(p)) {
        //
        sgNum++;
        html = html + createNestedProducts(p);

      } else {
        html = html + createProduct(p);
      }
    });

    return `
    <amp-carousel
    class="sk-blk"
  width="${carouselWidth}"
  height="${carouselHeight}"
  layout="${carouselLayout}"
  ${carouselAutoplay ? 'autoplay' : ''}
  ${carouselLoop ? 'loop' : ''}
  delay="${carouselDelay}"
  type="slides"
  role="region"
  aria-label=""
>
${html}
</amp-carousel>
    `;
  };

  const createNestedProducts = (ps) => {

    const wrapShowHideConditions = (content, i, trueClasses, falseClasses, pNum, style) => {
      let classNameBinding = `(sg${sgNum} == null || sg${sgNum} == "p${pNum}" ? "${trueClasses}" : "${falseClasses}")`;
      let defaultClassName = `${trueClasses}`;
      if (i > 0) {
        defaultClassName = `${falseClasses}`;
        classNameBinding = `(sg${sgNum} == "p${pNum}" ? "${trueClasses}":"${falseClasses}")`;
      }
      return `
        <div class="${defaultClassName}" data-amp-bind-class='${classNameBinding}' ${style ? 'style="' + style + '"' : ''}>
        ${content}
        </div>
      `;
    };

    const generateProductsImage = () => {
      let html = '';


      ps.forEach((p, i) => {
        html = html + wrapShowHideConditions(`
        <div class="sk-pd-img" style="${productStyle === 'product-compact' ? 'width:100%' : ''}">
        <amp-img alt="" layout="fill"  class="cover mb1" src="${p.images[0].src}" ></amp-img>
        </div>

        

        `, i, 'sk-show-height', 'sk-hide-height', p.pNum);
      });
      return html;
    };

    const generateProductsTitleAndPrice = () => {
      let html = '';


      ps.forEach((p, i) => {
        html = html + wrapShowHideConditions(`

        <div class="sk-txt1"><a href="${p.url}" target="_blank">${p.title}</a></div>
        
        
        ${createVariantPrice(p)}
        

        `, i, 'sk-show-height', 'sk-hide-height', p.pNum);
      });
      return html;
    };

    const generateProductsSwatches = () => {
      let html = '';
      ps.forEach((p, i) => {
        html = html + wrapShowHideConditions(`
          <amp-img layout="fill" width="40" height="40" src="${p.swatch.image.src}" 
          tabindex="${p.pNum}" role="button" on="tap:AMP.setState({sg${sgNum}: 'p${p.pNum}'})"></amp-img>
        
        `, i, 'sk-active sk-swatch', 'sk-swatch', p.pNum, `background-image:url(${p.swatch.image.src})`);
      });
      return `
<div style="display: flex;justify-content: center;align-items: center">
      <div class="color-select" >
      ${html}
      </div></div>
`;
    };

    const generateProductsOptions = () => {
      let html = '';
      ps.forEach((p, i) => {
        html = html + wrapShowHideConditions(`
          ${createProductOptions(p, i)}
        `, i, 'sk-show-height', 'sk-hide-height', p.pNum);
      });
      return html;
    };

    if (productStyle === 'product-compact') {
      return `
            <div class="sk-pd-wrapper sk-pd-compact sk-blk">
                  <div class="sk-pd sk-blk">
                    <div class="sk-pd-img-wrapper">
                      ${generateProductsImage()}
                    </div>
                    <div>
                      ${generateProductsTitleAndPrice()}
                      ${generateProductsSwatches()}
                      ${generateProductsOptions()}
                    </div>
                  </div>
            </div>
      `;
    }



    return `
      <div class="sk-pd sk-blk">
      ${generateProductsImage()}
      ${generateProductsTitleAndPrice()}
      ${generateProductsSwatches()}
      ${generateProductsOptions()}
      </div>
    `;
  };

  let html = '';

  products.forEach((p, g) => {
    html = html + `
    <!-- START OF PRODUCT GROUP ${g + 1} -->
    <div id="sk_g${g + 1}" class="sk_g${g + 1} sk_grp">
    `;
    if (Array.isArray(p)) {
      if (useCarousel) {
        html = html + createCarousel(p);
      } else {
        sgNum++;

        html = html + createNestedProducts(p);

      }
    } else {
      html = html + createProduct(p);
    }
    html = html + `
    </div>
    <!-- END OF PRODUCT GROUP ${g + 1} -->
    `;
    if (g + 1 !== products.length) {
      //unless it's last one
      html = html + `
<!-- DIVIDER -->
`;
    }
  });


  return `
  ${html}
  `;
};