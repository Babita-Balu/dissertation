# Usage

##Testing

### Remove comment on function `convertAndSave`

Put the HTML file in `Non AMP` folder and specify path on `line 9`
then run

```
node index.js
```

AMP EMAIL File will be saved in `AMP-converted` folder

## Use as a NodeJS package

### Import as NODEJS Package

```javascript
const { converterFromFileData, converterFromUrl } = require('html2amp');
```

### Use with File URL

use `converterFromUrl` function and pass `fileURL` as argument

```
node index.js
```

It will return the AMP File Data as String

### Use with File Data

use `converterFromFileData` function and pass `fileData` as `string`

```
node index.js
```

It will return the AMP File Data as String
