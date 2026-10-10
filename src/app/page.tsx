import Link from "next/link";
import { ContactLinks } from "@/components/site-shell";
import { WorkList } from "@/components/work-list";
import { site, research, projects } from "@/content/site";
import { PersonalParagraph } from "@/components/personal";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="introduction" aria-labelledby="name">
        <p className="eyebrow">
          Computer science · University of Illinois Urbana-Champaign
        </p>
        <h1 id="name">
          Shicheng Hu<span className="name-period">.</span>
        </h1>
        <p className="tagline">{site.tagline}</p>
        <div className="biography">
          {site.biography.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ContactLinks />
      </section>
      <section id="research" className="home-section">
        <div className="section-heading">
          <h2>Research</h2>
          <span>Selected work</span>
        </div>
        <WorkList items={research} kind="research" />
      </section>
      <section id="projects" className="home-section">
        <div className="section-heading">
          <h2>Projects</h2>
          <span>Systems I’ve built</span>
        </div>
        <WorkList items={projects} kind="projects" />
      </section>
      <section className="personal-section">
        <h2>A little more about me</h2>
        <PersonalParagraph />
        <div className="contact-links">
          <Link href="/about">Life Beyond Research ↗</Link>
          <Link href="/poetry">
            Poetry / <span lang="zh-Hans">诗稿</span> ↗
          </Link>
        </div>
      </section>
    </>
  );
}
