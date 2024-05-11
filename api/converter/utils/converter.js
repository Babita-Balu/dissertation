const makeHeadTag = (htmlString) => {
  // 1 - Extract <head></head> from file
  const { ExtractDataHead } = require('./head-converter');

  // 2 - Extract data from tag
  let headData = ExtractDataHead(htmlString);

  let ampTagsToEnter;

  if (
    headData.includes(
      `<script async src="https://cdn.ampproject.org/v0.js"></script>`
    ) ||
    headData.includes(
      `<script async="" src="https://cdn.ampproject.org/v0.js"></script>`
    )
  ) {
    console.log('Yes it includes script');
    ampTagsToEnter = `
        <meta charset="utf-8">
        <style amp4email-boilerplate>body {visibility: hidden}</style>
      `;
  } else {
    console.log('No it does not include script');
    ampTagsToEnter = `
      <meta charset="utf-8">
      <style amp4email-boilerplate>body {visibility: hidden}</style>
    `;
    // ampTagsToEnter = `
    //   <meta charset="utf-8">
    //     <script async src="https://cdn.ampproject.org/v0.js"></script>
    //   <style amp4email-boilerplate>body {visibility: hidden}</style>
    // `;
  }

  // 3 - append necessary scripts
  let completeHeadData = ampTagsToEnter.concat(
    headData.replace('<style>', '<style amp-custom>')
  );

  let finalHead = `<head>\n${completeHeadData}</head>`;

  return finalHead;
};

const makeBodyTag = async (htmlStringBody) => {
  const { ExtractDataBody } = require('./body-converter');
  let bodyData = await ExtractDataBody(htmlStringBody);
  let finalBody = `<body>${bodyData}</body>`;

  return finalBody;
};

const makeAmpFile = async (headHtml, bodyHtml) => {
  let bodyData = await (await makeBodyTag(bodyHtml)).replace(
    'action-xhr-xhr',
    'action-xhr'
  );
  let finalAmpTemplate = `
    <!Doctype html>
    <html amp4email data-css-strict>
        ${makeHeadTag(headHtml)}
        ${bodyData}
    </html>
`;

  return finalAmpTemplate;
};

module.exports = {
  makeAmpFile,
};
