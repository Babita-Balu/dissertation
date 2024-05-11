const generateProductCheckList = (data) => {
  let lineItems = data['line_items'];
  let list = '';

  const generateItem = (lineItem, index) => {
    return `
        <div class="line-item flex">
      <div class="flex">
        <div class="fixed-container">
          <amp-img class="cover" layout="fill"
                   src="${lineItem.image}"></amp-img>
        </div>
        <div class="mid">
          <div class="bold sub">
            ${lineItem.title}
          </div>
          <div class="small">
            ${lineItem.options_with_values.map(i => `${i.name} ${i.value}`).join(', ')} x ${lineItem.quantity}
          </div>
          <div class="small bold">
            $${lineItem.line_price}
          </div>
        </div>
      </div>
      <label class="container">
        <input class="checkbox" id="p${index + 1}" name="p${index + 1}" on="change:AMP.setState({p${index + 1}:event.checked})" type="checkbox"
               value="p${index + 1}">
        <span class="checkmark"></span>
        <span class="after"></span>
      </label>
    </div>
    `;
  };

  for (let i = 0; i < lineItems.length; i++) {
    list = list + generateItem(lineItems[i], i);
  }

  return list;

};

const generateButtonList = (data, options) => {
  let { purchaseLink } = options;

  let lineItems = data['line_items'];
  let list = `
        <div data-amp-bind-class='((${lineItems.map((item, index) => {
    return `p${index + 1} != true`;
  }).join(' && ')}) ? "show":"hide")' class="show">
        <amp-img alt="" height="44" src="https://storage.googleapis.com/skipify-assets/images/btn.png" width="300"/>
      </div>
  
  `;
  let sids = lineItems.map(i => i._sid);


  const getSubArrays = (arr) => {
    if (arr.length === 1) return [arr];
    else {
      let subarr = getSubArrays(arr.slice(1));
      return subarr.concat(subarr.map(e => e.concat(arr[0])), [[arr[0]]]);
    }
  };

  let combinations = getSubArrays(sids);

  combinations.forEach(c => {
    let classesConditions = [];
    let includedSids = [];
    let queries;
    sids.forEach((sid, index) => {
      if (c.includes(sid)) {
        classesConditions.push(`p${index + 1} == true`);
        includedSids.push(sid);
      } else {
        classesConditions.push(`p${index + 1} != true`);
      }
    });
    queries = `items=${includedSids.join(',')}&token=${data.token}`;
    classesConditions = classesConditions.join(' && ');
    list += `
        <a href="${purchaseLink}?${queries}" class="hide" data-amp-bind-class='((${classesConditions}) ? "show":"hide")'>
          <amp-img src="https://storage.googleapis.com/skipify-assets/images/btn.png" alt="" width="300" height="44" />
        </a>
  `;
  });

  return list;

};

const header = `
<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body {
    visibility: hidden
  }</style>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
  <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>

  <style amp-custom>

    h1 {
      font-size: 25px;
      color: #09203F;
    }

    .size {
      border: 1px solid;
      display: inline-block;
      padding: 10px;
      margin-right: 10px;
      margin-top: 10px;
    }

    .show {
      display: block;
    }

    .hide {
      display: none;
    }

    .image-wrapper {
      text-align: center;
      padding-top: 50px;
      padding-bottom: 50px;
    }

    .bold {
      font-weight: 700;
    }

    .small {
      font-size: 11px;
      color: #999;
    }


    .wrapper {
      max-width: 600px;
      margin: auto;
      padding-bottom: 50px;
      padding-top: 30px;
      padding: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      font-family: "Open Sans", sans-serif;
      background: white;

    }

    .fixed-container {
      position: relative;
      width: 100px;
      height: 100px;
      flex-shrink: 0;
    }


    amp-img.contain img {
      object-fit: contain;
    }

    amp-img.cover img {
      object-fit: cover;
    }

    .disabled {
    }

    .active {
      border: 2px solid #33b9ff;
    }

    body {
      background: #f6f6f6;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .line-item {
      border: 1px solid #ccc;
      padding: 0px 10px 0px 0;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;

    }


    .mid {
      padding-left: 10px;
    }


    .center {
      text-align: center;
    }

    .btn {
      background: black;
      color: white;
      padding: 10px;
      outline: 0;
      box-shadow: none;
      border: 0;
      border-radius: 5px;
      font-size: 20px;
      margin-top: 20px;
      cursor: pointer;
    }

    .mt3 {
      margin-top: 30px;
    }

    .mb5 {
      margin-bottom: 50px;
    }

    button.reset {
      border: 0;
      padding: 0;
      margin: 0;
      outline: 0;
      box-shadow: none;
      cursor: pointer;
    }

    .checkbox {

      cursor: pointer;
      flex-shrink: 0;
    }

    .container {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 22px;

      user-select: none;
    }

    .container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 30px;
      width: 30px;
      background-color: #eee;
      border: 1px solid #000 ;
      border-radius: 3px;
    }

    .container:hover input ~ .checkmark {
      background-color: #ccc;

    }

    .container input:checked ~ .checkmark {
      background-color: #2196F3;
    }

    .after {
      position: absolute;
      display: none;
    }

    .container input:checked ~ .after {
      display: block;
    }

    .container .after {
      left: 0px;
      top: 0px;
      width: 30px;
      height: 30px;
      background-image: url(https://storage.googleapis.com/skipify-assets/images/i_checkmark.png);
      background-size: 18px 18px;
      background-repeat: no-repeat;
      background-position: 7px 6px;


    }


    @media only screen and (max-width: 400px) {
      .sub {
        font-size: 11px;
      }

      .wrapper {
        margin-top: 0;
      }
    }


  </style>

</head>
`;

const body = (data, options) => {
  let btnList = generateButtonList(data, options);
  let productList = generateProductCheckList(data);
  let url = `https://${data.vendor.domain}`;
  let logo = data.vendor.logo.src;

  return `
  <body>

<div class="wrapper">

  <amp-img alt="" height="${data.vendor.logo.height}" src="${data.vendor.logo.src}" width="${data.vendor.logo.width}"></amp-img>


  <h1>You left some items in your cart</h1>

  <p>
    Don’t miss out on these great items! You can purchase them right from this email. </p>

  <hr class="mt3"/>

  <h1 class="mt3">Complete your purchase</h1>
  <p>Select which items you want to purchase.</p>
  <div class="mt3" >

    ${productList}
    
    <div class="center mt3">



      ${btnList}


      <div class="mb5">or
        <a href="${url}">visit the site</a>
      </div>


    </div>


  </div>


</div>

<div class="center mb5">

  Don't want to receive cart reminders from us?
  <a href="${url}">Unsubscribe</a>
</div>


</body>
  `;

};


const footer = `
</html>`;

module.exports = (data, options) => {
  return header + body(data, options) + footer;
};