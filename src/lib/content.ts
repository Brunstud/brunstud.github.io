import fs from "node:fs/promises";
import path from "node:path";
import entries from "@/content/poems.json";
export type Poem = {
  slug: string;
  title: string;
  englishTitle: string;
  byline?: string;
  englishByline?: string;
  date?: string;
  lines: { zh: string; en: string; stanza: number }[];
  notes?: string;
};
export const poems: Poem[] = entries;
export async function readNote(kind: "research" | "projects", slug: string) {
  return fs.readFile(
    path.join(process.cwd(), "src/content", kind, `${slug}.md`),
    "utf8",
  );
}
