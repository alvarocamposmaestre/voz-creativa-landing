const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  { name: 'Cintillo placeholder', pass: html.includes('id="header-cintillo"') },
  { name: 'Nav Apúntate button', pass: html.includes('<span class="btn-text-nav">Apúntate</span>') },
  { name: 'Hero badge Próximamente', pass: html.includes('Próximamente') },
  { name: 'Hero badge Lista de espera', pass: html.includes('Lista de espera') },
  { name: 'Hero new headline', pass: html.includes('Formación y acompañamiento especializado para fortalecer y desarrollar tu expresión creativa') },
  { name: 'Hero new paragraph', pass: html.includes('Una experiencia para quienes quieren impulsar su expresión más allá del gusto') },
  { name: 'Hero CTA Apúntate', pass: html.includes('<a href="#contacto" class="btn-cta-orange">Apúntate</a>') },
  { name: 'Overview new text', pass: html.includes('Porque producir nunca ha sido lo difícil, lo retador es poder desarrollar una mirada') },
  { name: 'Differentiation text', pass: html.includes('Pero aquí no necesitas estar cursando una carrera o ser profesional') },
  { name: 'Accordions item 02 updated', pass: html.includes('Encuentros mensuales personalizados y exclusivos para ayudarte a avanzar con claridad') },
  { name: 'Accordions item 03 specialties', pass: html.includes('Johanna Pérez Daza (Fotografía y comunicación)') },
  { name: 'Accordions item 06 removed', pass: !html.includes('Certificado digital de participación al finalizar el programa.') },
  { name: 'Format 6 months', pass: html.includes('<h3>6 meses</h3>') },
  { name: 'Format híbrido Madrid', pass: html.includes('Trabajando para lograr un formato híbrido con presencialidad en Madrid.') },
  { name: 'Format libre por 3 meses', pass: html.includes('Libre por 3 meses') },
  { name: 'Format 5th card Acompañamiento', pass: html.includes('Mensual y de 1h 30min') },
  { name: 'Alumni block Y CON EXALUMNOS', pass: html.includes('Y CON EXALUMNOS') },
  { name: 'Methodology manifest block', pass: html.includes('NO SOLO ES FORMACIÓN,') && html.includes('ASÍ SE DESARROLLA TU PROPIA VOZ CREATIVA') },
  { name: 'Raquel bio link to about', pass: html.includes('href="https://raquelcartayastudio.com/about/"') },
  { name: 'Pricing two tiers', pass: html.includes('99 €') && html.includes('550 € al contado') && html.includes('249 €') && html.includes('1.400 € al contado') },
  { name: 'Signup submit button', pass: html.includes('AÑÁDEME A LA LISTA') },
  { name: 'Signup success message', pass: html.includes('Estás en la lista de espera prioritaria de Voz Creativa') }
];

console.log('=== VERIFICATION AUDIT ===');
let allOk = true;
checks.forEach(c => {
  console.log((c.pass ? '[PASS] ' : '[FAIL] ') + c.name);
  if (!c.pass) allOk = false;
});

console.log('\nFinal Verdict:', allOk ? 'ALL CHECKS PASSED PERFECTLY' : 'SOME CHECKS FAILED');

