const puppeteer = require('puppeteer');
const axios = require('axios');

async function ReplaceAreaWithFileURL(markGeneratedFile, baseTemplateFile, ids) {
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
    ],
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);
  await page.setJavaScriptEnabled(false);

  // 1 - get the html file data by sending HTTP GET
  // const { data: htmlData } = await axios.get(baseTemplateFile);

  // 2 - set the page content with html file data
  await page.setContent(baseTemplateFile);

  // 3 - get styles, body, and scripts from html file by rendering in puppeteer page
  let styles = '';
  let bodyData = '';
  let scriptData = '';

  const result = await page.evaluate(
    // eslint-disable-next-line no-shadow
    ({ styles, bodyData, scriptData }) => {
      let data = '';
      // eslint-disable-next-line no-undef
      const header = document.querySelector('head');
      const scripts = header.getElementsByTagName('script');
      // eslint-disable-next-line no-undef
      const body = document.querySelector('body');
      let style = '';
      // eslint-disable-next-line no-undef
      document.querySelectorAll('style').forEach((tag) => {
        if (tag.tagName === 'STYLE') {
          style += tag.innerHTML;
        }
      });
      // :not(style[amp4email-boilerplate])

      // eslint-disable-next-line no-param-reassign
      bodyData = body.innerHTML;
      // eslint-disable-next-line no-param-reassign
      styles = style;
      // eslint-disable-next-line no-undef
      head = header.innerHTML;

      // eslint-disable-next-line no-restricted-syntax
      for (const script of Array.from(scripts)) {
        data += script.outerHTML;
      }
      // eslint-disable-next-line no-param-reassign
      scriptData = data;

      return { styles, bodyData, scriptData };
    },
    { styles, bodyData, scriptData }
  );

  bodyData = result.bodyData;
  styles = result.styles;
  scriptData = result.scriptData;

  // 4 - render shoppable email amp file in headless browser page
  await page.setContent(markGeneratedFile);

  await page.evaluate(
    // eslint-disable-next-line no-shadow
    ({ styles, bodyData, scriptData, ids }) => {
      // eslint-disable-next-line no-undef
      const head = document.querySelector('head');
      // eslint-disable-next-line no-undef
      const styleT = document.querySelector('style');

      // 5 - get Products Groups data in array
      // eslint-disable-next-line camelcase
      const sk_groups = [];
      // eslint-disable-next-line no-undef,camelcase
      const sk_wrapper = document.querySelectorAll('div.sk-blk')[1];
      // eslint-disable-next-line camelcase
      const sk_wraper_childs = sk_wrapper.childElementCount;

      // eslint-disable-next-line no-plusplus, camelcase
      for (let i = 0; i < sk_wraper_childs; i++) {
        // eslint-disable-next-line camelcase
        const sk_product = sk_wrapper.querySelector(`.sk_g${i + 1}`);
        sk_groups.push(sk_product);
      }

      sk_wrapper.innerHTML = bodyData;
      head.innerHTML += scriptData;
      styleT.innerHTML += styles;

      // 6 - replace image node ID's with product's group data
      // eslint-disable-next-line camelcase
      ids.forEach((id, id_index) => {
        // eslint-disable-next-line camelcase
        sk_groups.forEach((sk_g, sk_index) => {
          // eslint-disable-next-line camelcase
          if (id_index === sk_index) {
            // eslint-disable-next-line no-undef
            const selectedProduct = document.getElementById(id);
            let parent;
            if (!selectedProduct) return;
            if (selectedProduct.parentElement.parentElement.tagName === 'A') {
              parent = selectedProduct.parentElement.parentElement.parentElement.parentElement; // parent of 'a' tag
              parent.removeChild(selectedProduct.parentElement.parentElement.parentElement); // removed 'a' tag
            } else {
              parent = selectedProduct.parentElement.parentElement.parentElement;
              parent.removeChild(selectedProduct.parentElement.parentElement);
            }
            parent.innerHTML += sk_g.outerHTML;
          }
        });
      });
    },
    { styles, bodyData, scriptData, ids }
  );

  await page.evaluate(
    // eslint-disable-next-line no-shadow
    ({ styles }) => {
      // eslint-disable-next-line no-undef
      const ampStyles = document.querySelector('[amp-custom]');

      ampStyles.innerHTML += styles;
    },
    { styles }
  );

  // 7 - making final html file after all conversions
  // eslint-disable-next-line no-undef
  let finalHtmlFile = await page.evaluate(() => document.documentElement.outerHTML);

  // 8 - remove unnecessary tags, insert necessary attributes
  if (!finalHtmlFile.includes('<!doctype html>')) {
    finalHtmlFile = `<!doctype html>${finalHtmlFile}`;
  }

  finalHtmlFile = finalHtmlFile
    .replace(/&quot;/gim, "'")
    .replace(/&amp;/gim, '&')
    .replace(/i-amphtml-layout="([^"]+)"/gim, '')
    .replace(/amp-custom="([^"]+)?"/gim, ' amp-custom')
    .replace(/async="([^"]+)?"/gim, ' async')
    .replace(/amp4email="([^"]+)?"/gim, ' amp4email')
    .replace(/⚡4email="([^"]+)?"/gim, ' amp4email')
    .replace(/⚡4email/gim, ' amp4email')
    .replace(/amp4email-boilerplate="([^"]+)?"/gim, ' amp4email-boilerplate');

  await page.close();
  await browser.close();

  return finalHtmlFile;
}

