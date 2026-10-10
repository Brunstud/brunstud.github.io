import { Gallery } from "@/components/gallery";
import media from "@/content/media.json";
import Link from "next/link";
import { activities, site } from "@/content/site";
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
        <h2>Life on the Water</h2>
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
        <h3>Rowing · Illinois</h3>
        <Gallery label="Rowing" images={[media["rowing-crew"], media["rowing-sunset"]]} />
        <h3>Dragon boat · Tongji</h3>
        <Gallery label="Dragon boat" images={[media["dragon-1"], media["dragon-2"], media["dragon-3"], media["dragon-4"], media["dragon-5"], media["dragon-6"], media["dragon-7"], media["dragon-8"], media["dragon-9"]]} />
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
      </div>
    </article>
  );
}
