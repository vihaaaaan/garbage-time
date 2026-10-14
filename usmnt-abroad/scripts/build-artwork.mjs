import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "artwork", "source");
const heroSourceDir = path.join(sourceDir, "hero-moments");
const brandOutputDir = path.join(root, "public", "brand");
const heroOutputDir = path.join(root, "public", "hero");

await Promise.all([
  mkdir(brandOutputDir, { recursive: true }),
  mkdir(heroOutputDir, { recursive: true }),
]);

const heroMoments = [
  {
    input: "supporters-2026.jpg",
    output: "supporters-2026.webp",
    crop: { left: 0, top: 100, width: 1920, height: 1080 },
  },
  {
    input: "tunnel-2026.jpg",
    output: "tunnel-2026.webp",
    crop: { left: 0, top: 100, width: 1920, height: 1080 },
  },
  {
    input: "weah-2026.jpg",
    output: "weah-2026.webp",
    crop: { left: 0, top: 300, width: 1280, height: 720 },
  },
  {
    input: "balogun-2026.jpg",
    output: "balogun-2026.webp",
    crop: { left: 0, top: 300, width: 1280, height: 720 },
  },
];

async function buildLogo() {
  await copyFile(
    path.join(sourceDir, "usmnt-crest.svg"),
    path.join(brandOutputDir, "usmnt-crest.svg"),
  );
}

async function buildHeroMoments() {
  await Promise.all(
    heroMoments.map(({ input, output, crop }) =>
      sharp(path.join(heroSourceDir, input))
        .extract(crop)
        .resize(1920, 1080, { fit: "cover", kernel: "lanczos3" })
        .webp({ quality: 84, smartSubsample: true })
        .toFile(path.join(heroOutputDir, output)),
    ),
  );
}

await Promise.all([buildLogo(), buildHeroMoments()]);
console.log("Built vector crest and hero moments.");
