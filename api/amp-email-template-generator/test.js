/* eslint-disable semi */
/* eslint-disable quotes */
const TemplateGenerator = require(`./index`);
const fs = require(`fs`);

const purchaseLink = process.env.BUY_LINK || `https://dev.skipify.com/l`;
const apiRoot = process.env.API_ROOT || `https://dev-api.skipify.com/v2`;
const outputName = process.env.OUTPUT_NAME || `single-product-${Date.now()}`;

let formData;
let customFormData = process.env.FORM_DATA;



if (customFormData && fs.existsSync(customFormData)) {
  formData = require(`./${customFormData}`);
}
else if (fs.existsSync(`form_mock_data.js`)) {
  console.log('Using form_mock_data.js');
  formData = require(`./single-product-data`);
} else {
  console.log('Using rename_form_mock_data.js');
  formData = require(`./rename_form_mock_data`);
}


// generate an form submission email
TemplateGenerator.getTemplates(formData, {
  //overwrite configs, this can be set in formData.config as well.
  purchaseLink,
  apiRoot,
  apiKey: 'ADE228CEEA2199BBEE00BF889B8FB67A3B98841D645343939295F3E0A1895CAFFE17E8EA982ED16D8AF0E30C767617DE549A17B234268F4D566F5A9E22DDD797',
  type: `form`,
  useCarousel: false,
  productStyle: 'product-compact',
  themeColor: '#031e2f',
  useLegacyMode: false,
  "quantityStyle": "dropdown",
  "option1Style": "button",
  "maxWidth": '600px',
  "mobileBreakpoint": '600px',
  "cartLayout": 'default',

}).then(res => {
  fs.writeFileSync(`${outputName}.form.amp.html`, res.amp);
  // fs.writeFileSync(`${outputName}.form.html`, res.html);
  if (res.amp_components) {
    // fs.writeFileSync(`${outputName}.form.amp.json`, JSON.stringify(res.amp_components, null, '  '));
    // console.log(`${outputName}.form.amp.json created.`)
  }
  if (res.html_components) {
    // fs.writeFileSync(`${outputName}.form.html.json`, JSON.stringify(res.html_components, null, '  '));
    // console.log(`${outputName}.form.html.json created.`)
  }
  console.log(`${outputName}.form.amp.html created.`)
});

