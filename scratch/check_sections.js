const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const s1 = html.indexOf('class="format-section"');
const s2 = html.indexOf('id="expertos"');
const s3 = html.indexOf('class="details-split-section"');
const s4 = html.indexOf('class="outcomes-section"');
const s5 = html.indexOf('id="inversion"');

console.log('format-section:', s1);
console.log('expertos:', s2);
console.log('details-split-section:', s3);
console.log('outcomes-section:', s4);
console.log('inversion:', s5);

