module.exports = (product) => {
  return `"p${product.pNum}_btn_loaded": false,\n "p${product.pNum}": "${product.variants[0].id}",`;
};