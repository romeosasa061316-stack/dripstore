import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const dir = "public/images";
const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const f of files) {
  const out = path.join(dir, f.replace(/\.(png|jpe?g)$/i, ".webp"));
  await sharp(path.join(dir, f))
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log("done", f);
}