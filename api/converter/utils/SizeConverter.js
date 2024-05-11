const puppeteer = require('puppeteer');

async function SizeConverter(html) {
    const browser = await puppeteer.launch({
        headless: true,
        //executablePath: process.env.CHROMIUM_PATH,
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

    // giving each image height, width and layout
    await page.evaluate(() => {
        return Array.from(document.images, (img, idx) => {
            const widthValue = img.getBoundingClientRect().width;
            const heightValue = img.getBoundingClientRect().height;

            let width = img.getAttribute('width');
            if (width) {
                width = width.trim();
            }

            let height = img.getAttribute('height');

            if (width == '1px' || width == '1' && height == '1px' || height == '1') {
                img.remove();
                return;
            }

            img.removeAttribute('width');
            img.removeAttribute('height');

            width
                ? img.setAttribute(
                    'width',
                    width === 'auto' || width.includes('%') ? widthValue : width
                )
                : img.setAttribute('width', `${widthValue}`);

            height
                ? img.setAttribute(
                    'height',
                    height === 'auto' || height.includes('%') ? heightValue : height
                )
                : img.setAttribute('height', `${heightValue}`);

            if (!img.style.maxWidth) {
                img.style.maxWidth = widthValue + 'px';
            }

            if (img.style.height && img.style.height.includes('px')) {
                img.style.removeProperty('height')
                img.style.height = '100%';
            }
            if (img.style.width && img.style.width.includes('px')) {
                const maxWidthValue = img.style.width;
                img.style.maxWidth = maxWidthValue;
                img.style.removeProperty('width');
            }

            if (img.style.display === 'inline' || !img.style.display) {
                img.style.display = 'flex';
                img.style.objectFit = 'contain';
            }

            img.setAttribute('layout', 'responsive');
            img.removeAttribute('max-height');
        });
    });

    // Fix height & values issues
    await page.evaluate(() => {
        return Array.from(document.images, (img, idx) => {
            const widthValue = img.getBoundingClientRect().width;
            const heightValue = img.getBoundingClientRect().height;

            let width = img.getAttribute('width');
            let height = img.getAttribute('height');

            if (width) {
                width = width.trim();
            }

            if (!img.hasAttribute('height')) {
                img.setAttribute('height', `${heightValue}`)
            } else if (!img.hasAttribute('width')) {
                img.setAttribute('width', `${widthValue}`)
            }
        });
    });

    // remove fixed width values for responsiveness
    await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const trs = document.querySelectorAll('tr');
        const tds = document.querySelectorAll('td');
        const divs = document.querySelectorAll('div');

        trs.forEach(tr => {
            if (tr.style.width && tr.style.width.includes('px')) {
                const maxWidthValue = tr.style.width;
                tr.style.maxWidth = maxWidthValue;
                tr.style.removeProperty('width');
            }
        });

        tds.forEach(td => {
            if (td.style.width && td.style.width.includes('px')) {
                const maxWidthValue = td.style.width;
                td.style.maxWidth = maxWidthValue;
                td.style.removeProperty('width');
            }

            // const widthValue = img.getBoundingClientRect().width;
            if (td.children[0] && td.children[0].children[0] && td.children[0].children[0].tagName === 'IMG') {
                const imageTag = td.children[0].children[0];
                const widthValue = imageTag.getBoundingClientRect().width;
                td.style.width = widthValue + "px";
            }

            if (td.children[0] && td.children[0].tagName === 'IMG') {
                const imageTag = td.children[0];
                const widthValue = imageTag.getBoundingClientRect().width;
                td.style.width = widthValue + "px";
            }
        });

        divs.forEach(div => {
            if (div.style.width && div.style.width.includes('px')) {
                const maxWidthValue = div.style.width;
                div.style.maxWidth = maxWidthValue;
                div.style.removeProperty('width');
            }
        });

        tables.forEach(table => {
            if (table.style.width && table.style.width.includes('px')) {
                const maxWidthValue = table.style.width;
                table.style.maxWidth = maxWidthValue;
                table.style.removeProperty('width');
            }
        });
    });

    // font tags fixes and removing 'alt' attr from 'a' tag
    await page.evaluate(() => {
        // for align
        const tags = document.querySelectorAll('[align]');
        if (tags.length > 0) {
            tags.forEach((tag) => {
                if (
                    tag.tagName === 'TABLE' ||
                    tag.tagName === 'TD' ||
                    tag.tagName === 'TH' ||
                    tag.tagName === ' TBODY'
                ) {
                    return;
                }
                if (tag.tagName === 'IMG') {
                    return tag.removeAttribute('align');
                }
                if (tag.hasAttribute('style')) {
                    let styleValue = tag.getAttribute('style');
                    if (tag.tagName !== 'DIV') {
                        styleValue += `; align: ${tag.getAttribute('align')}`;
                    }

                    tag.setAttribute('style', styleValue);
                    tag.removeAttribute('align');
                    return;
                }
                tag.setAttribute('style', `align: ${tag.getAttribute('align')}`);
                tag.removeAttribute('align');
            });
        }
        // for valign
        const valignTags = document.querySelectorAll('[valign]');

        if (valignTags.length > 0) {
            valignTags.forEach((tag) => {
                if (
                    tag.tagName === 'TD' ||
                    tag.tagName === 'TH' ||
                    tag.tagName === ' TBODY'
                ) {
                    return;
                }

                if (tag.hasAttribute('style')) {
                    let styleValue = tag.getAttribute('style');
                    styleValue += `; vertical-align: ${tag.getAttribute('valign')}`;

                    tag.setAttribute('style', styleValue);
                    tag.removeAttribute('valign');
                    return;
                }

                tag.setAttribute(
                    'style',
                    `vertical-align: ${tag.getAttribute('valign')}`
                );
                tag.removeAttribute('valign');
            });
        }
        document.querySelectorAll('a').forEach((b) => {
            function validURL(str) {
                const pattern = new RegExp(
                    "^(https?:\\/\\/)?" + // protocol
                    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                    "(\\#[-a-z\\d_]*)?$",
                    "i"
                ); // fragment locator
                return !!pattern.test(str);
            }

            if (!validURL(b.getAttribute('href'))) {
                b.removeAttribute('href');
            }
            b.removeAttribute('alt');

            if (b.hasAttribute('target') && b.getAttribute('target') === '_self') {
                b.removeAttribute('target');
            }

            if (b.hasAttribute('color')) {
                b.style.color = b.getAttribute('color');
                b.removeAttribute('color');
            }
        });

        document.querySelectorAll('td').forEach(t => {
            t.removeAttribute('cellpadding')
            t.removeAttribute('cellspacing')
        });
        // return;
    });

    // for bgcolor
    await page.evaluate(() => {
        const docs = Array.from(document.querySelectorAll('[bgcolor]'));

        if (docs.length) {
            docs.forEach((doc) => {
                if (doc.hasAttribute('style')) {
                    let style = doc.getAttribute('style');
                    style += `; background-color: ${doc.getAttribute('bgcolor')} `;
                    doc.removeAttribute('style');
                    doc.setAttribute('style', style);
                } else {
                    doc.setAttribute(
                        'style',
                        `background-color: ${doc.getAttribute('bgcolor')}`
                    );
                }
                doc.removeAttribute('bgcolor');
            });
        }
    });

    // paragraph tags fixes
    await page.evaluate(() => {
        let allParagraphs = document.querySelectorAll('font');
        allParagraphs.forEach((p) => {
            if (p.hasAttribute('face')) {
                let face = p.getAttribute('face');
                p.setAttribute('style', `font-family: ${face}`);
                p.removeAttribute('face');
            }

            if (p.hasAttribute('color')) {
                let color = p.getAttribute('color');
                p.setAttribute('style', `color: ${color}`);
                p.removeAttribute('color');
            }
        });
        // return;
    });

    // adding styles
    await page.evaluate(() => {
        let head = document.querySelector('head');
        let allStyleTags = document.querySelectorAll('style');
        let styleTag = document.createElement('style');

        styleTag.setAttribute('amp-custom', '');

        if (allStyleTags.length) {
            allStyleTags.forEach((tag) => {
                styleTag.innerHTML += tag.innerHTML;
                tag.remove();
            });
        }

        head.appendChild(styleTag);
    });

    await page.evaluate(() => {
        const inputs = document.querySelectorAll("input[type='file']");
        inputs.forEach((input) => input.remove());
    });

    let entireHtmlFile = await page.evaluate(
        () => document.documentElement.outerHTML
    );

    entireHtmlFile = entireHtmlFile
        .replace(/<img/gim, '<amp-img')
        .replace(/amp-custom="([^"]+)?"/gim, ' amp-custom')
        .replace(/amp4email-boilerplate="([^"]+)?"/gim, ' amp4email-boilerplate')
        .replace(/&quot;/gim, "'")
        .replace(/&amp;/gim, '&')
        .replace(/i-amphtml-layout="([^"]+)"/gim, '');

    // await page.close();
    // await browser.close();
    return entireHtmlFile;
}

module.exports = { SizeConverter };
