import Image from "next/image";
import Link from "next/link";
import { activities, photos, site } from "@/content/site";
import { PersonalParagraph } from "@/components/personal";
export const metadata = {
  title: "Life Beyond Research",
  description:
    "Rowing, dragon boat racing, game development, and classical Chinese poetry.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <article className="detail">
      <p className="eyebrow">Away from the screen</p>
      <h1>Life beyond research.</h1>
      <div className="lede">
        <PersonalParagraph />
      </div>
      <div className="prose">
        <h2>On the water</h2>
        <p>
          I row with <a href={activities.rowing}>Illini Rowing at UIUC</a>.
          Before coming to Illinois, I was a team leader on{" "}
          <a href={activities.dragonBoat}>
            Tongji University’s dragon boat team
          </a>
          , organizing training and competitions.
        </p>
        <p>
          Rowing and dragon boat racing are an important part of my life
          alongside research and engineering.
        </p>
        <h2>Worlds and words</h2>
        <p>
          I enjoy game development and interactive storytelling: another way to
          explore characters, behavior, and the worlds they inhabit. I also
          write classical Chinese poetry.
        </p>
        <p>
          <a href={site.itch}>Game development on itch.io ↗</a>
        </p>
        <p>
          <Link href="/poetry">
            Visit Poetry / <span lang="zh-Hans">诗稿</span> ↗
          </Link>
        </p>
        <h2>A few moments</h2>
      </div>
      {photos.length ? (
        <div className="photo-gallery">
          {photos.map((photo) => (
            <figure key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 600px) 100vw, 440px"
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="empty-gallery">
          Photographs from the water and elsewhere will find a home here.
        </p>
      )}
    </article>
  );
}
