// const puppeteer = require('puppeteer');
// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const { createFile } = require('./utils/createFile');

// let markGeneratedFile = fs.readFileSync(
//     path.join(__dirname + `/html/AMP-converted/single-item.html`),
//     'utf8'
// );

// let baseTemplateFileURL = fs.readFileSync(
//   path.join(__dirname + `/html/AMP-converted/chemicalguys-amp.html`),
//   'utf8'
// );

// async function ReplaceAreaWithNoCart(markGeneratedFile, baseTemplateFileURL, id, viewProductOptions) {
//   const browser = await puppeteer.launch({
//       headless: false,
//       executablePath: process.env.CHROMIUM_PATH,
//       defaultViewport: null,
//       args: [
//           '--start-maximized',
//           '--no-sandbox',
//           '--disable-setuid-sandbox',
//           '--disable-infobars',
//           '--window-position=0,0',
//           '--ignore-certifcate-errors',
//           '--ignore-certifcate-errors-spki-list',
//           '--disable-web-security',
//           '--disable-gpu',
//           '--disable-dev-shm-usage',
//           '--disable-setuid-sandbox',
//           '--no-first-run',
//           '--no-zygote',
//           '--single-process',
//           "--proxy-server='direct://'",
//           '--proxy-bypass-list=*',
//       ],
//   });

//   const page = await browser.newPage();

//   await page.setDefaultNavigationTimeout(0);
//   await page.setJavaScriptEnabled(false);

//   await page.setContent(markGeneratedFile);

//   let styles = '',
//       bodyData = '',
//       scriptData = '';

//   let result = await page.evaluate(
//       ({ styles, bodyData, scriptData }) => {
//           let data = '';
//           let header = document.querySelector('head');
//           let scripts = header.getElementsByTagName('script');
//           let body = document.querySelector('body');
//           let style = document.querySelector('style[amp-custom]');

//           bodyData = body.innerHTML;
//           styles = style.innerHTML;
//           head = header.innerHTML;

//           for (let script of Array.from(scripts)) {
//               data += script.outerHTML;
//           }
//           scriptData = data;

//           return { styles, bodyData, scriptData };
//       },
//       { styles, bodyData, scriptData }
//   );

//   bodyData = result.bodyData;
//   styles = result.styles;
//   scriptData = result.scriptData;

//   // const { data: htmlData } = await axios.get(baseTemplateFileURL);

//   await page.setContent(baseTemplateFileURL);

//   await page.evaluate(
//       ({ styles, scriptData, bodyData, id, viewProductOptions }) => {
//           let element = document.getElementById(id[0]);
//           let head = document.querySelector('head');
//           let styleT = document.querySelector('style');

//           if (viewProductOptions[0]) {
//             // let anchor = element.parentElement.parentElement; // a
//             let anchor = element.closest('a'); // a
//             let parent = element.parentElement.parentElement.parentElement; // parent of anchor
//             let div = element;
//             if (anchor) {
//               anchor.remove();
//             }
//             const wrappedDiv = `
//                     <div class="pd-promo-img">
//                         ${div.innerHTML}
//                         <div class="pd-promo-img-btn pd-promo-img-btn-1"
//                             on="tap:g1.show"
//                             role="button"
//                             tabindex="1">
//                             View Products
//                         </div>
//                     </div>`;
  
//             parent.appendChild(div);
//             element.remove();
//             parent.innerHTML += wrappedDiv;
  
//             parent.parentElement.parentElement.innerHTML += `
//             <tr>
//                 <td>
//                     <span hidden id="g1">
//                     ${bodyData}
//                     </span>
//                 </td>
//             </tr>
//             `;
//           }
//           else {
//             let parent;

//             if (!element) return;

//             if (element.parentElement.parentElement.tagName === 'A') {
//                 parent =
//                     element.parentElement.parentElement.parentElement.parentElement; // parent of 'a' tag
//                 parent.removeChild(element.parentElement.parentElement.parentElement); // removed 'a' tag
//             } else {
//                 parent = element.parentElement.parentElement.parentElement;
//                 parent.removeChild(element.parentElement.parentElement);
//             }

