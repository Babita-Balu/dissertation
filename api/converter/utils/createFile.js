const path = require('path');
const fs = require('fs');

exports.createFile = (fileData, filename) => {
  fs.writeFile(
    path.join(__dirname + `/../html/${filename}-${Date.now()}.html`),
    fileData,
    function (err) {
      if (err) throw err;

      console.log('File is created successfully.');
    }
  );
};
