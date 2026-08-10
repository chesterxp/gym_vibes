# gym_vibes
Gym Vibes WEB

## Generowanie grafiki (PNG) z pliku HTML

Projekt zawiera skrypt do zamiany dowolnego pliku HTML (np. plakatu z planem treningowym) na grafikę PNG,
przy pomocy lokalnie zainstalowanej przeglądarki Chrome/Edge.

### 1. Przygotuj plik HTML

- Stwórz samodzielny plik `.html` (własne `<style>` w środku, bez zależności od bundlera).
- Całą treść, która ma się znaleźć na grafice, opakuj w jeden element z `id="poster"` — tylko ten fragment
  zostanie sfotografowany (reszta strony, np. `<body>`, jest ignorowana).
- Ustaw stałą szerokość kontenera (np. `width: 1200px`), wysokość dobierze się sama do treści.
- Trzymaj się kolorystyki marki ze `src/tailwind.css` / `src/style.scss`: tło `#000000`, akcent teal `#44b8b1`,
  akcent purpurowy `#6408b8`, tekst `#ffffff` / `#d1d5db` / `#9ca3af`, czcionka `Inter`.
- Gotowy przykład (plan treningowy) znajdziesz w [`scripts/poster/plan2.html`](scripts/poster/plan2.html) — najłatwiej skopiować go i podmienić treść.

### 2. Uruchom generowanie

```bash
npm run poster:generate -- <plik-wejsciowy.html> <plik-wyjsciowy.png>
```

Przykład:

```bash
npm run poster:generate -- scripts/poster/plan2.html public/documents/pdf/Plan_treningowy2.png
```

Opcjonalne flagi (po ścieżkach, każda jako osobny argument):

- `--selector=#poster` — selektor CSS elementu do sfotografowania (domyślnie `#poster`; gdy nie zostanie
  znaleziony, robiony jest zrzut całej strony).
- `--width=1200` — szerokość viewportu w pikselach (domyślnie `1200`, powinna odpowiadać szerokości z HTML).
- `--scale=2` — mnożnik rozdzielczości / gęstości pikseli (domyślnie `2`, czyli grafika w jakości Retina).

### Wymagania

Skrypt korzysta z lokalnie zainstalowanego Chrome lub Edge (nie pobiera własnej przeglądarki). Standardowe
ścieżki instalacji na Windows/macOS/Linux są wykrywane automatycznie. Jeśli przeglądarka jest w innym miejscu,
ustaw zmienną środowiskową `CHROME_PATH` ze ścieżką do pliku wykonywalnego.
