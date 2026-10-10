import Link from "next/link";
import { poems } from "@/lib/content";
import { Waterline } from "@/components/site-shell";
export const metadata = {
  title: "Poetry / 诗稿",
  description: "A quiet corner for classical Chinese poetry by Shicheng Hu.",
  alternates: { canonical: "/poetry" },
};
export default function Poetry() {
  return (
    <section className="detail poetry-index">
      <Link className="back-link" href="/about">
        ← Life beyond research
      </Link>
      <p className="eyebrow">A quiet corner</p>
      <h1>
        Poetry{" "}
        <span className="poetry-chinese" lang="zh-Hans">
          / 诗稿
        </span>
      </h1>
      <p className="lede">
        Classical Chinese poetry, with room for a few notes in English.
      </p>
      {poems.length ? (
        <ol className="poem-list">
          {poems.map((poem) => (
            <li key={poem.slug}>
              <div>
                <Link href={`/poetry/${poem.slug}`} lang="zh-Hans">
                  {poem.title}
                </Link>
                <p className="metadata poem-index-subtitle">
                  {poem.englishTitle}
                </p>
              </div>
              {poem.date && <time dateTime={poem.date}>{poem.date}</time>}
            </li>
          ))}
        </ol>
      ) : (
        <div className="poetry-empty">
          <Waterline />
          <p>No poems published here yet.</p>
          <p className="metadata">A space for words, in their own time.</p>
        </div>
      )}
    </section>
  );
}
