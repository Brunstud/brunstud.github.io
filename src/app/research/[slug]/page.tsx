import { notFound } from "next/navigation";
import { research } from "@/content/site";
import { readNote } from "@/lib/content";
import { Detail } from "@/components/detail";
export const dynamicParams = false;
export function generateStaticParams() {
  return research.filter((w) => !w.externalUrl).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = research.find((w) => w.slug === slug);
  return {
    title: work?.title,
    description: work?.summary,
    alternates: { canonical: `/research/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = research.find((w) => w.slug === slug);
  if (!work || work.externalUrl) notFound();
  return (
    <Detail
      work={work}
      kind="research"
      body={await readNote("research", slug)}
    />
  );
}
