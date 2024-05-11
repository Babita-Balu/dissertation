const express = require('express');
const multer = require('multer'); // For handling file uploads
const cors = require('cors');
const app = express();
const port = 5000;
const path = require('path');
const fs = require('fs');


const { converterFromFileData } = require("./converter");
const { getTemplates } = require('./amp-email-template-generator');
const { ReplaceAreaWithFileURL } = require('./RealConversion')

app.use(express.json());
app.use(cors());


// Create a storage engine for multer
const upload = multer({
  limits: {
    fileSize: 10000000 // 1MB limit
  },
  storage: multer.memoryStorage()
});

// Define a route to handle the POST request
app.post('/api/receive-files', upload.fields([{ name: 'htmlTemplate' }, { name: 'productData' }]), async (req, res) => {
  try {
    const jsonFile = req.files['productData'][0].buffer.toString();

    // 1 - convert html to amp
    const ids = req.body.ids.split(',');
    const convertedAmp = await converterFromFileData(req.body.htmlTemplate);

    // 2 - make amp template from data
    const resp = await getTemplates(JSON.parse(jsonFile), {
      //overwrite configs, this can be set in formData.config as well.
      type: `form`,
      useCarousel: false,
      productStyle: 'product-compact',
      themeColor: '#031e2f',
      useLegacyMode: false,
      "quantityStyle": "dropdown",
      "option1Style": "button",
      "maxWidth": '600px',
      "mobileBreakpoint": '600px',
      "cartLayout": 'default',

    });

    const finalAmp = await ReplaceAreaWithFileURL(resp.amp, convertedAmp, ids);
    const modifiedHtml = finalAmp.replace(/<tbody\s+style="align:\s+center"\s*>/g, '<tbody>');

    // Set the appropriate response headers for download
    res.setHeader('Content-disposition', 'attachment; filename=myFile.html');
    res.setHeader('Content-type', 'text/html');

    // Send a response to the client
    res.status(200).send(modifiedHtml);
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const SaveFile = (ampFileData) => {
  fs.writeFile(
    path.join(__dirname + `/AMP-converted/amp-v${Date.now()}.html`),
    ampFileData,
    function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
      process.exit(1);
    }
  );
};

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
