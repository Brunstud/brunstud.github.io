"use client";
import { useState } from "react";
import Image from "next/image";
import { cvVersions } from "@/content/cv";
export function CVViewer() {
  const [selected, setSelected] = useState("cv");
  const current = cvVersions.find((version) => version.id === selected)!;
  return (
    <section aria-label="CV reader">
      <div className="cv-toolbar">
        <label htmlFor="cv-version">Document</label>
        <select
          id="cv-version"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
        >
          {cvVersions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.label}
            </option>
          ))}
        </select>
        <a href={current.file} download>
          Download {selected === "cv" ? "CV" : "research resume"} (PDF) ↓
        </a>
        <a href={current.file} target="_blank" rel="noreferrer">
          Open PDF ↗
        </a>
      </div>
      <p className="metadata" aria-live="polite">
        {current.label} · {current.pages.length}{" "}
        {current.pages.length === 1 ? "page" : "pages"}
      </p>
      <div className="cv-preview">
        {current.pages.map((src, index) => (
          <a
            key={src}
            href={`${current.file}#page=${index + 1}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${current.label}, page ${index + 1}, as PDF`}
          >
            <Image
              src={src}
              width={1191}
              height={1684}
              sizes="(max-width: 940px) 100vw, 880px"
              alt={`${current.label}, page ${index + 1}. Open the PDF to read or select the document text.`}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
