import media from "./media.json";
import type { MediaImage } from "@/components/gallery";
export const site = {
  name: "Shicheng Hu",
  email: "shu40@illinois.edu",
  tagline: "Exploring intelligent agents, human behavior, and complex systems.",
  description:
    "Shicheng Hu is a Master of Computer Science student at UIUC working on agentic AI, human behavior simulation, and trustworthy language models.",
  github: "https://github.com/Brunstud",
  linkedin: "https://www.linkedin.com/in/shicheng-hu-78737342b/",
  itch: "https://brunstud.itch.io/",
  biography: [
    "I’m a Master of Computer Science student at the University of Illinois Urbana-Champaign, with an expected graduation in May 2028. I received my B.E. in Computer Science and Technology from Tongji University in July 2026.",
    "My interests lie in agentic AI, human behavior simulation, and the collective behavior of multi-agent systems. I’m particularly interested in building interactive intelligent systems and understanding when language-model agents can reliably represent people and complex environments. My research also explores trustworthy and controllable LLMs, including audits of model unlearning.",
    "Previously, I was a System AI Engineer Intern at NIO, working on autonomous-driving AI systems, path planning, and automated model testing.",
  ],
};
export type Work = {
  slug: string;
  title: string;
  period: string;
  metadata: string;
  summary: string;
  topics?: string;
  externalUrl?: string;
  thumbnail?: MediaImage;
  figures?: (MediaImage & { after: string })[];
  gallery?: { after: string; label: string; images: MediaImage[] };
  links?: { label: string; href: string }[];
};
export const research: Work[] = [
  {
    slug: "private-information-unlearning",
    thumbnail: media["fpi-thumb"],
    title:
      "On the Recoverability of Private Information Unlearning in Large Language Models",
    period: "2025–2026",
    metadata:
      "arXiv preprint · Research with Prof. Yongyi Mao, University of Ottawa",
    summary:
      "A white-box audit of LLM unlearning, using a synthetic private-information dataset and RIG decoding to evaluate whether supposedly forgotten information remains recoverable.",
    externalUrl: "https://brunstud.github.io/fpi-unlearning/",
    links: [
      {
        label: "Project website",
        href: "https://brunstud.github.io/fpi-unlearning/",
      },
    ],
  },
  {
    slug: "organized-complexity",
    thumbnail: media["simulation-thumb"],
    figures: [
      { ...media.paradigms, after: "Motivation" },
      { ...media.simulation, after: "A behavioral simulation framework" },
      { ...media["tricolor-exp"], after: "Evaluation" },
    ],
    title: "Computational Properties of Organized Complexity Simulation",
    period: "2025–2026",
    metadata:
      "Independent research · Supervised by Prof. Cheng Wang, Tongji University",
    summary:
      "Exploring the computational foundations of behavioral simulation, with a theoretical framework and LLM-based multi-agent modeling.",
  },
  {
    slug: "aerospace-paradigms",
    thumbnail: media["aerospace-thumb"],
    title: "Future Scientific Paradigms in Aerospace Systems",
    period: "2024",
    metadata: "National Science Report · Published perspective · Third author",
    summary:
      "An interdisciplinary perspective on scientific paradigms, data-driven aerospace systems, smart materials, and future aerospace technologies.",
    externalUrl: "https://doi.org/10.1093/nsr/nwaf122",
    links: [
      { label: "Paper · DOI", href: "https://doi.org/10.1093/nsr/nwaf122" },
    ],
  },
];
export const projects: Work[] = [
  {
    slug: "innbook",
    thumbnail: media["innbook-play-thumb"],
    title: "InnBook",
    period: "2025",
    metadata: "LLM-powered multi-agent creative interaction platform",
    summary:
      "A modular agent architecture for interactive storytelling. Hierarchical prompting, scene orchestration, and turn-based scheduling coordinate agents with distinct behaviors as narratives unfold.",
    topics:
      "LLM inference / Multi-agent orchestration / Interactive narratives",
    figures: [
      { ...media["innbook-play"], after: "From writing a story to inhabiting one" },
      { ...media["innbook-tree"], after: "Keeping the author in control" },
    ],
  },
  {
    slug: "fluid-simulation",
    thumbnail: media["fluid-scene-thumb"],
    title: "Offline Ray-Traced Fluid Simulation",
    period: "2024",
    metadata: "Computer graphics & physical simulation",
    summary:
      "A team-built C++ / OpenGL renderer combining APIC fluids, rigid bodies, and path tracing. My work focused on fluid–scene integration, buoyancy, and synchronizing simulation, physics, and offline rendering.",
    topics: "C++ / OpenGL / APIC / Ray tracing",
    links: [
      { label: "Code", href: "https://github.com/yuehuarulian/Tongji-24-GL" },
    ],
    figures: [
      { ...media["fluid-scene"], after: "A small room, a coupled system" },
      { ...media["fluid-mesh"], after: "My contribution: integrating APIC fluids" },
      { ...media["fluid-render"], after: "Buoyancy and thread synchronization" },
      { ...media["fluid-light"], after: "Buoyancy and thread synchronization" },
    ],
  },
  {
    slug: "steins-gate",
    title: "Worldline Knot · 命运石扭结",
    period: "Personal",
    metadata: "Steins;Gate-inspired mini-game · FPGA / Verilog",
    summary: "A hardware game about two characters moving through opposing timelines. Physical input, worldline state, and VGA graphics turn a time-travel idea into a digital system.",
    topics: "Game design / State machines / Digital logic",
    thumbnail: media["steins-play-thumb"],
    figures: [
      { ...media["steins-play"], after: "A meeting across worldlines" },
      { ...media["steins-viewpoint"], after: "On the VGA display" },
      { ...media["steins-meeting"], after: "On the VGA display" },
      { src: "/media/worldline-system.svg", width: 900, height: 340, alt: "Input feeds game state, which drives VGA, LED, and digit displays", caption: "Conceptual architecture based on the project documentation and Verilog top-level module; not a gameplay screenshot.", after: "From interaction to hardware" },
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Brunstud/SteinsGate0" }],
  },
];
export const personal =
  "Outside research and coding, I row with Illini Rowing at UIUC and previously served as a team leader on Tongji University’s dragon boat team. I also enjoy game development, interactive storytelling, and writing classical Chinese poetry.";
export type Photo = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
export const photos: Photo[] = [];
export const activities = {
  rowing: "https://illinirowing.com/",
  dragonBoat: "https://sports.tongji.edu.cn/info/1046/3102.htm",
};
