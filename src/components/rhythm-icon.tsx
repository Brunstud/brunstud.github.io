export function RhythmIcon({ phase }: { phase: string }) {
  return <svg className="rhythm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {phase === 'morning' ? <><path d="M3 16h18l-3 4H7zM8 8l8 9M6 5l3 3-2 2-3-3zM3 22q3-2 6 0t6 0t6 0"/><circle cx="16" cy="6" r="3"/><path d="M16 1v1M21 6h1"/></>
      : phase === 'daytime' ? <><path d="M3 5q5-2 9 1 4-3 9-1v14q-5-2-9 1-4-3-9-1zM12 6v14M6 9h3M15 9h3"/><path d="M8 14h.01M16 14h.01M10 16q2 2 4 0"/></>
      : phase === 'evening' ? <><path d="m5 21 10-10M14 3l1.7 4.3L20 9l-4.3 1.7L14 15l-1.7-4.3L8 9l4.3-1.7zM5 3v4M3 5h4M20 17v4M18 19h4"/></>
      : <><path d="M17 3a9 9 0 1 0 4 14A9 9 0 0 1 17 3Z"/><path d="m18 5 1 2 2 1-2 1-1 2-1-2-2-1 2-1zM8 14q1 2 3 1"/></>}
  </svg>;
}
