//mock apis that needed to complete the templates



const axios = require('axios');
const _ = require('lodash');


function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Provides line item data, we store them in database and returns a unique skipify line item id
 * @param lineItem
 * @param apiRoot
 * @returns {Promise<>}
 */
const getLineItemId = async (lineItem, apiRoot, apiKey = 'ADE228CEEA2199BBEE00BF889B8FB67A3B98841D645343939295F3E0A1895CAFFE17E8EA982ED16D8AF0E30C767617DE549A17B234268F4D566F5A9E22DDD797') => {
  const config = {
    headers: {
      'authorization': apiKey || process.env.API_KEY || ''
    }
  };
  let resp = await axios.post(`${apiRoot}/line_items`, {
    details: lineItem
  }, config);
  let newId = resp.data.data.id;
  lineItem._sid = newId;
  return lineItem;
};

/**
 * Get a token base on line item  ids, if the id doesn't match the token, deny
 * @param cartData
 * @param apiRoot
 * @returns {Promise<string>}
 */
const getToken = async (Ids, cartData, apiRoot, apiKey) => {
  let data = {
    line_items: Ids,
  };
  if (cartData['website']) data.website = cartData['website'];
  if (cartData['email']) data.email = cartData['email'];
  if (cartData['vendor']) data.vendor = cartData['vendor'];
  if (cartData['url']) data.url = cartData['url'];
  if (cartData['isFromCart']) data.isFromCart = cartData['isFromCart'];
  const config = {
    headers: {
      'authorization': apiKey || process.env.API_KEY || ''
    }
  };
  let resp = await axios.post(`${apiRoot}/link_checkouts`, { data }, config);
  return _.get(resp, 'data.data.token');
};

const getCampaignToken = async (cartData, apiRoot, apiKey) => {
  let data = _.cloneDeep(cartData);
  cartData['line_items'] = []; //not used
  const config = {
    headers: {
      'authorization': apiKey || process.env.API_KEY || ''
    }
  };
  let flat_products_array = []; //nested/grouped products only use for email templates, flatten out for easier server process

  let { products } = data;
  products.forEach(p => {
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

  data.products = flat_products_array;

  if (data.config && data.config.apiKey) data.config.apiKey = null;

  let resp = await axios.post(`${apiRoot}/link_checkouts`, { data }, config);
  return _.get(resp, 'data.data.token');
};

//using legacy heroku api server for demo purpose
//deprecated
const getLegacyToken = async (data, apiRoot) => {
  let resp = await axios.post('https://skipify-staging-1.herokuapp.com/amp', { data });
  return _.get(resp, 'data.data.id');

};


module.exports.getLineItemId = getLineItemId;
module.exports.getToken = getToken;
module.exports.getCampaignToken = getCampaignToken;
module.exports.getLegacyToken = getLegacyToken;