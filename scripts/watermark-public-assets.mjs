import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const ffmpeg = join(root, ".codex-tools", "node_modules", "ffmpeg-static", "ffmpeg.exe");
const backupRoot = join(root, "asset-originals", "noirvision-watermark-backup");
const outputRoot = join(root, "public", "watermarked");
const tempRoot = join(root, ".watermark-temp");
const fontFile = "C\\:/Windows/Fonts/arialbd.ttf";
const watermarkFilter = [
  `drawtext=fontfile='${fontFile}'`,
  "text='NoirVision'",
  "fontcolor=white@0.70",
  "box=1",
  "boxcolor=black@0.26",
  "boxborderw=10",
  "fontsize=max(20\\,min(w\\,h)/24)",
  "x=(w-text_w)/2",
  "y=(h*0.78)-text_h/2"
].join(":");

const videoFiles = [
  "public/videos/FItnerdUGCMain.mp4",
  "public/videos/kiko_conturing.mp4",
  "public/videos/BR10fr3000$.mp4",
  "public/videos/patagonia(final).mp4",
  "public/videos/hf_20260422_123112_b6aff012-f93f-48cf-ba4f-e9e4204785f0.mp4",
  "public/pack1winfreebonusENG/1W welcomebonus(1).mp4",
  "public/pack1winfreebonusENG/openart-77283007ebbe215edc0bad4445dbbd03-de15e8c3-5852-4a74-8b31-0857106c1218_1777928543456_eb5b4ea4.mp4"
];

const imageRoots = [
  "public/landing/landimage",
  "public/pack1winfreebonusENG"
];

function walkImages(dir) {
  const absoluteDir = join(root, dir);
  if (!existsSync(absoluteDir)) {
    return [];
  }

  return readdirSync(absoluteDir, { withFileTypes: true }).flatMap((entry) => {
    const child = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === "hooks") {
        return [];
      }
      return walkImages(child);
    }

    if (!entry.isFile()) {
      return [];
    }

    return /\.(jpe?g|png|webp)$/i.test(entry.name) ? [child] : [];
  });
}

const imageFiles = imageRoots.flatMap(walkImages);
const files = [...videoFiles, ...imageFiles].filter((file, index, list) => list.indexOf(file) === index);

function ensureParent(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function runFfmpeg(args, label) {
  const result = spawnSync(ffmpeg, args, { stdio: "inherit" });

  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${label}`);
  }
}

function backupSource(relativePath) {
  const source = join(root, relativePath);
  const backup = join(backupRoot, relativePath);

  if (!existsSync(source) && !existsSync(backup)) {
    console.warn(`Skipping missing file: ${relativePath}`);
    return null;
  }

  if (!existsSync(backup)) {
    ensureParent(backup);
    copyFileSync(source, backup);
  }

  return backup;
}

mkdirSync(tempRoot, { recursive: true });

for (const relativePath of files) {
  const original = backupSource(relativePath);

  if (!original) {
    continue;
  }

  const target = join(outputRoot, relativePath.replace(/^public[\\/]/, ""));
  const ext = extname(relativePath).toLowerCase();
  const temp = join(tempRoot, relativePath);
  ensureParent(temp);
  ensureParent(target);

  console.log(`Watermarking ${relative(root, target)}`);

  if (ext === ".mp4") {
    runFfmpeg(
      [
        "-y",
        "-i",
        original,
        "-vf",
        watermarkFilter,
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "20",
        "-c:a",
        "copy",
        "-movflags",
        "+faststart",
        temp
      ],
      relativePath
    );
  } else {
    runFfmpeg(["-y", "-i", original, "-vf", watermarkFilter, "-frames:v", "1", temp], relativePath);
  }

  copyFileSync(temp, target);
  try {
    rmSync(temp, { force: true });
  } catch {
    // Windows can keep ffmpeg outputs locked briefly; temp cleanup is best-effort.
  }
}

try {
  rmSync(tempRoot, { recursive: true, force: true });
} catch {
  // Best-effort cleanup; generated public files and backups are already complete.
}
console.log(`Done. Original files are backed up in ${relative(root, backupRoot)}`);
