/**
 * Returns html elements for display product feature image
 */

module.exports = (product) => {
  return `<div class="pd-img"><img src="${product.images[0].src}" /></div>`;
};