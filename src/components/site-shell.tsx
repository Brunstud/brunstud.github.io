import Link from "next/link";
import { site } from "@/content/site";
export function Waterline() {
  return (
    <svg
      width="44"
      height="18"
      viewBox="0 0 44 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 5C8 0 14 10 21 5S34 0 43 5M8 13C15 8 21 18 28 13S37 10 43 12"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Shicheng Hu — home">
        <Waterline />
        <span>Shicheng Hu</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#research">Research</Link>
        <Link href="/#projects">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/cv">
          CV <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span className="footer-note">Agents, systems, and a little poetry.</span>
      <a href={`mailto:${site.email}`}>
        Get in touch <span aria-hidden="true">↗</span>
      </a>
    </footer>
  );
}
export function ContactLinks() {
  return (
    <div className="contact-links">
      <a href={`mailto:${site.email}`}>Email ↗</a>
      {(["github", "linkedin"] as const).map((key) =>
        site[key] ? (
          <a key={key} href={site[key]}>
            {key === "github" ? "GitHub" : "LinkedIn"} ↗
          </a>
        ) : (
          <span className="missing-link" key={key}>
            {key === "github" ? "GitHub" : "LinkedIn"}{" "}
            <small>(link forthcoming)</small>
          </span>
        ),
      )}
      <Link href="/cv">CV / Resume ↗</Link>
    </div>
  );
}
