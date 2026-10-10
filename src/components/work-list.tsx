import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/content/site";
export function WorkList({
  items,
  kind,
}: {
  items: Work[];
  kind: "research" | "projects";
}) {
  return (
    <ol className="work-list">
      {items.map((item) => (
        <li key={item.slug} className="work-row">
          <div className="work-aside"><span className="work-year">{item.period}</span>
            {item.thumbnail && <Image className="work-thumbnail" src={item.thumbnail.src} alt={item.thumbnail.alt} width={item.thumbnail.width} height={item.thumbnail.height} sizes="140px" />}
          </div>
          <article>
            <h3>
              {item.externalUrl ? (
                <a href={item.externalUrl}>{item.title}</a>
              ) : (
                <Link href={`/${kind}/${item.slug}`}>{item.title}</Link>
              )}
            </h3>
            <p className="metadata">{item.metadata}</p>
            <p className="work-summary">{item.summary}</p>
            {item.topics && <p className="topics">{item.topics}</p>}
            <div className="work-links">
              {!item.externalUrl && (
                <Link href={`/${kind}/${item.slug}`}>
                  {kind === "research" ? "Research notes" : "Project details"}{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
              {item.links?.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label} ↗
                </a>
              ))}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
