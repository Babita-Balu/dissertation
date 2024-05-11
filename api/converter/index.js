const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { TagsSeparator } = require('./utils/tags-separator');
const { SizeConverter } = require('./utils/SizeConverter');
const { makeAmpFile } = require('./utils/converter');

const convertAndSave = () => {
    let filePath = path.join(__dirname, 'html', 'Non AMP', 'miles.html')
    let filename = path.basename(filePath, '.html');
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) return console.log('Error occurred while reading the file.');
        console.log('Your file is being processed. Please wait...');
        const htmlData = await SizeConverter(data);
        const { bodyString, headString } = await TagsSeparator(htmlData);
        const ampFileData = await makeAmpFile(headString, bodyString);

        fs.writeFile(
            path.join(__dirname + `/html/AMP-converted/${filename}-amp-v${Date.now()}.html`),
            ampFileData,
            function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
                process.exit(1);
            }
        );
    });
};

const readAndConvertMultipleFiles = () => {
    const filesNames = ['20off.html', '1800flower.html', 'thandi.html', '2020-12-29-migi.html', 'barstool.html', 'buckle.html', 'cabin_crew.html',
        'chemicalguys.html', 'chemicalguys-2.html', 'frette.html', 'full.html', 'give_the_gift.html', 'guide_to_holiday.html', 'hanna.html', 'joseph.html',
        'mulberry.html', 'new_arrivals.html', 'original.html', 'pl.html', 'pretty-litter-20210125_US_20off_Scooper.html',
        'stripo.html', 'amy-mother.html', 'travis.html', 'untuckit.html', 'welcome.html', 'westlake.html', 'dollskill.html', 'dsw.html', 'ondo10.html', 'shorts.html', 'swim.html',
        'pretty-litter-20210216_GrouchDay_20off.html', 'womensday.html', 'abandon_cart.html', 'pro-compression.html', 'amy-another.html',
        'hellacocktail-backinstock.html', 'PROD-ecols.dynamic.html', 'Test_ Introducing The Lido Beach' +
        ' Collection.html', 'amy-delfi.html'
    ];

    filesNames.forEach(file => {
        let filePath = path.join(__dirname, 'html', 'Non AMP', file);
        const filename = path.basename(filePath, '.html');

        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) return console.log('Error occurred while reading the file.');
            console.log('Your file is being processed. Please wait...');
            const htmlData = await SizeConverter(data);
            const { bodyString, headString } = await TagsSeparator(htmlData);
            const ampFileData = await makeAmpFile(headString, bodyString);

            fs.writeFileSync(path.join(__dirname + `/html/AMP-converted/${filename}-amp-v${Date.now()}.html`), ampFileData);
        });
    });
};

// convertAndSave();
// readAndConvertMultipleFiles();

const converterFromUrl = async (filePath) => {
    const { data } = await axios.get(filePath);
    const htmlData = await SizeConverter(data);
    const { bodyString, headString } = await TagsSeparator(htmlData);
    const amp = await makeAmpFile(headString, bodyString);
    return amp;
};

const converterFromFileData = async (data) => {
    const htmlData = await SizeConverter(data);
    const { bodyString, headString } = await TagsSeparator(htmlData);
    const amp = await makeAmpFile(headString, bodyString);
    return amp;
};

module.exports = { converterFromUrl, converterFromFileData };