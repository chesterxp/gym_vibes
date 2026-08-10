// Generuje grafikę PNG z pliku HTML przy pomocy lokalnie zainstalowanej przeglądarki (Chrome/Edge).
// Użycie: node scripts/poster/generate-poster.js <plik.html> <wyjscie.png> [--selector=#poster] [--width=1200] [--scale=2]
import { existsSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { preview } from 'vite';

const projectRoot = path.resolve('.');
const distRoot = path.resolve(projectRoot, 'dist');

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter(Boolean);

  const found = candidates.find((candidatePath) => existsSync(candidatePath));
  if (!found) {
    throw new Error(
      'Nie znaleziono przeglądarki Chrome/Edge w typowych lokalizacjach. Ustaw zmienną środowiskową CHROME_PATH ze ścieżką do chrome.exe/msedge.exe.'
    );
  }
  return found;
}

function parseArgs(argv) {
  const [inputPath, outputPath, ...rest] = argv;
  if (!inputPath || !outputPath) {
    console.error(
      'Użycie: node scripts/poster/generate-poster.js <plik.html> <wyjscie.png> [--selector=#poster] [--width=1200] [--scale=2]'
    );
    process.exit(1);
  }

  const options = { selector: '#poster', width: 1200, scale: 2 };
  for (const arg of rest) {
    const [rawKey, rawValue] = arg.replace(/^--/, '').split('=');
    if (rawKey === 'selector') options.selector = rawValue;
    if (rawKey === 'width') options.width = Number(rawValue);
    if (rawKey === 'scale') options.scale = Number(rawValue);
  }
  return { inputPath, outputPath, options };
}

async function main() {
  const { inputPath, outputPath, options } = parseArgs(process.argv.slice(2));
  const resolvedInput = path.resolve(inputPath);
  const resolvedOutput = path.resolve(outputPath);

  if (!existsSync(resolvedInput)) {
    throw new Error(`Nie znaleziono pliku wejściowego: ${resolvedInput}`);
  }

  // Pliki zbudowane przez Vite mają atrybut crossorigin na <script type="module">
  // i <link rel="stylesheet">. Chrome traktuje żądania crossorigin do zasobów
  // file:// jako pochodzące z opaque/null origin i blokuje ich wczytanie, więc
  // strona wygląda na niestylowaną. Dlatego pliki z dist/ serwujemy przez
  // tymczasowy serwer `vite preview`, a nie otwieramy bezpośrednio z dysku.
  const isFromDist = !path.relative(distRoot, resolvedInput).startsWith('..');
  let previewServer = null;

  const browser = await puppeteer.launch({
    executablePath: findBrowser(),
    headless: 'new',
    args: [`--force-device-scale-factor=${options.scale}`, '--hide-scrollbars'],
  });

  try {
    let targetUrl;
    if (isFromDist) {
      previewServer = await preview({ root: projectRoot, preview: { port: 0 } });
      const relativePath = path.relative(distRoot, resolvedInput).replace(/\\/g, '/');
      targetUrl = new URL(relativePath, previewServer.resolvedUrls.local[0]).toString();
    } else {
      targetUrl = 'file://' + resolvedInput.replace(/\\/g, '/');
    }

    const page = await browser.newPage();
    await page.setViewport({ width: options.width, height: 800, deviceScaleFactor: options.scale });

    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    const target = options.selector ? await page.$(options.selector) : null;
    if (target) {
      await target.screenshot({ path: resolvedOutput });
    } else {
      await page.screenshot({ path: resolvedOutput, fullPage: true });
    }

    console.log(`Zapisano grafikę: ${resolvedOutput}`);
  } finally {
    await browser.close();
    if (previewServer) {
      await new Promise((resolveClose) => previewServer.httpServer.close(resolveClose));
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
