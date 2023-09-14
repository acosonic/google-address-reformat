const https = require('https');

exports.getAddress = async function (address, key) {
  address = compileAndStrip(address);
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;

    const response = await new Promise((resolve, reject) => {
      https.get(url, (response) => {
        resolve(response);
      }).on('error', (error) => {
        reject(error);
      });
    });

    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    await new Promise((resolve) => {
      response.on('end', () => {
        const result = JSON.parse(data);

        if (result.status !== 'OK') {
          console.log(`Failed to get geocode for ${address}.`);
          console.log(result.error_message);
          return;
        }

        var location = result.results[0].formatted_address;
        formattedAddress = changeAddressFormat(location);
        resolve();
      });
    });

    return formattedAddress;
  } catch (error) {
    console.error('Error making API request: ', error);
  }
}

function changeAddressFormat(address) {
  try {
    console.log(address);
    const addressParts = address.split(', ');

    const street = addressParts[0];
    const city = addressParts[1];
    const stateZipCountry = addressParts[2].split(' ');
    const zip = stateZipCountry[1];
    const state = stateZipCountry[0];
    const country = addressParts[3];

    return {
      "street": street,
      "city": city,
      "state": state,
      "zip": zip,
      "country": country
    };
  } catch (error) {
    console.error('Error making API request: ', error);
    return address;
  }

}


const stripHtmlTags = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};

const compileAndStrip = (inputStr) => {
  // Compile all lines into one
  const compiledStr = inputStr.replace(/\r?\n|\r/g, '');

  // Strip whitespaces
  const strippedWhitespaceStr = compiledStr.replace(/\s+/g, ' ').trim();

  // Strip HTML tags
  const strippedHtmlStr = stripHtmlTags(strippedWhitespaceStr);

  return strippedHtmlStr;
};
