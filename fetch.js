const https = require('https');

https.get('https://web.archive.org/web/20240823152609/https://hoangthinhprint.com.vn/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Basic regex extraction for texts
    const tags = data.match(/<[^>]+>([^<]+)<\/[^>]+>/g);
    if (!tags) return console.log("No tags found");
    const texts = tags.map(t => t.replace(/<[^>]+>/g, '').trim()).filter(t => t.length > 20);
    console.log(Array.from(new Set(texts)).slice(0, 30).join('\n'));
  });
}).on('error', (e) => {
  console.error(e);
});
