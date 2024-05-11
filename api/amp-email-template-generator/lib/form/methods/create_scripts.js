module.exports = (options)=>{
  //language=html
  return `
<!--START OF SKIPIFY SHOPPABLE SCRIPTS -->
${options.useCarousel ? '<script custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js" async></script>' : ''}
<script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
${options.useAMPList ? '<script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>' : ''}
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
<!--END OF SKIPIFY SHOPPABLE SCRIPTS -->
  `;
};