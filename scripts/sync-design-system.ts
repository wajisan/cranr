// Synchronise tokens, polices, favicon et icônes depuis https://design.wajitech.fr
// Usage : bun run sync:ds   (fichiers générés : ne pas les éditer à la main)
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

const ORIGIN = 'https://design.wajitech.fr';

async function fetchText(path: string): Promise<string> {
  const response = await fetch(`${ORIGIN}/${path}`);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.text();
}

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(`${ORIGIN}/${path}`);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

async function save(target: string, data: string | Uint8Array) {
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, data);
  console.log('écrit', target);
}

const tokens = await fetchText('tokens/tokens.css');
await save('src/shared/design-system/tokens.css', tokens);

const fonts = await fetchText('css/fonts.css');
const fontFiles = [...fonts.matchAll(/url\("\.\.\/fonts\/([^"]+)"\)/g)].map((match) => match[1]);
await save('src/shared/design-system/fonts.css', fonts.replaceAll('../fonts/', '/fonts/'));
for (const file of fontFiles) await save(`public/fonts/${file}`, await fetchBytes(`fonts/${file}`));

await save('public/favicon.svg', await fetchText('favicon/favicon.svg'));

// Icônes d'app : PNG générés depuis wajitech-app-icon.svg (nécessite rsvg-convert)
const appIcon = await fetchText('logos/svg/wajitech-app-icon.svg');
const square = appIcon.replace(' rx="14"', '');
const maskable = square.replace(
  /(<path[\s\S]*<\/svg>)/,
  '<g transform="translate(6.4 6.4) scale(0.8)">$1',
).replace('</svg>', '</g></svg>');
const sizes: [string, string, number][] = [
  ['public/pwa-192.png', appIcon, 192],
  ['public/pwa-512.png', appIcon, 512],
  ['public/pwa-maskable-512.png', maskable, 512],
  ['public/apple-touch-icon.png', square, 180],
];
for (const [target, svg, size] of sizes) {
  const result = spawnSync('rsvg-convert', ['-w', String(size), '-h', String(size), '-o', target], { input: svg });
  if (result.status !== 0) throw new Error(`rsvg-convert a échoué pour ${target}`);
  console.log('écrit', target);
}
