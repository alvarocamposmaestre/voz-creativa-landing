const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Clean JSON-LD credential and description
html = html.replace('      "educationalCredentialAwarded": "Certificado digital de participación al finalizar el programa.",\n', '');
html = html.replace('"duration": "P5M"', '"duration": "P6M"');
html = html.replace('de 5 meses para', 'de 6 meses para');

fs.writeFileSync('index.html', html, 'utf8');
console.log('JSON-LD cleaned');

