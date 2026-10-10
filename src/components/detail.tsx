import Link from "next/link";
import Markdown from "react-markdown";
import Image from "next/image";
import type { Work } from "@/content/site";
import { Gallery } from "./gallery";
export function Detail({
  work,
  body,
  kind,
}: {
  work: Work;
  body: string;
  kind: "research" | "projects";
}) {
  return (
    <article className="detail">
      <Link className="back-link" href={`/#${kind}`}>
        ← Back to {kind}
      </Link>
      <p className="eyebrow">
        {kind} <span className="dot">/</span> {work.period}
      </p>
      <h1>{work.title}</h1>
      <p className="metadata">{work.metadata}</p>
      <p className="lede">{work.summary}</p>
      {work.links && (
        <div className="contact-links detail-links">
          {work.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
      {body.split(/(?=^## )/m).filter(section => section.trim()).map((section, index) => {
        const heading = section.split('\n')[0].replace(/^## /, '').trim();
        return <div key={index}>
        <div className="prose"><Markdown>{section}</Markdown></div>
        {work.figures?.filter(figure => figure.after === heading).map((figure) => (
            <figure className="editorial-figure" key={figure.src}>
              <a
                href={figure.full || figure.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full-size image: ${figure.alt}`}
              >
                <Image
                  src={figure.src}
                  alt={figure.alt}
                  width={figure.width}
                  height={figure.height}
                  sizes="(max-width: 800px) 100vw, 760px"
                />
              </a>
              <figcaption>{figure.caption}</figcaption>
            </figure>
          ))}
        {work.gallery?.after === heading && <Gallery label={work.gallery.label} images={work.gallery.images} />}
        </div>;
      })}
    </article>
  );
}
