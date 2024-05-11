const _ = require('lodash');

/**
 * Check the data format is supported or not for dynamic HTML
 * @param data
 * @returns {boolean}
 */

module.exports = (data) => {
  let supported = true;
  let {products} = data;

  products.forEach(p=>{
    if (Array.isArray(p)){
      p.forEach(p2=>{
        if (Array.isArray(p2)) supported = false; // double-nested products like fretee, not supported
        let swatchImage = _.get(p2, 'swatch.image.src'); //missing swatch image, not supported
        if (!swatchImage) supported = false;
      });
    }
  });

  return supported;


};