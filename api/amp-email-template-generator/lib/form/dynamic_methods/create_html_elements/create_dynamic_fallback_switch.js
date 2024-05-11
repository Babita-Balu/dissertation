/**
 * Returns the radio button to enable dynamic block
 * if the client doesn't support radio button :checked css, the dynamic block will stay hidden
 */

module.exports = (groupNum = 1) =>{
  //language=html
  return `<input type="radio" checked id="dynamic-switch-${groupNum}" style="display: none">`;
};