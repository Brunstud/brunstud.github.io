import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
const routes = [
  "/",
  "/about",
  "/cv",
  "/poetry",
  "/research/organized-complexity",
  "/poetry/tong-zhou-xing",
  "/poetry/yan-ren-yin",
  "/poetry/ba-wang-bie-ji",
  "/projects/innbook",
  "/projects/fluid-simulation",
];
test("all pages, local links, anchors, PDF, metadata, and missing routes", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const links = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.title()).toContain("Shicheng Hu");
    expect(await page.locator("body").innerText()).not.toMatch(
      /217-390|81-Instruction|RTOS/,
    );
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((el) => el.getAttribute("href")!),
      )) {
      if (!href.startsWith("mailto:") && !href.startsWith("http"))
        links.add(new URL(href, `http://127.0.0.1:3100${route}`).href);
    }
  }
  for (const href of links) {
    const url = new URL(href);
    expect((await request.get(url.pathname)).status(), href).toBe(200);
    if (url.hash && !url.pathname.endsWith(".pdf")) {
      await page.goto(href);
      await expect(page.locator(url.hash)).toHaveCount(1);
    }
  }
  const pdf = await request.get("/shicheng-hu-cv.pdf");
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  expect((await request.get("/poetry/not-a-real-poem")).status()).toBe(404);
  expect((await request.get("/research/not-a-real-paper")).status()).toBe(404);
  for (const slug of ["private-information-unlearning", "aerospace-paradigms"])
    expect((await request.get(`/research/${slug}`)).status()).toBe(404);
  expect(
    (await request.get("/opengraph-image")).headers()["content-type"],
  ).toContain("image/png");
  expect(errors).toEqual([]);
});
for (const width of [1440, 390, 320]) {
  test(`responsive layout and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    fs.mkdirSync("qa", { recursive: true });
    for (const route of [
      "/",
      "/about",
      "/poetry",
      "/projects/innbook",
      "/projects/fluid-simulation",
      "/poetry/yan-ren-yin",
      "/cv",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations, `${route} at ${width}px`).toEqual([]);
      if (width !== 320)
        await page.screenshot({
          path: `qa/${route === "/" ? "home" : route.replaceAll("/", "-")}-${width}.png`,
          fullPage: true,
        });
    }
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Projects" })
      .click();
    await expect(page).toHaveURL(/#projects$/);
    await page
      .getByRole("heading", { name: "InnBook", exact: true })
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(/\/projects\/innbook$/);
  });
}

test("poems have paired translations; CV switching, downloads, and project images work", async ({
  page,
  request,
}) => {
  for (const [slug, count] of [
    ["tong-zhou-xing", 70],
    ["yan-ren-yin", 22],
    ["ba-wang-bie-ji", 52],
  ] as const) {
    await page.goto(`/poetry/${slug}`);
    await expect(page.locator(".poem-original")).toHaveCount(count);
    await expect(page.locator(".poem-translation")).toHaveCount(count);
    for (const line of await page
      .locator(".poem-translation")
      .allTextContents())
      expect(line.trim().length).toBeGreaterThan(0);
  }
  await page.goto("/cv");
  await expect(page.getByLabel("Document")).toHaveValue("cv");
  await expect(
    page.getByRole("link", { name: "Download CV (PDF)" }),
  ).toHaveAttribute("href", "/cv/CV-Shicheng-Hu.pdf");
  await expect(page.locator(".cv-preview img")).toHaveCount(1);
  await page.getByLabel("Document").selectOption("research");
  await expect(page.locator(".cv-preview img")).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Open PDF", exact: false }),
  ).toHaveAttribute("href", "/cv/Resume-Shicheng-Hu-Research.pdf");
  const downloadEvent = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Download research resume (PDF)" })
    .click();
  expect((await downloadEvent).suggestedFilename()).toBe(
    "Resume-Shicheng-Hu-Research.pdf",
  );
  for (const file of [
    "/cv/CV-Shicheng-Hu.pdf",
    "/cv/Resume-Shicheng-Hu-Research.pdf",
  ]) {
    const response = await request.get(file);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
  }
  for (const slug of ["innbook", "fluid-simulation"]) {
    await page.goto(`/projects/${slug}`);
    await expect(page.locator(".project-figures img")).toHaveCount(2);
    for (const image of await page.locator(".project-figures img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
  }
  await page.goto("/");
  await expect(
    page
      .locator('a[href="https://brunstud.github.io/fpi-unlearning/"]')
      .first(),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://doi.org/10.1093/nsr/nwaf122"]').first(),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://illinirowing.com/"]'),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://sports.tongji.edu.cn/info/1046/3102.htm"]'),
  ).toBeVisible();
});
