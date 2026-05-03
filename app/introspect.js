const wpUrl = "https://cms.inhoangthinh.com.vn/graphql";

async function run() {
  const query = `
    {
      __type(name: "Thongtinduan") {
        fields {
          name
        }
      }
    }
  `;
  const res = await fetch(wpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

run();
