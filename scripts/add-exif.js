/**
 * Embed copyright EXIF/IPTC metadata in art and photography assets.
 * Run before deploy and whenever new images are added: npm run exif
 */

const fs = require('fs')
const path = require('path')
const { exiftool } = require('exiftool-vendored')

const ROOT = path.join(__dirname, '..')
const IMAGE_DIRS = [
  path.join(ROOT, 'public', 'art'),
  path.join(ROOT, 'public', 'photography'),
]

const ARTIST = 'Lauren Yip'
const SITE = 'laurenyip.com'
const RIGHTS_URL = `https://${SITE}/rights`
const YEAR = new Date().getFullYear()

const METADATA = {
  Artist: ARTIST,
  Copyright: `© ${ARTIST} ${YEAR}. All rights reserved. Protected under the Copyright Act of Canada.`,
  ImageDescription: `Original artwork by ${ARTIST}. ${SITE}`,
  WebStatement: RIGHTS_URL,
  CopyrightInfoURL: RIGHTS_URL,
}

function collectImages(dir, results = []) {
  if (!fs.existsSync(dir)) {
    console.warn(`Skipping missing directory: ${path.relative(ROOT, dir)}`)
    return results
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      collectImages(fullPath, results)
      continue
    }

    if (/\.(jpe?g|png)$/i.test(entry.name)) {
      results.push(fullPath)
    }
  }

  return results
}

async function main() {
  const files = IMAGE_DIRS.flatMap((dir) => collectImages(dir)).sort()

  if (files.length === 0) {
    console.log('No .jpg or .png files found in public/art or public/photography.')
    await exiftool.end()
    return
  }

  console.log(`Writing EXIF to ${files.length} file(s)…\n`)

  for (const file of files) {
    await exiftool.write(file, METADATA, ['-overwrite_original'])
    console.log(`Processed: ${path.relative(ROOT, file)}`)
  }

  console.log(`\nDone. Updated ${files.length} file(s).`)
  await exiftool.end()
}

main().catch(async (err) => {
  console.error(err)
  try {
    await exiftool.end()
  } catch {
    // ignore cleanup errors
  }
  process.exit(1)
})
