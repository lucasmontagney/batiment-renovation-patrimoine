const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..', 'public', 'images')
const OUTPUT = path.join(__dirname, '..', 'lib', 'photos-manifest.json')

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i

function listLeafFolders(rootDir) {
  const result = {}

  function recurse(currentDir, relPath) {
    if (!fs.existsSync(currentDir)) return
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    const files = entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => e.name)
      .sort()
    if (files.length > 0) {
      result[relPath] = files
    }
    for (const sub of entries.filter((e) => e.isDirectory())) {
      const nextRel = relPath ? `${relPath}/${sub.name}` : sub.name
      recurse(path.join(currentDir, sub.name), nextRel)
    }
  }

  recurse(rootDir, '')
  return result
}

const manifest = listLeafFolders(ROOT)
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + '\n')

const total = Object.values(manifest).reduce((sum, arr) => sum + arr.length, 0)
console.log(`[photos-manifest] ${Object.keys(manifest).length} folders, ${total} photos -> lib/photos-manifest.json`)