//             parent.innerHTML += bodyData;
//           }


//           // parent.innerHTML += bodyData;
//           head.innerHTML += scriptData;

//           if (styleT === null) {
//               styleT = document.createElement('style');
//           }

//           styleT.innerHTML += styles;
//           head.innerHTML += styleT.outerHTML;
//       },
//       { styles, scriptData, bodyData, id, viewProductOptions }
//   );

//   await page.evaluate(()=>{
//     const style = document.querySelector('style');

//     const viewProductsBtnStyles = `
//     .pd-promo-img {
//       position: relative;
//   }
//   .pd-promo-img-btn {
//       position: absolute;
//       left: 1rem;
//       z-index: 9999;
//       bottom: 1rem;
//       background-color: rgba(0, 0, 0, 1);
//       opacity: 0.6;
//       padding: 0.5rem 1rem 0.5rem 2.5rem;
//       color: rgba(255, 255, 255, 0.8);
//       border-radius: 20px;
//       cursor: pointer;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       background-image: url(https://i.imgur.com/dXGIPU0.png);
//       background-repeat: no-repeat;
//       background-size: 0.9rem;
//       background-position: 1.15rem 45%;
//   }
//   .pd-promo-img-btn:hover {
//       opacity: 1;
//       color: rgba(255, 255, 255, 1);
//   }
//     `;

//     style.innerHTML += viewProductsBtnStyles;
//   });

//   // remove unnecessary classes
//   await page.evaluate(() => {
//       const removeClasses = (className) => {
//           const el = document.querySelectorAll(`.${className}`);
//           for (let i = 0; i < el.length; i++) {
//               if (el[i].classList.contains(`${className}`)) {
//                   el[i].classList.remove(`${className}`);
//               }
//           }
//       };
//       removeClasses('i-amphtml-fill-content');
//       removeClasses('i-amphtml-replaced-content');
//       removeClasses('i-amphtml-element');
//       removeClasses('i-amphtml-layout-fixed-height');
//       removeClasses('i-amphtml-layout-size-defined');
//       removeClasses('amp-carousel-slide');
//       removeClasses('i-amphtml-slide-item');
//       removeClasses('i-amphtml-built');
//       removeClasses('amp-carousel-button');
//       removeClasses('amp-carousel-button-next');
//       removeClasses('amp-carousel-button-prev');
//       removeClasses('amp-disabled');
//       removeClasses('i-amphtml-carousel-has-controls');
//       removeClasses('i-amphtml-slidescroll');
//       removeClasses('i-amphtml-slides-container');
//       removeClasses('i-amphtml-slidescroll-no-snap');
//   });

//   let entireHtmlFile = await page.evaluate(
//       () => document.documentElement.outerHTML
//   );

//   entireHtmlFile = entireHtmlFile
//     .replace(/&quot;/gim, "'")
//     .replace(/&amp;/gim, '&')
//     .replace(/i-amphtml-layout="([^"]+)"/gim, '')
//     .replace(/amp-custom="([^"]+)?"/gim, ' amp-custom')
//     .replace(/async="([^"]+)?"/gim, ' async')
//     .replace(/amp4email="([^"]+)?"/gim, ' amp4email data-css-strict')
//     .replace(/⚡4email="([^"]+)?"/gim, ' amp4email data-css-strict')
//     .replace(/⚡4email/gim, ' amp4email data-css-strict')
//     .replace(/amp4email-boilerplate="([^"]+)?"/gim, ' amp4email-boilerplate');


//   // await page.close();
//   // await browser.close();
//   createFile(entireHtmlFile, 'single1111');

//   return entireHtmlFile;
// }

// ReplaceAreaWithNoCart(markGeneratedFile, baseTemplateFileURL, ['1614585369375'], [false])