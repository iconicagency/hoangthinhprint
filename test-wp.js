const query = `
  query GetPages {
    pages {
      nodes {
        title
        slug
      }
    }
  }
`;

fetch('https://cms.inhoangthinh.com.vn/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
