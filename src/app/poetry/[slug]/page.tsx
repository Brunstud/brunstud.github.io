import Link from "next/link";
import Image from "next/image";
import media from "@/content/media.json";
import { notFound } from "next/navigation";
import { poems } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() {
  return poems.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: poems.find((p) => p.slug === slug)?.title,
    alternates: { canonical: `/poetry/${slug}` },
  };
}
export default async function Poem({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = poems.find((p) => p.slug === slug);
  if (!poem) notFound();
  return (
    <article className="detail">
      <Link className="back-link" href="/poetry">
        ← Poetry / 诗稿
      </Link>
      <div className={slug === "tong-zhou-xing" ? "poem-title-with-print" : undefined}>
      {slug === "tong-zhou-xing" && <figure className="poem-print"><a href={media["poetry-print"].full}><Image src={media["poetry-print"].src} width={media["poetry-print"].width} height={media["poetry-print"].height} alt={media["poetry-print"].alt} sizes="(max-width: 600px) 105px, 200px" /></a><figcaption>{media["poetry-print"].caption}</figcaption></figure>}
      <div>
      <h1 className="poetry-chinese" lang="zh-Hans">
        {poem.title}
      </h1>
      <p className="poem-english-title">{poem.englishTitle}</p>
      {poem.byline && (
        <p className="metadata">
          <span lang="zh-Hans">{poem.byline}</span>
          <br />
          {poem.englishByline}
        </p>
      )}
      <p className="translation-note">
        Original Chinese with an English reading translation.
      </p>
      {poem.date && (
        <time className="metadata" dateTime={poem.date}>
          {poem.date}
        </time>
      )}
      </div>
      </div>

      <div className="poem-body bilingual-poem">
        {poem.lines.map((line, index) => (
          <div
            key={index}
            className={`poem-line ${index > 0 && line.stanza !== poem.lines[index - 1].stanza ? "new-stanza" : ""}`}
          >
            {poem.slug === "yan-ren-yin" && index === 17 && (
              <h2 className="poem-subheading">
                <span lang="zh-Hans">补叙</span> <small>Afterword</small>
              </h2>
            )}
            <p lang="zh-Hans" className="poem-original">
              {line.zh}
            </p>
            <p lang="en" className="poem-translation">
              {line.en}
            </p>
          </div>
        ))}
      </div>
      {poem.notes && (
        <aside className="poem-notes">
          <h2>Notes</h2>
          <p>{poem.notes}</p>
        </aside>
      )}
    </article>
  );
}
