const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const invStart = html.indexOf('id="inversion"');
const invEnd = html.indexOf('class="signup-section"');
console.log(html.substring(invStart, invEnd));

