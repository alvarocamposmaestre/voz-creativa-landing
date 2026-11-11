const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const s3 = html.indexOf('class="details-split-section"');
const s4 = html.indexOf('class="outcomes-section"');
const s5 = html.indexOf('id="inversion"');

console.log('=== details-split-section content ===');
console.log(html.substring(s3, s4));

console.log('=== outcomes-section content ===');
console.log(html.substring(s4, s5));

