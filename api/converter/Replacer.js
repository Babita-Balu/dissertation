// const puppeteer = require('puppeteer');
// const axios = require('axios');
// const { createFile } = require('./utils/createFile');
// const fs = require('fs')
// const path = require('path')

// let markGeneratedFile = fs.readFileSync(
//     path.join(__dirname + `/html/AMP-converted/f.html`),
//     'utf8'
// );

// async function AddViewProductsOptions(markGeneratedFile, baseTemplateFile, ids, viewProductOptions, cartLayout, useCarousel) {
//     const browser = await puppeteer.launch({
//         headless: false,
//         executablePath: process.env.CHROMIUM_PATH,
//         defaultViewport: null,
//         args: [
//             '--start-maximized',
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-infobars',
//             '--window-position=0,0',
//             '--ignore-certificate-errors',
//             '--ignore-certificate-errors-spki-list',
//             '--disable-web-security',
//             '--disable-gpu',
//             '--disable-dev-shm-usage',
//             '--disable-setuid-sandbox',
//             '--no-first-run',
//             '--no-zygote',
//             '--single-process',
//             "--proxy-server='direct://'",
//             '--proxy-bypass-list=*',
//         ],
//     });

//     const page = await browser.newPage();

//     await page.setDefaultNavigationTimeout(0);
//     await page.setJavaScriptEnabled(false);

//     const { data: htmlData } = await axios.get(baseTemplateFile);

//     await page.setContent(htmlData);

//     let styles = '';
//     let bodyData = '';
//     let scriptData = '';

//     const result = await page.evaluate(
//         // eslint-disable-next-line no-shadow
//         ({ styles, bodyData, scriptData }) => {
//             let data = '';
//             // eslint-disable-next-line no-undef
//             const header = document.querySelector('head');
//             const scripts = header.getElementsByTagName('script');
//             // eslint-disable-next-line no-undef
//             const body = document.querySelector('body');
//             let style = '';
//             // eslint-disable-next-line no-undef
//             document.querySelectorAll('style').forEach((tag) => {
//                 if (tag.tagName === 'STYLE') {
//                     style += tag.innerHTML;
//                 }
//             });
//             // :not(style[amp4email-boilerplate])
//             const viewProductsBtnStyles = `
//             .pd-promo-img {
//                 position: relative;
//             }
//             .pd-promo-img-btn {
//                 position: absolute;
//                 z-index: 9999;
//                 left: 1rem;
//                 bottom: 1rem;
//                 background-color: rgba(0, 0, 0, 1);
//                 opacity: 0.6;
//                 padding: 0.5rem 1rem 0.5rem 2.5rem;
//                 color: rgba(255, 255, 255, 0.8);
//                 border-radius: 20px;
//                 cursor: pointer;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 background-image: url(https://i.imgur.com/dXGIPU0.png);
//                 background-repeat: no-repeat;
//                 background-size: 0.9rem;
//                 background-position: 1.15rem 45%;
//             }
//             .pd-promo-img-btn:hover {
//                 opacity: 1;
//                 color: rgba(255, 255, 255, 1);
//             }
//         `;
//             // eslint-disable-next-line no-param-reassign
//             bodyData = body.innerHTML;
//             // eslint-disable-next-line no-param-reassign
//             styles = style + viewProductsBtnStyles;
//             // eslint-disable-next-line no-undef
//             head = header.innerHTML;

//             // eslint-disable-next-line no-restricted-syntax
//             for (const script of Array.from(scripts)) {
//                 data += script.outerHTML;
//             }
//             // eslint-disable-next-line no-param-reassign
//             scriptData = data;

//             return { styles, bodyData, scriptData };
//         },
//         { styles, bodyData, scriptData }
//     );

//     bodyData = result.bodyData;
//     styles = result.styles;
//     scriptData = result.scriptData;

//     await page.setContent(markGeneratedFile);

//     await page.evaluate(
//         ({ bodyData, scriptData, ids, viewProductOptions }) => {
//             // eslint-disable-next-line no-undef
//             const head = document.querySelector('head');

//             const sk_groups = [];
//             // eslint-disable-next-line camelcase,no-undef
//             const sk_wrapper = document.querySelectorAll('div.sk-blk')[1];
//             // eslint-disable-next-line camelcase
//             const sk_wraper_childs = sk_wrapper.childElementCount;

//             // eslint-disable-next-line camelcase,no-plusplus
//             for (let i = 0; i < sk_wraper_childs; i++) {
//                 // eslint-disable-next-line camelcase
//                 const sk_product = sk_wrapper.querySelector(`.sk_g${i + 1}`);
//                 sk_groups.push(sk_product);
//             }

//             sk_wrapper.innerHTML = bodyData;
//             head.innerHTML += scriptData;

//             // eslint-disable-next-line camelcase
//             ids.forEach((id, id_index) => {
//                 // eslint-disable-next-line camelcase
//                 sk_groups.forEach((sk_g, sk_index) => {
//                     viewProductOptions.forEach((option, optionIdx) => {
//                         // eslint-disable-next-line camelcase
//                         if (id_index === sk_index && id_index === optionIdx) {
//                             if (!option) {
//                                 // eslint-disable-next-line no-undef
//                                 const selectedProduct = document.getElementById(id);

//                                 if (!selectedProduct) return; // return If no one element found with the given ID

//                                 let parent;
//                                 let anchor;
//                                 if (selectedProduct.closest('a')) {
//                                     parent = selectedProduct.closest('a').parentElement;
//                                     anchor = selectedProduct.closest('a');
//                                     anchor.remove();
//                                 } else {
//                                     parent = selectedProduct.parentElement;
//                                     selectedProduct.remove();
//                                 }
//                                 parent.appendChild(sk_g);
//                             } else {
//                                 // eslint-disable-next-line no-undef
//                                 const selectedProduct = document.getElementById(id);
//                                 const anchor = selectedProduct.parentElement.parentElement; // a
//                                 const parent = selectedProduct.parentElement.parentElement.parentElement; // parent of anchor
//                                 const div = selectedProduct;
//                                 anchor.remove();

