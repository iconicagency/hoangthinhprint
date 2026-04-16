const fs = require('fs');
const path = './app/page.tsx';
let code = fs.readFileSync(path, 'utf8');

const extractSection = (startMarker, endMarker) => {
  const startIndex = code.indexOf(startMarker);
  const endIndex = code.indexOf(endMarker, startIndex);
  if (startIndex === -1 || endIndex === -1) throw new Error(`Marker not found: ${startMarker}`);
  return code.substring(startIndex, endIndex);
};

const machinery = extractSection('      {/* Machinery */}', '      {/* Partners */}');
const partners = extractSection('      {/* Partners */}', '      {/* Portfolio / Projects */}');
const portfolio = extractSection('      {/* Portfolio / Projects */}', '      {/* Video Section */}');
const video = extractSection('      {/* Video Section */}', '      {/* Process Section */}');
const process = extractSection('      {/* Process Section */}', '      {/* Testimonials */}');
const testimonials = extractSection('      {/* Testimonials */}', '      {/* Overlapping Quote Form */}');

const beforeMachinery = code.substring(0, code.indexOf('      {/* Machinery */}'));
const afterTestimonials = code.substring(code.indexOf('      {/* Overlapping Quote Form */}'));

const newCode = beforeMachinery + process + portfolio + machinery + partners + video + testimonials + afterTestimonials;

fs.writeFileSync(path, newCode);
console.log('Reordered successfully');
