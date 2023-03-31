# google-address-reformat

Requires your google
API address key
Takes address in any format, 
And returns it like

usage
```
npm i google-address-reformat
```

use in your project:
```
const adr = require('google-address-reformat');
const your_google_api_key = 'xxxx';

var address = "  1920 MUSTIQUE STREET \
NAPLES, FL 34120";

async function main() {
  const result = await adr.getAddress(address,your_google_api_key);
  console.log(result);
};
```

Returns result in JSON like:
```
{
  street: '1920 Mustique St',
  city: 'Naples',
  state: 'FL',
  zip: '34120',
  country: 'USA'
}
```
