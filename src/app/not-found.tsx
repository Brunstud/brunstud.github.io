import Link from "next/link";
export default function NotFound() {
  return (
    <section className="detail">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p className="lede">
        This page may have moved, or hasn’t been written yet.
      </p>
      <Link href="/">← Back to the homepage</Link>
    </section>
  );
}
