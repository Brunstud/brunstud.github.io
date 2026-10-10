'use client';
import { useState } from 'react';
import Image from 'next/image';
export type MediaImage = { src: string; width: number; height: number; alt: string; caption: string; full?: string };
export function Gallery({ images, label }: { images: MediaImage[]; label: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index];
  const move = (delta: number) => setIndex(i => (i + delta + images.length) % images.length);
  return <section className="manual-gallery" aria-label={label} aria-roledescription="carousel" tabIndex={0}
    onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if(event.key === 'Home') { event.preventDefault(); setIndex(0); } if(event.key === 'End') { event.preventDefault(); setIndex(images.length-1); } }}>
    <figure><a className="gallery-stage" href={current.full || current.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${current.alt}`}><Image key={current.src} src={current.src} width={current.width} height={current.height} alt={current.alt} sizes="(max-width: 800px) 100vw, 760px" /></a><figcaption aria-live="polite" aria-atomic="true">{current.caption}</figcaption></figure>
    <div className="gallery-controls"><button type="button" onClick={() => move(-1)} aria-label={`Previous image in ${label}`}>←</button><span>{String(index+1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}</span><button type="button" onClick={() => move(1)} aria-label={`Next image in ${label}`}>→</button></div>
  </section>;
}
