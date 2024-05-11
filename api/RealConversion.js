const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs')
const path = require('path')
// const { createFile } = require('./utils/createFile')

// let markGeneratedFile = fs.readFileSync(
//     path.join(__dirname + `/html/AMP-converted/test.form.amp.html`),
//     'utf8'
// );


// let baseTemplateFile = fs.readFileSync(
//     path.join(__dirname + `/html/AMP-converted/test-amp-v1613551954516.html`),
//     'utf8'
// );

// let baseTemplateFile = fs.readFileSync(
//     path.join(__dirname + `/utils/new-1614010589381.html`),
//     'utf8'
// );

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

  // const { data: htmlData } = await axios.get(baseTemplateFile);

  await page.setContent(baseTemplateFile);

  let styles = '',
    bodyData = '',
    scriptData = '';

  let result = await page.evaluate(
    ({ styles, bodyData, scriptData }) => {
      let data = '';
      let header = document.querySelector('head');
      let scripts = header.getElementsByTagName('script');
      let body = document.querySelector('body');
      let style = '';
      document
        .querySelectorAll("style")
        .forEach((tag) => {
          if (tag.tagName === "STYLE") {
            style += tag.innerHTML;
          }
        });
      // :not(style[amp4email-boilerplate])

      bodyData = body.innerHTML;
      styles = style;
      head = header.innerHTML;

      for (let script of Array.from(scripts)) {
        data += script.outerHTML;
      }
      scriptData = data;

      return { styles, bodyData, scriptData };
    },
    { styles, bodyData, scriptData }
  );

  bodyData = result.bodyData;
  styles = result.styles;
  scriptData = result.scriptData;

  await page.setContent(markGeneratedFile);

  let sk_groups = await page.evaluate(({ styles, bodyData, scriptData, ids }) => {
    const head = document.querySelector('head');
    let styleT = document.querySelector('style');

    // const skGroup = document.querySelectorAll("div.sk-blk > .sk_g1")[0];
    // let skg1 = skGroup;
    // skGroup.remove();
    let sk_groups = [];
    const sk_wrapper = document.querySelectorAll('div.sk-blk')[1];
    const sk_wraper_childs = sk_wrapper.childElementCount;

    for (let i = 0; i < sk_wraper_childs; i++) {
      const sk_product = sk_wrapper.querySelector(`.sk_g${i + 1}`);
      console.log("sk_product: ", sk_product);
      sk_groups.push(sk_product);
    }

    console.log('sk_groups_array: ', sk_groups);

    sk_wrapper.innerHTML = bodyData;
    head.innerHTML += scriptData;
    styleT.innerHTML += styles;

    ids.forEach((id, id_index) => {
      sk_groups.forEach((sk_g, sk_index) => {
        if (id_index == sk_index) {
          console.log('id in loop: ', id)
          console.log('id in index: ', id_index)
          const selectedProduct = document.getElementById(id);
          let parent;
          if (!selectedProduct) return;
          if (selectedProduct.parentElement.parentElement.tagName === 'A') {
            parent =
              selectedProduct.parentElement.parentElement.parentElement.parentElement; // parent of 'a' tag
            parent.removeChild(selectedProduct.parentElement.parentElement.parentElement); // removed 'a' tag
          } else {
            parent = selectedProduct.parentElement.parentElement.parentElement;
            parent.removeChild(selectedProduct.parentElement.parentElement);
          }
          const wrappedDiv = `
                    
                    `;
          parent.innerHTML += sk_g.outerHTML;
        }
      });
    });

    // return sk_groups;
    // return skg1.outerHTML;
  }, { styles, bodyData, scriptData, ids });

  // let entireHtmlFile = await page.evaluate(
  //     () => document.documentElement.outerHTML
  // );

  // await page.setContent(entireHtmlFile);

  let finalHtmlFile = await page.evaluate(
    () => document.documentElement.outerHTML
  );

  if (!finalHtmlFile.includes('<!doctype html>')) {
    finalHtmlFile = '<!doctype html>' + finalHtmlFile;
  }

  finalHtmlFile = finalHtmlFile
    .replace(/&quot;/gim, "'")
    .replace(/&amp;/gim, '&')
    .replace(/i-amphtml-layout="([^"]+)"/gim, '')
    .replace(/amp-custom="([^"]+)?"/gim, ' amp-custom')
    .replace(/async="([^"]+)?"/gim, ' async')
    .replace(/amp4email="([^"]+)?"/gim, ' amp4email')
    .replace(/⚡4email="([^"]+)?"/gim, ' ⚡4email')
    .replace(/⚡4email/gim, ' amp4email data-css-strict')
    .replace(/amp4email-boilerplate="([^"]+)?"/gim, ' amp4email-boilerplate');

  // createFile(finalHtmlFile, 'cart')
  return finalHtmlFile;
}

module.exports = { ReplaceAreaWithFileURL }

// ReplaceAreaWithFileURL(markGeneratedFile, 'https://storage.googleapis.com/skipifyemailbucket/file-da770ca7-d739-4750-b79a-4696e5cc3532', ['1614585369300', '1614585369375'])
