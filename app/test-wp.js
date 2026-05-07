
const query = `
    query GetHeaderFooterSettings {
      options {
        headerSetup {
          logo {
            node {
              sourceUrl
            }
          }
          phoneNumber
          email
          address
        }
      }
    }
  `;

async function testFetch() {
    console.log("Fetching...");
    const res = await fetch("https://cms.inhoangthinh.com.vn/graphql", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        cache: 'no-store',
    });
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
}

testFetch();
