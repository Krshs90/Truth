const { evaluateNewsReport } = require('../server/devApiMiddleware');

const testCases = [
  {
    title: 'Governor Abbott Signs $18 Billion Property Tax Relief Legislation',
    expectedVerdict: 'Supported by evidence'
  },
  {
    title: 'Texas Senate Passes SB 4 Border Enforcement Act',
    expectedVerdict: 'Supported by evidence'
  },
  {
    title: 'Texas House Committee Strips School Vouchers from HB 1 in 84-63 Vote',
    expectedVerdict: 'Supported by evidence'
  },
  {
    title: 'Attorney General Ken Paxton Sues OpenAI Alleging Deceptive Trade Practices',
    expectedVerdict: 'Supported by evidence'
  },
  {
    title: 'Governor Abbott Slams Opponent in Campaign Rally Over Border Security Record',
    expectedVerdict: 'Misleading or missing important context'
  },
  {
    title: 'Abbott claims Hinojosa voted for Sharia law during education hearing',
    expectedVerdict: 'Misleading or missing important context'
  },
  {
    title: 'New UT/Texas Tribune Poll Shows Tight Statewide Race in Early 2026 Survey',
    expectedVerdict: 'Mostly supported'
  },
  {
    title: 'Baseless conspiracy that 2024 Texas election results were fabricated debunked by Secretary of State audit',
    expectedVerdict: 'Contradicted by available evidence'
  },
  {
    title: 'New Regional Transit Authority opens public survey on bus rapid transit in North Texas',
    expectedVerdict: 'Unchecked'
  }
];

let passed = 0;
for (const tc of testCases) {
  const res = evaluateNewsReport(tc.title);
  const ok = res.verdict === tc.expectedVerdict;
  if (ok) passed++;
  console.log(`[${ok ? 'PASS' : 'FAIL'}] "${tc.title}"`);
  console.log(`   -> Got: "${res.verdict}" (Expected: "${tc.expectedVerdict}")`);
  console.log(`   -> Explanation: ${res.explanation}\n`);
}

console.log(`Audit Summary: ${passed} / ${testCases.length} tests passed.`);
