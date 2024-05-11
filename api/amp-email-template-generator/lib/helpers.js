const mockApi = require('./api');

const _ = require('lodash');


const prepareData = async (emailData, options) => {
  let { apiRoot, type, useLegacyMode, apiKey, option1Style } = options;

  apiKey = 'ADE228CEEA2199BBEE00BF889B8FB67A3B98841D645343939295F3E0A1895CAFFE17E8EA982ED16D8AF0E30C767617DE549A17B234268F4D566F5A9E22DDD797';

  if (type === 'campaign' || type === 'ad' || type === 'form') {
    let products = emailData['products'];
    let sizeJson = {};

    const processProduct = (item, pNum) => {
      //       if (!item.swatch || !item.swatch.image) throw new Error(`
      // Missing swatch image, please provide the "swatch" attribute in product object`);
      //       if (!item.url && !item.handle) throw new Error(`
      // Missing product url`);
      if (!item.url && item.handle && emailData['vendor']['domain']) {
        item.url = `https://${emailData['vendor']['domain']}/products/${item.handle}`;
      }
      if (!item.variants) {
        console.warn('Generating random variant id, this should only be used for testing/demo only');
        item.variants = [
          {
            title: item.title,
            price: item.price,
            id: Math.floor(Math.random() * 10000000) + 10000000
          }
        ];
      }

      item.variants.forEach(v => {
        if (!v.id) {
          console.warn('Generating random variant id, this should only be used for testing/demo only');
          v.id = Math.floor(Math.random() * 10000000) + 10000000;
        }
        if (!v.price) {
          v.price = item.price || 0;
        }
        if (!v.title) {
          v.title = v.option1 || item.title || '';
        }
        if (!item.url && item.handle && emailData['vendor']['domain'] && v.id && !v.url) {
          v.url = `https://${emailData['vendor']['domain']}/products/${item.handle}?variant=${v.id}`;
        }
        v.quantity = 1;
        if (v.price) {
          v.price = parseFloat(v.price);
          v.original_price = parseFloat(v.original_price || v.price);
          v.final_price = parseFloat(v.price);
          v.final_line_price = parseFloat(v.price);
        }

        v.variant_id = v.id;
        v.product_title = item.title;
        v.variant_title = v.title;
        if (item.images && !item.image) {
          item.image = item.images[0];
        }
        if (item.image && item.image.src) {
          item.image.src = encodeURI(item.image.src);
          v.image = item.image.src;
          v.featured_image = { url: item.image.src };
        }
        if (v.image && !v.image.src) {
          v.image = encodeURI(v.image);
          v.featured_image = { url: v.image };
        }
        if (v.total_discount === undefined) {
          // v.total_discount = 0;
          if (v.price && v.original_price) {
            v.total_discount = (v.original_price - v.price) * 100;
          } else {
            v.total_discount = 0;
          }
        }

      });
      item.product_title = item.title;


      sizeJson[`p${pNum}`] = item.variants.map(v => {
        return {
          id: v.id,
          title: v.title,
          option1: v.option1
        };
      });
    };

    let pNum = 0; //pNum is a sequential product number in an email, first product is p1, second is p2 and so on.
    products.forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach(p => {

          if (Array.isArray(p)) {
            p.forEach(ps => {
              pNum++;
              ps.pNum = pNum;
              processProduct(ps, pNum);
            });
          } else {
            pNum++;
            p.pNum = pNum;
            processProduct(p, pNum);
          }
        });
      } else {
        pNum++;
        item.pNum = pNum;
        processProduct(item, pNum);
      }

    });

    emailData.dropdown = sizeJson;
    emailData.products = products;

    let flatData = _.cloneDeep(emailData);
    let flat_products_array = []; //nested/grouped products only use for email templates, flatten out for easier server process
    flatData.products.forEach(p => {
      if (Array.isArray(p)) {
        p.forEach(ps => {
          if (Array.isArray(ps)) {
            ps.forEach(pps => {
              flat_products_array.push(pps);

            });
          } else {
            flat_products_array.push(ps);

          }
        });
      } else {
        flat_products_array.push(p);
      }
    });

    flatData.products = flat_products_array;


    emailData.useAMPList = false;

    if (option1Style !== 'button') {
      flat_products_array.forEach(p => {
        //if any product has more than 1 option
        if (p.variants && p.variants.length > 1) {
          emailData.useAMPList = true;
        }
      });
    }



    //we can put token directly in emailData to skip API calls
    if (!emailData['token']) {
      if (useLegacyMode) {
        emailData['token'] = await mockApi.getLegacyToken(flatData.dropdown, apiRoot, apiKey);
      } else {
        emailData['token'] = await mockApi.getCampaignToken(emailData, apiRoot, apiKey);
      }
    }
  }

  if (type === 'cart') {
    let lineItems = emailData['line_items'];
    //transform
    lineItems.forEach(item => {
      item.original_price = parseFloat(item.original_price || item.price);
      item.final_price = parseFloat(item.price);
      item.final_line_price = parseFloat(item.price);
      item.price = parseFloat(item.price);
      item.product_title = item.title;
      item.total_discount = parseFloat(item.total_discounts);
      item.featured_image = { url: item.image.src };

    });
    lineItems = await Promise.all(lineItems.map(lineItem => mockApi.getLineItemId(lineItem, apiRoot, apiKey)));
    emailData['line_items'] = lineItems;
    let ids = lineItems.map(lineItem => lineItem._sid);
    emailData['token'] = await mockApi.getToken(ids, emailData, apiRoot, apiKey);
  }


  return emailData;
};

module.exports.prepareData = prepareData;