async function ReplaceAreaWithNoCart(markGeneratedFile, baseTemplateFileURL, id) {
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
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--disable-web-security',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*',
    ],
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);
  await page.setJavaScriptEnabled(false);

  await page.setContent(markGeneratedFile);

  let styles = '';
  let bodyData = '';
  let scriptData = '';

  const result = await page.evaluate(
    // eslint-disable-next-line no-shadow
    ({ styles, bodyData, scriptData }) => {
      let data = '';
      // eslint-disable-next-line no-undef
      const header = document.querySelector('head');
      const scripts = header.getElementsByTagName('script');
      // eslint-disable-next-line no-undef
      const body = document.querySelector('body');
      // eslint-disable-next-line no-undef
      const style = document.querySelector('style[amp-custom]');

      // eslint-disable-next-line no-param-reassign
      bodyData = body.innerHTML;
      // eslint-disable-next-line no-param-reassign
      styles = style.innerHTML;
      // eslint-disable-next-line no-undef
      head = header.innerHTML;

      // eslint-disable-next-line no-restricted-syntax
      for (const script of Array.from(scripts)) {
        data += script.outerHTML;
      }
      // eslint-disable-next-line no-param-reassign
      scriptData = data;

      return { styles, bodyData, scriptData };
    },
    { styles, bodyData, scriptData }
  );

  bodyData = result.bodyData;
  styles = result.styles;
  scriptData = result.scriptData;

  // const { data: htmlData } = await axios.get(baseTemplateFileURL);

  await page.setContent(baseTemplateFileURL);

  await page.evaluate(
    // eslint-disable-next-line no-shadow
    ({ styles, scriptData, bodyData, id }) => {
      // eslint-disable-next-line no-undef
      const element = document.getElementById(id[0]);
      // eslint-disable-next-line no-undef
      const head = document.querySelector('head');
      // eslint-disable-next-line no-undef
      let styleT = document.querySelector('style');

      let parent;

      if (!element) return;

      if (element.parentElement.parentElement.tagName === 'A') {
        parent = element.parentElement.parentElement.parentElement.parentElement; // parent of 'a' tag
        parent.removeChild(element.parentElement.parentElement.parentElement); // removed 'a' tag
      } else {
        parent = element.parentElement.parentElement.parentElement;
        parent.removeChild(element.parentElement.parentElement);
      }

      parent.innerHTML += bodyData;
      head.innerHTML += scriptData;

      if (styleT === null) {
        // eslint-disable-next-line no-undef
        styleT = document.createElement('style');
      }

      styleT.innerHTML += styles;
      head.innerHTML += styleT.outerHTML;
    },
    { styles, scriptData, bodyData, id }
  );

  // remove unnecessary classes
  await page.evaluate(() => {
    const removeClasses = (className) => {
      // eslint-disable-next-line no-undef
      const el = document.querySelectorAll(`.${className}`);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < el.length; i++) {
        if (el[i].classList.contains(`${className}`)) {
          el[i].classList.remove(`${className}`);
        }
      }
    };
    removeClasses('i-amphtml-fill-content');
    removeClasses('i-amphtml-replaced-content');
    removeClasses('i-amphtml-element');
    removeClasses('i-amphtml-layout-fixed-height');
    removeClasses('i-amphtml-layout-size-defined');
    removeClasses('amp-carousel-slide');
    removeClasses('i-amphtml-slide-item');
    removeClasses('i-amphtml-built');
    removeClasses('amp-carousel-button');
    removeClasses('amp-carousel-button-next');
    removeClasses('amp-carousel-button-prev');
    removeClasses('amp-disabled');
    removeClasses('i-amphtml-carousel-has-controls');
    removeClasses('i-amphtml-slidescroll');
    removeClasses('i-amphtml-slides-container');
    removeClasses('i-amphtml-slidescroll-no-snap');
  });
  // eslint-disable-next-line no-undef
  let entireHtmlFile = await page.evaluate(() => document.documentElement.outerHTML);

  entireHtmlFile = entireHtmlFile
    .replace(/&quot;/gim, "'")
    .replace(/&amp;/gim, '&')
    .replace(/i-amphtml-layout="([^"]+)"/gim, '')
    .replace(/amp-custom="([^"]+)?"/gim, ' amp-custom')
    .replace(/async="([^"]+)?"/gim, ' async')
    .replace(/amp4email="([^"]+)?"/gim, ' amp4email data-css-strict')
    .replace(/⚡4email="([^"]+)?"/gim, ' amp4email data-css-strict')
    .replace(/⚡4email/gim, ' amp4email data-css-strict')
    .replace(/amp4email-boilerplate="([^"]+)?"/gim, ' amp4email-boilerplate');

  await page.close();
  await browser.close();

  return entireHtmlFile;
}

module.exports = { ReplaceAreaWithFileURL, ReplaceAreaWithNoCart };
