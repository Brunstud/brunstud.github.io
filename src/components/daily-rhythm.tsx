'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getDailyRhythm, phases } from '@/lib/daily-rhythm';
import { RhythmIcon } from './rhythm-icon';

export function DailyRhythm() {
  const pathname = usePathname();
  const [now, setNow] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const pinned = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (pathname !== '/') return;
    let timer: ReturnType<typeof setTimeout>;
    function update() {
      clearTimeout(timer);
      setNow(new Date());
      timer = setTimeout(update, 60000 - Date.now() % 60000);
    }
    timer = setTimeout(update, 0);
    document.addEventListener('visibilitychange', update);
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', update); };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); pinned.current = false; }
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  if (pathname !== '/') return null;
  const rhythm = now ? getDailyRhythm(now) : null;
  function close() { pinned.current = false; setOpen(false); }
  return <div className="daily-rhythm" ref={root}
    onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
    onPointerLeave={() => { if (!pinned.current && !root.current?.contains(document.activeElement)) setOpen(false); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}
    onKeyDown={event => { if (event.key === 'Escape') { close(); trigger.current?.focus(); } }}>
    <button ref={trigger} className="rhythm-trigger" type="button" aria-expanded={open} aria-controls={id}
      aria-label={`Typical daily rhythm: ${rhythm?.phase.label ?? 'Central Time'}`}
      onClick={() => { pinned.current = !pinned.current; setOpen(pinned.current); }}>
      <RhythmIcon phase={rhythm?.phase.id ?? 'night'} />
      <span>{rhythm?.phase.label ?? 'Daily rhythm · Central'}</span>
    </button>
    <div id={id} hidden={!open} className="rhythm-popover" role="region" aria-label="My Daily Rhythm">
      <div className="rhythm-heading"><h2>My Daily Rhythm</h2><button type="button" aria-label="Close daily rhythm" onClick={() => { close(); trigger.current?.focus(); }}>×</button></div>
      <p className="metadata"><time dateTime={now?.toISOString()}>{rhythm?.time ?? '—'}</time> · Central Time</p>
      <ol>{phases.map(phase => <li key={phase.id} aria-current={rhythm?.phase.id === phase.id ? 'true' : undefined}><span>{phase.time}</span><span className="rhythm-phase-label"><RhythmIcon phase={phase.id} />{phase.label}</span></li>)}</ol>
      <p className="rhythm-note">What moves with the water at dawn, seeks the mind by day, shapes worlds at dusk, and dreams beneath the stars?</p>
    </div>
  </div>;
}
