import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { readNote } from "@/lib/content";
import { Detail } from "@/components/detail";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = projects.find((w) => w.slug === slug);
  return {
    title: work?.title,
    description: work?.summary,
    alternates: { canonical: `/projects/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = projects.find((w) => w.slug === slug);
  if (!work) notFound();
  return (
    <Detail
      work={work}
      kind="projects"
      body={await readNote("projects", slug)}
    />
  );
}
