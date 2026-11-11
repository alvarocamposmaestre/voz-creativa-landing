const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('Certificado', pos)) !== -1) {
  console.log('Found Certificado at pos', pos);
  console.log(html.substring(Math.max(0, pos - 100), pos + 150));
  pos += 11;
}

