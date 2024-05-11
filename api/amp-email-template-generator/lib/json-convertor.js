const axios = require('axios');
const querystring = require('querystring');

module.exports = async (json, {rootUrl}) => {
  let _product = {};
  if (typeof json === 'string'){
    json = JSON.parse(json);
  }

  if (json.hasOwnProperty('action') && json.hasOwnProperty('queryString')) {
    //frette

    if (!rootUrl) throw ('Please set a rootUrl in second parameter, ex. https://www.frette.com/en_US');
    let product = json['product'];
    _product.id = product['id'];
    _product.title = product['productName'] || null;
    _product.queryString = `${json['queryString'].replace('&quantity=1','')}`;
    let qs = querystring.parse(_product.queryString);
    let pid = qs['pid'];

    _product.url = `${rootUrl}/${pid}.html`;

    // console.log(product['price'])
    // console.log(_product['url'])
    if (!product['price']['list'] && !product['price']['sales']) throw 'No price information';

    _product.images = product['images']['large'];
    _product.images = _product.images.map(img => {
      img.src = img.url;
      return img;
    });
    _product.image = product['images']['large']['0']['url'];
    _product.maxQuantity = product['maxOrderQuantity'];
    _product.variants = [

    ];


    if (product.hasOwnProperty('variationAttributes')) {
      for (const attr of product['variationAttributes']) {
        if (attr.id === 'color') {
          //setting product information
          attr['values'].forEach((val,index) => {
            if (_product.queryString.match(encodeURI(`color=${val['id']}`))){
              _product.title = `${_product.title} - ${val['displayValue']}`;
              if (attr['swatchable']){
                if (!val['images']['swatch'].length){
                  //no image, use white
                  _product.swatch = {
                    image: {
                      src: 'https://i.imgur.com/j7KU6rK.png'
                    }
                  };
                } else {
                  _product.swatch = {
                    image: {
                      src: val['images']['swatch'][0]['url']
                    }
                  };
                }

              }
            }
          }
          );
        }
        else if (attr.id === 'size') {
          for (let i=0; i<attr['values'].length; i++){
            if (attr['values'][i]['selectable']) {
              let _variant = {};

              let variantData = (await axios.get(attr['values'][i].url)).data;
              _variant.id = variantData['product']['id'];
              if (attr['values'][i]['selected']){
                _variant.id = _product.id;
              }
              // console.log(_variant.id, attr['values'][i].url);
              _variant.variant_id = _variant.id;
              _variant.option1 = attr['values'][i]['displayValue'];
              let qs = querystring.parse(variantData['queryString']);
              let pid = qs['pid'];
              _variant.image = _product.image;

              _variant.url = `${rootUrl}/${pid}.html?${variantData['queryString'].replace('&quantity=1','')}`;


              if (attr['values'][i]['selected']){
                _variant.url = `${rootUrl}/${pid}.html?${_product['queryString'].replace('&quantity=1','')}`;
                let p = product;
                if (p['price']['list']) {
                  _variant.original_price = p['price']['list']['value'];
                  _variant.price = p['price']['list']['value'];
                }
                if (p['price']['sales']) {
                  _variant.price = p['price']['sales']['value'];
                  if (!p['price']['list']) {
                    _variant.original_price = p['price']['sales']['value'];
                  }
                }
                // console.log(p['price']['sales']['value'], variantData['product']['price']['sales']['value'])
              } else {
                let a =variantData['product'];
                if (a['price']['list']) {
                  _variant.original_price = a['price']['list']['value'];
                  _variant.price = a['price']['list']['value'];
                }
                if (a['price']['sales']) {
                  _variant.price = a['price']['sales']['value'];
                  if (!a['price']['list']) {
                    _variant.original_price = a['price']['sales']['value'];
                  }
                }

              }

              if (_variant.id){
                _product.variants.push(_variant);
              }
            }

          }
        }
      }

    }


  }

  return _product;


};