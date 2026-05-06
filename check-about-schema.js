const wpUrl = "https://cms.inhoangthinh.com.vn/graphql";

async function check() {
  const query = `
    query IntrospectionQuery {
      __type(name: "Page") {
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
  const json = await res.json();
  console.log(json.data.__type.fields.map(f => f.name).filter(n => n.toLowerCase().includes('gioi') || n.toLowerCase().includes('about')));
}
check();
