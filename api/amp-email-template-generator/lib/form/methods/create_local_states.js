const createNoCartElements = require('./create_no_cart_elements');

module.exports = (data, config)=>{
  let {products} = data;
  let {option1Style, cartLayout} = config;

  let quantities = [];
  let candidates = [];
  let loadedStates = [];
  products.forEach(p=>{
    if (Array.isArray(p)) {
      p.forEach((ps) =>{
        if (Array.isArray(ps)){
          ps.forEach(pps=>{
            quantities.push(`"p${pps.pNum}_qty": 1`);
            loadedStates.push(createNoCartElements.createState(pps));
            if (option1Style === 'button' && pps.variants && pps.variants[0] && pps.variants[0].id){
              candidates.push({pNum:pps.pNum, id: pps.variants[0].id});
            }
          });
        } else {
          quantities.push(`"p${ps.pNum}_qty": 1`);
          loadedStates.push(createNoCartElements.createState(ps));
          if (option1Style === 'button' && ps.variants && ps.variants[0] && ps.variants[0].id){
            candidates.push({pNum:ps.pNum, id: ps.variants[0].id});
          }
        }

      });
    } else {
      quantities.push(`"p${p.pNum}_qty": 1`);
      loadedStates.push(createNoCartElements.createState(p));

      if (option1Style === 'button' && p.variants && p.variants[0] && p.variants[0].id){
        candidates.push({pNum:p.pNum, id: p.variants[0].id});
      }
    }
  });

  return `
<!--START OF SKIPIFY SHOPPABLE AMP STATES-->
<amp-state id="cart">
  <script type="application/json">
    {
      "size": 0,
      "total": 0,
      "visible": false,
      ${cartLayout === 'none' ? loadedStates.join('\n'):''}
      ${quantities.join(',\n')}
    }
  </script>
</amp-state>
${candidates.map(c=>`<amp-state id="p${c.pNum}_candidate"><script type="application/json"> {"id":${c.id}}  </script></amp-state>`).join('\n')}
<!--END OF SKIPIFY SHOPPABLE AMP STATES-->
`;
};