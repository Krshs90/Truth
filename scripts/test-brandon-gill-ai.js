const fetch = globalThis.fetch;

async function testBrandonGillQuery() {
  const resp = await fetch('http://127.0.0.1:5173/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Who is Brandon Gill and what district does he represent?',
      model: 'llama3.2:latest',
    }),
  });

  const data = await resp.json();
  console.log('AI Response for Brandon Gill:');
  console.log(data.response);
  console.log('\nSources returned:');
  console.log(data.sources);
}

testBrandonGillQuery().catch(console.error);
