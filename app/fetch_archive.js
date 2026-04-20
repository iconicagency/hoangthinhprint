const https = require('https');
const cheerio = require('cheerio');

https.get('https://web.archive.org/web/20240823152609/https://hoangthinhprint.com.vn/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);
    const texts = [];
    
    // get title, metadata, headings, paragraphs
    $('h1, h2, h3, h4, p, a, span.text, div.content').each((i, el) => {
        const text = $(el).text().replace(/\s+/g, ' ').trim();
        if (text.length > 20) {
            texts.push(text);
        }
    });
    
    console.log(Array.from(new Set(texts)).join('\n'));
  });
}).on('error', (e) => {
  console.error(e);
});
