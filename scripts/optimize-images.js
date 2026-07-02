const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..', 'public', 'images')
const MAX_WIDTH = 1920
const QUALITY = 82
const RASTER_EXT = /\.(jpe?g|png)$/i

function formatBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (RASTER_EXT.test(entry.name)) files.push(full)
  }
  return files
}

async function convertToWebp(inputPath, stats) {
  const outputPath = inputPath.replace(RASTER_EXT, '.webp')
  const originalSize = fs.statSync(inputPath).size

  const image = sharp(inputPath, { failOn: 'none' })
  const metadata = await image.metadata()
  const targetWidth = metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width

  const tempPath = outputPath + '.tmp'
  await image
    .rotate() // honour EXIF orientation
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(tempPath)

  const newSize = fs.statSync(tempPath).size

  // If webp turned out heavier than the original (rare, tiny files) — bail
  if (newSize >= originalSize && inputPath === outputPath.replace(/\.webp$/, path.extname(inputPath))) {
    fs.unlinkSync(tempPath)
    stats.skipped += 1
    stats.skippedBytes += originalSize
    console.log(`  skip  ${path.relative(ROOT, inputPath)} — webp not smaller`)
    return
  }

  // Replace: delete original, move temp into place
  if (inputPath !== outputPath) fs.unlinkSync(inputPath)
  fs.renameSync(tempPath, outputPath)

  const savedBytes = originalSize - newSize
  stats.converted += 1
  stats.beforeBytes += originalSize
  stats.afterBytes += newSize
  console.log(
    `  ok    ${path.relative(ROOT, outputPath)}  ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savedBytes > 0 ? `-${Math.round((savedBytes / originalSize) * 100)}%` : `+${Math.round((-savedBytes / originalSize) * 100)}%`})`,
  )
}

async function main() {
  const files = walk(ROOT)
  if (files.length === 0) {
    console.log('[optimize-images] no raster images found under public/images/')
    return
  }
  const stats = { converted: 0, skipped: 0, beforeBytes: 0, afterBytes: 0, skippedBytes: 0 }
  console.log(`[optimize-images] processing ${files.length} images (max ${MAX_WIDTH}px, quality ${QUALITY})…`)
  for (const f of files) {
    try {
      await convertToWebp(f, stats)
    } catch (e) {
      console.error(`  fail  ${path.relative(ROOT, f)} — ${e.message}`)
    }
  }
  const totalBefore = stats.beforeBytes + stats.skippedBytes
  const totalAfter = stats.afterBytes + stats.skippedBytes
  const saved = totalBefore - totalAfter
  console.log('')
  console.log(`[optimize-images] converted ${stats.converted}, skipped ${stats.skipped}`)
  console.log(`[optimize-images] ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (saved ${formatBytes(saved)}, ${Math.round((saved / totalBefore) * 100)}%)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
