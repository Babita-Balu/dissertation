/**
 * Returns html elements display product title
 */

module.exports = (product) => {
  return `<div class="mt1 mb1 sk-center sk-txt1"><a href="${product.url}">${product.title}</a></div>`;
};