import { site } from "@/content/site";
import { CVViewer } from "@/components/cv-viewer";
export const metadata = {
  title: "CV / Resume",
  description:
    "Education, research, and engineering background of Shicheng Hu.",
  alternates: { canonical: "/cv" },
};
export default function CV() {
  return (
    <article className="detail cv-page">
      <p className="eyebrow">Curriculum vitae</p>
      <h1>Shicheng Hu</h1>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <CVViewer />
      <div className="prose">
        <h2>Education</h2>
        <div className="cv-entry">
          <h3>University of Illinois Urbana-Champaign</h3>
          <p>Master of Computer Science · Expected May 2028</p>
        </div>
        <div className="cv-entry">
          <h3>Tongji University</h3>
          <p>B.E. in Computer Science and Technology · July 2026</p>
        </div>
        <h2>Research & engineering</h2>
        <p>
          My work spans white-box audits of LLM unlearning, computational
          properties of behavioral simulation, and interactive multi-agent
          systems. Previously, I worked on autonomous-driving AI, path planning,
          and automated testing as a System AI Engineer Intern at NIO.
        </p>
        <p>
          The downloadable CV includes research contributions, selected
          projects, and detailed employment experience.
        </p>
      </div>
    </article>
  );
}
