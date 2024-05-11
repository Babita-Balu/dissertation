# Usage

##Testing


### Unit test

```
npm run test
```

check coverage in `coverage/index.html`

### Test with dev api
```
API_KEY=12345 npm run test-dev
```

Ask admins for the API_KEY, you can also set `apiKey` in `.config` in json file or `getTemplate()` parameters

### Test with stage api
```
npm run test-stage
```

### Test with your own custom setup
```
cross-env BUY_LINK=http://localhost:3000/l API_ROOT=https://dev-api.skipify.com/v2 node test.js
```

### Test with your own data
duplicate `rename_form_mock_data.js` in root and rename it to `form_mock_data`, you can try your data there without git tracking.
You can also try different example data in /example folder

## Use as a nodeJS package

### Generate a new form submission email (both dynamic and AMP)
```javascript
const generator = require('abandoned-cart-email-template-generator');

generator.getTemplates(data, {
      //shows default values bellow
      apiKey : '', //api key to create post request to backend
      apiRoot : 'https://dev-api.skipify.com/v2', //not include the trailing /
      purchaseLink : 'https://dev.skipify.com/l', //the redirect link for making purchase
      type : 'form', // default inbox cart with form submission
      useCarousel : true, // display root product groups with carousels
      useLegacyMode : false, // for demo and testing
      productStyle : 'product-default', // product-default and product-compact
      themeColor : '#000000', //link, header and button theme color
      option1Style : 'dropdown', // choose between button and dropdown
      quantityStyle : 'button', // choose between button and dropdown
      maxWidth : '600px', // the wrapper max width on large screen
      mobileBreakpoint : '600px', // mobile break point
      cartLayout : 'default', // deafualt, minimal, none, minimal will not show mini cart, none will not have "add to cart" button

      carouselHeight : 1000, // carousel configs passing through
      carouselWidth : 'auto',
      carouselAutoplay : false,
      carouselDelay : '',
      carouselLoop : false,
      carouselLayout : 'fixed-height',
      dropdownHeight : 60, // dropdown configs passing through
      dropdownText : 'Select a size',
    
      disabledBuyButtonText : 'SELECT AN OPTION FIRST', // buy button configs passing through
      buyButtonText : 'BUY WITH 1-TOUCH',
      buyButtonBgColor : 'black',
      buyButtonTextColor : 'white',
      customAmpCss : '', // custom amp css overwrite
      customHtmlCss : '', // custom dynamic html css overwrite
    
      buyButtonImgSrc : 'https://storage.googleapis.com/skipify-assets/images/buy-btn.png', // for dynamic html only
  
}).then(res=>{
  fs.writeFileSync('test.form.amp.html', res.amp);
  fs.writeFileSync('test.form.html', res.html);
  fs.writeFileSync('test.form.amp.json', res.amp_components); // taking the amp file aparts
});

Note: the same config options can also be put in `data.config` to avoid changing test.js, it will be overwritten by `getTemplates()` second parameter
```


## AMP Components

running `await (generator.getTemplates()).amp_components` will return all the components for the AMP shoppable parts,
this will make it easier to integrate them into real AMP emails.

```javascript
{
    scripts: "", //the required scripts
    css: "", //the required css
    templates: "", // required by cart  put it somewhere before cart
    states: "", // required by cart, put it somewhere before cart
    products: ["","",""], //array of product group htmls, you can show and hide each group with your own script
    checkoutButton: "" //the checkout button html, when cartLayout set to minimal, this is empty 
    cart: "" // the cart html
}
```

## HTML Components
running `await (generator.getTemplates()).html_components` will return all the components for the dynamic shoppable parts,
this will make it easier to integrate them into html5 emails.

```javascript
{
    css: "", //the required css
    products: ["","",""], //array of product group htmls, you can show and hide each group with your own script
}
```

Note: You will need wrap original non-shoppable part in the following blocks
```html
<div class="fallback"></div>
```

## Data file format
```javascript
{
    campaign: {
      name: '', // campaign id from mothership
      coupon: '', // coupon code
      query: {},  //future utm key/value paris
    },
    config: {}, // see config above
    products: [
      [{
        url: '',
        image: {
            src: '',
            width: '',
            height: ''
        },
        images: [
            {
            src: '',
            width: '',
            height: ''
            }
        ],
        swatch: {
            image: {
                src: 'https://i.imgur.com/nq9MCuY.png',
              	width: '',
              	height: '',
            },
            color: '',
        },
        variants: [{
            title: '',
            id: '',
          	price: '',
          	option1: '',
          	url: '',
        }]
    }],
    [] // second product group...
],
    vendor: {shop_name: '', name: '', domain:'www.example.com', logo: {src:'', width:'', height:''}},
    website: '',
}
```
