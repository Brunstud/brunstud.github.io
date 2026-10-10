export const RHYTHM_TIME_ZONE = 'America/Chicago';
export const phases = [
  { id: 'morning', label: 'Morning · Rowing', time: '04:30–08:30', start: 270, end: 510 },
  { id: 'daytime', label: 'Daytime · Research', time: '08:30–16:30', start: 510, end: 990 },
  { id: 'evening', label: 'Evening · Creating Worlds', time: '16:30–22:30', start: 990, end: 1350 },
  { id: 'night', label: 'Night · Sleeping', time: '22:30–04:30', start: 1350, end: 270 },
] as const;
const clock = new Intl.DateTimeFormat('en-US', { timeZone: RHYTHM_TIME_ZONE, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
export function getDailyRhythm(date: Date) {
  const parts = clock.formatToParts(date);
  const hour = Number(parts.find(part => part.type === 'hour')!.value);
  const minute = Number(parts.find(part => part.type === 'minute')!.value);
  const total = hour * 60 + minute;
  const phase = phases.find(p => p.start < p.end ? total >= p.start && total < p.end : total >= p.start || total < p.end)!;
  return { phase, time: `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}` };
}
