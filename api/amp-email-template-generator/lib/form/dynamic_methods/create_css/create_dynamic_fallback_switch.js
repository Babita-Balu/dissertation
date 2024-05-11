module.exports = (groupNum = 1) =>{
  //language=css
  return `
#dynamic-switch-${groupNum}:checked~.dynamic {
display: block !important;
}

#dynamic-switch-${groupNum}:checked~.fallback {
display: none !important;
}
`;
};