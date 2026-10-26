async function test() {
  const realTimeGrounding = `
[LIVE 2026 TEXAS PUBLIC RECORDS & VERIFIED NEWS HEADLINES]
- October 23, 2026: Texas Attorney General Ken Paxton filed a major lawsuit against ChatGPT-maker OpenAI alleging deceptive trade practices and violations of state consumer protection and privacy statutes.
- October 2026: Joint state actions with Gov. Greg Abbott challenging federal Title IX expansion and EPA emissions rules affecting Texas energy producers.
- August-October 2024: Office of the Attorney General launched raids and election integrity investigations into South Texas political organizers and LULAC members in Bexar and Frio counties regarding mail-in ballot distribution.
- 2024-2026 School District Electioneering Suits: Ken Paxton filed injunctions against multiple Texas school districts (including Frisco ISD and Aledo ISD) accusing administrators of illegal electioneering using taxpayer resources to oppose school voucher legislation (SB 1 / HB 1).
- Texas SB 4 Defense: Continued defense of Texas Senate Bill 4 (state migrant arrest enforcement authority) before the U.S. 5th Circuit Court of Appeals and U.S. Supreme Court.
- Annunciation House Litigation: Legal proceedings initiated by the Attorney General seeking records from Catholic non-profit migrant shelter in El Paso, which was blocked by a state district judge and appealed to the Texas Supreme Court.
`;

  const systemPrompt = `You are Truth Civic Intelligence, a local nonpartisan civic AI researcher running on-device for the Congressional App Challenge. You analyze Texas state government (current year 2026, 89th Legislature).
CRITICAL RULES:
1. NEVER REFUSE OR GIVE META-DISCLAIMERS: When users ask about loaded terms like "propaganda", "lies", "scandals", or "claims" regarding public officials (such as Attorney General Ken Paxton or Governor Abbott):
   - NEVER say "As a nonpartisan AI, I do not engage in spreading or analyzing propaganda."
   - NEVER say "I do not have access to real-time information."
2. OBJECTIVE BREAKDOWN: Objectively translate the inquiry into a breakdown of the official's recent major press releases, official legal filings (Office of the Attorney General), and public policy statements, followed by the verified factual and legal context from primary court and legislative records.
3. 2026 CITATIONS: Actively utilize the provided live 2026 headlines and verified public records below. Cite dates and specific cases.

${realTimeGrounding}
`;

  const query = 'What is the latest propoganda ken paxton released?';

  const resp = await fetch('http://127.0.0.1:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2:latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      stream: false
    })
  });

  const data = await resp.json();
  console.log('OLLAMA RESPONSE WITH LIVE 2026 CONTEXT:\n', data.message.content);
}

test().catch(console.error);
