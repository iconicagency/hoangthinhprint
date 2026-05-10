async function run() {
  try {
    const res = await fetch('https://cms.inhoangthinh.com.vn/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __schema { queryType { name } } }' })
    });
    console.log('Status:', res.status);
    console.log('Headers:', res.headers);
    const text = await res.text();
    console.log('Response:', text.substring(0, 200));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
run();
