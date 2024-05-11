const puppeteer = require('puppeteer');

async function TagsSeparator(html) {
  console.log('In Tags Separator');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--disable-web-security',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*',
      '--disable-extensions'
    ],
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);
  await page.setJavaScriptEnabled(false);

  await page.setContent(html);

  const result = await page.evaluate(() => {
    let header = document.querySelector('head');
    const body = document.querySelector('body');

    return { header: header.outerHTML, body: body.outerHTML }

  })

  await page.close();
  await browser.close();

  return {
    headString: result.header
      .replace(/&quot;/gim, "'")
      .replace(/&amp;/gim, '&')
      .replace(/i-amphtml-layout="([^"]+)"/gim, ''),

    bodyString: result.body
      .replace(/&quot;/gim, "'")
      .replace(/&amp;/gim, '&')
      .replace(/i-amphtml-layout="([^"]+)"/gim, '')
  };

}

// const TagsSeparator = (str) => {
//   var lines = str.split('\n'); // lines is an array of strings
//   let headString = [];
//   let headEndIndex = 0;
//   let bodyString = [];

//   // Loop through all lines
//   for (var j = 0; j < lines.length; j++) {
//     // console.log('Line ' + j + ' is ' + lines[j])
//     if (lines[j].includes('<body')) {
//       headEndIndex = j;
//     }
//   }

//   headString = lines.splice(0, headEndIndex).join().replace(/,/g, ' ');
//   bodyString = lines.join().replace(/,/g, ' ');

//   console.log('bodyString: ', lines.join())

//   return {
//     headString,
//     bodyString,
//   };
// };

module.exports = {
  TagsSeparator,
};