//                                 const wrappedDiv = `
//                                         <div class="pd-promo-img">
//                                             ${div.innerHTML}
//                                             <div class="pd-promo-img-btn pd-promo-img-btn-1"
//                                                 on="tap:g${sk_index + 1}.show"
//                                                 role="button"
//                                                 tabindex="1">
//                                                 View Products
//                                             </div>
//                                         </div>`;

//                                 parent.appendChild(div);
//                                 selectedProduct.remove();
//                                 parent.innerHTML += wrappedDiv;

//                                 parent.parentElement.parentElement.innerHTML += `
//                                 <tr>
//                                     <td>
//                                         <span hidden id="g${sk_index + 1}">
//                                         ${sk_g.outerHTML}
//                                         </span>
//                                     </td>
//                                 </tr>
//                                 `;
//                             }
//                         }
//                     });
//                 });
//             });
//         },
//         { bodyData, scriptData, ids, viewProductOptions }
//     );

//     await page.evaluate(
//         // eslint-disable-next-line no-shadow
//         ({ styles }) => {
//             // eslint-disable-next-line no-undef
//             const ampStyles = document.querySelector('[amp-custom]');

//             ampStyles.innerHTML += styles;
//         },
//         { styles }
//     );

//     let campaignToken = await page.evaluate(({ cartLayout }) => {
//         // eslint-disable-next-line no-undef
//         let campaignToken;
//         if (cartLayout === 'no-mini') {
//             campaignToken = document.querySelector('form#skipify-cart-form-p1').getAttribute('action-xhr').split('/').pop()
//         } else {
//             const c = document.getElementById('skipify-cart-form');
//             campaignToken = c.getAttribute('action-xhr').split('/').pop();
//         }
//         return campaignToken;
//     }, { cartLayout });

//     // eslint-disable-next-line no-shadow
//     await page.evaluate(
//         ({ cartLayout, useCarousel }) => {
//             if (cartLayout === 'no-mini') return;
//             const checkoutButton = document.querySelector('div.sk-checkout');
//             const templateTag = document.querySelector('template#skipify-cart');
//             const directCheckout = document.querySelectorAll('div.sk-blk')[4];

//             const area = document.querySelector('.cartArea');

//             if (area && area.hasAttribute('id')) {
//                 area.removeAttribute('style');
//                 const parentOfArea = area.parentNode;

//                 if (cartLayout === 'minimal' && !useCarousel) {
//                     parentOfArea.innerHTML += `<tr>
//             <td>
//                 ${checkoutButton.outerHTML}
//                 ${templateTag.outerHTML}
//                 ${directCheckout.outerHTML}
//             </td>
//            </tr>`;
//                     templateTag.remove();
//                     directCheckout.remove();
//                 }
//                 else if (cartLayout === 'minimal' && useCarousel) {
//                     const directCheckoutForm = document.querySelectorAll('div.sk-blk')[4];
//                     parentOfArea.innerHTML += `<tr>
//             <td>
//                 ${checkoutButton.outerHTML}
//                 ${templateTag.outerHTML}
//             </td>
//            </tr>`;
//                     templateTag.remove();
//                     directCheckout.remove();
//                     directCheckoutForm.remove();
//                 }
//                 else {
//                     parentOfArea.innerHTML += `<tr><td>${checkoutButton.outerHTML}</td></tr>`;
//                 }
//                 checkoutButton.remove();
//             }
//         },
//         { cartLayout, useCarousel }
//     );

//     let finalHtmlFile = await page.evaluate(() => document.documentElement.outerHTML);

//     if (!finalHtmlFile.includes('<!doctype html>')) {
//         finalHtmlFile = `<!doctype html>${finalHtmlFile}`;
//     }

//     finalHtmlFile = finalHtmlFile
//         .replace(/&quot;/gim, "'")
//         .replace(/&amp;/gim, '&')
//         .replace(/i-amphtml-layout="([^"]+)"/gim, '')
//         .replace(/amp-custom="([^"]+)?"/gim, ' amp-custom')
//         .replace(/hidden="([^"]+)?"/gim, ' hidden')
//         .replace(/async="([^"]+)?"/gim, ' async')
//         .replace(/amp4email="([^"]+)?"/gim, ' amp4email')
//         .replace(/⚡4email="([^"]+)?"/gim, ' ⚡4email')
//         .replace(/⚡4email/gim, ' amp4email')
//         .replace(/amp4email-boilerplate="([^"]+)?"/gim, ' amp4email-boilerplate');

//     // await page.close();
//     // await browser.close();

//     createFile(finalHtmlFile, 'finalHTML')

//     return { finalHtmlFile, campaignToken };
// }

// AddViewProductsOptions(markGeneratedFile,
//     "https://storage.googleapis.com/emaildatabucketdev/file-5faff3d8-7877-49ce-9ac7-454591cb5678",
//     ['1626172272818', '1626172273344'],
//     [false, false],
//     'minimal',
//     true
// );

// // const path = require('path');
// // const fs = require('fs');
// //
// // fs.writeFile(path.join(__dirname + `/amp.html`), shoppableAMP, function (err) {
// //         if (err) throw err;
// //         console.log('File is created successfully.');
// //     }
// // );
// // fs.writeFile(path.join(__dirname + `/productData.html`), JSON.stringify(productData), function (err) {
// //         if (err) throw err;
// //         console.log('File is created successfully.');
// //     }
// // );