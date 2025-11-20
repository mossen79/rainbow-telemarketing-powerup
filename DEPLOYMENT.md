# 🚀 Deployment Guide - Rainbow Telemarketing Power-Up

## Krok po kroku: Od kodu do działającego Power-Up

---

## 📦 1. Przygotowanie repozytorium GitHub

### A. Stwórz nowe repo na GitHubie

1. Idź na https://github.com
2. Kliknij **"New repository"**
3. Nazwa: `rainbow-telemarketing-powerup`
4. Opis: "Trello Power-Up - Dynamiczne skrypty rozmów telefonicznych"
5. **Public** (musi być public dla GitHub Pages)
6. ✅ Initialize with README: **NIE** (mamy już README)
7. Kliknij **"Create repository"**

### B. Push lokalnego kodu do GitHub

```bash
# W folderze rainbow-telemarketing-powerup na Desktop:
cd "C:\Users\mosse\OneDrive\Desktop\rainbow-telemarketing-powerup"

# Inicjalizuj Git
git init

# Dodaj remote
git remote add origin https://github.com/[TWOJ-USERNAME]/rainbow-telemarketing-powerup.git

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "Initial commit - Rainbow Telemarketing Power-Up v1.0"

# Push do GitHub
git push -u origin main
```

**Uwaga:** Jeśli Git prosi o branch "master" zamiast "main":
```bash
git branch -M main
git push -u origin main
```

---

## 🌐 2. Włączenie GitHub Pages

### A. Aktywuj GitHub Pages

1. Idź do swojego repo na GitHubie
2. Kliknij **"Settings"** (górny pasek)
3. W lewym menu → **"Pages"**
4. **Source**: Deploy from a branch
5. **Branch**: `main` / `(root)` → Save
6. Czekaj 2-3 minuty

### B. Sprawdź czy działa

Po 2-3 minutach:
- GitHub pokaże zielony banner: "Your site is live at https://[username].github.io/rainbow-telemarketing-powerup/"
- Otwórz ten URL w przeglądarce
- Powinieneś zobaczyć interface skryptu

**Test URL:**
```
https://[TWOJ-USERNAME].github.io/rainbow-telemarketing-powerup/index.html
```

---

## 🔌 3. Dodanie Power-Up do Trello

### A. Utwórz Custom Power-Up

1. Otwórz swoją tablicę Trello (np. Rainbow Leads)
2. Menu (prawy górny róg) → **Power-Ups**
3. Scroll w dół → **"Custom"** (na dole listy)
4. Kliknij **"+ Create new Custom Power-Up"**

### B. Konfiguracja Power-Up

**Formularz:**

- **Power-Up Name:** `Rainbow Telemarketing Scripts`
- **Manifest URL:**
  ```
  https://[TWOJ-USERNAME].github.io/rainbow-telemarketing-powerup/manifest.json
  ```
- **Email:** `[twoj-email@example.com]`

Kliknij **"Add"**

### C. Włącz Power-Up na tablicy

1. Po dodaniu, Power-Up pojawi się na liście
2. Kliknij przycisk **"Enable"** / **"Włącz"**
3. Gotowe!

---

## ✅ 4. Test Power-Up

### A. Sprawdź w karcie

1. Otwórz dowolną kartę na tablicy Trello
2. Po prawej stronie karty (w sekcji Power-Ups) powinien być przycisk:
   ```
   📞 Skrypt rozmowy
   ```
3. Kliknij przycisk
4. Powinno otworzyć się okno ze skryptem Rainbow

### B. Test funkcjonalności

- ✅ Tekst skryptu wyświetla się poprawnie?
- ✅ Przyciski odpowiedzi działają?
- ✅ Przechodzenie między krokami działa?
- ✅ Historia rozmowy pokazuje się?
- ✅ Przyciski "Cofnij" i "Zamknij" działają?

**Jeśli wszystko działa → SUCCESS! 🎉**

---

## 🔧 5. Aktualizacja skryptów (workflow)

### Workflow: Edycja → Commit → Push → Live

```bash
# 1. Edytuj plik skryptu lokalnie
notepad scripts/rainbow-odkurzacz.json

# 2. Zapisz zmiany

# 3. Commit + push do GitHub
git add scripts/rainbow-odkurzacz.json
git commit -m "Zaktualizowano skrypt Rainbow - dodano obiekcję X"
git push

# 4. Czekaj 1-2 minuty (GitHub Pages się zaktualizuje)

# 5. Odśwież Trello (Ctrl+F5)

# 6. Testuj nową wersję skryptu
```

**Pro tip:** Jeśli nie widzisz zmian od razu:
- Wyczyść cache Trello (Ctrl+Shift+R)
- Zamknij i otwórz ponownie kartę
- Sprawdź czy GitHub Pages się zaktualizowało (otwórz URL w inkognito)

---

## 🌿 6. Testowanie zmian (branching)

### Testuj nowe skrypty przed wdrożeniem

```bash
# Stwórz branch testowy
git checkout -b test-nowy-skrypt

# Edytuj skrypt
notepad scripts/rainbow-odkurzacz.json

# Commit
git add scripts/rainbow-odkurzacz.json
git commit -m "Test: nowa wersja skryptu"

# Push branch testowy
git push origin test-nowy-skrypt
```

**Testowanie:**
1. GitHub Pages → Settings → Pages → Branch: `test-nowy-skrypt`
2. Test URL: `https://[username].github.io/rainbow-telemarketing-powerup/`
3. Testuj skrypt
4. Jeśli OK:
   ```bash
   git checkout main
   git merge test-nowy-skrypt
   git push
   ```

---

## 🎯 7. Dodawanie nowej kampanii

### Przykład: Kampania "OZE Recruitment"

```bash
# 1. Skopiuj template
cp scripts/template.json scripts/oze-recruitment.json

# 2. Edytuj nowy plik
notepad scripts/oze-recruitment.json

# 3. Dodaj do selectora kampanii
notepad index.html

# Znajdź:
<select id="campaign-selector" style="display:none;">
  <option value="rainbow-odkurzacz">Odkurzacz Rainbow</option>
  <!-- DODAJ: -->
  <option value="oze-recruitment">Rekrutacja OZE</option>
</select>

# 4. Pokaż selector (usuń style="display:none;")
<select id="campaign-selector">

# 5. Commit + push
git add scripts/oze-recruitment.json index.html
git commit -m "Dodano kampanię: OZE Recruitment"
git push
```

---

## 📊 8. Monitorowanie użycia (opcjonalne)

### GitHub Analytics

- **Repo → Insights → Traffic**
  - Views (ile razy otwarto skrypt)
  - Clones (kto sklonował repo)

### Google Analytics (zaawansowane)

1. Dodaj do `index.html` (przed `</head>`):
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

2. Zarejestruj się na: https://analytics.google.com
3. Stwórz property dla Power-Up
4. Wklej tracking ID

---

## 🛠️ Troubleshooting

### Problem: Power-Up nie ładuje się

**Możliwe przyczyny:**
1. GitHub Pages nie włączony
   - Sprawdź: Settings → Pages → powinno być "Your site is live"
2. Manifest URL błędny
   - Sprawdź czy URL kończy się na `/manifest.json`
   - Otwórz URL w przeglądarce - powinien pokazać JSON
3. Manifest JSON niepoprawny
   - Sprawdź na: https://jsonlint.com/
4. Repo nie jest public
   - Settings → Danger Zone → Change visibility → Public

### Problem: Skrypt nie wyświetla się

**Debug:**
1. Otwórz Console w przeglądarce (F12)
2. Szukaj błędów (czerwone linie)
3. Sprawdź Network tab - czy pliki się ładują?

**Częste błędy:**
- `404 Not Found` → plik nie istnieje lub źle nazwany
- `JSON parse error` → błąd w składni JSON (sprawdź przecinki, nawiasy)
- `CORS error` → GitHub Pages musi być włączony

### Problem: Zmiany nie widoczne

**Rozwiązania:**
1. Wyczyść cache (Ctrl+Shift+R)
2. Tryb incognito (Ctrl+Shift+N)
3. Sprawdź czy GitHub Pages zaktualizował się:
   - Idź na repo → Actions → powinno być zielone ✓
4. Hard refresh w Trello (zamknij i otwórz ponownie)

---

## 🔒 Bezpieczeństwo

### ✅ Bezpieczne:
- Kod jest public (open source)
- Brak API keys
- Brak danych wrażliwych
- Read-only access do Trello (nie modyfikuje kart)

### ⚠️ NIE commituj:
- API keys
- Passwords
- Access tokens
- Danych klientów (RODO)
- Numerów telefon ów (poza przykładami)

### 🔐 Jeśli chcesz prywatny repo:

GitHub Pages dla private repo wymaga **GitHub Pro**.

**Alternatywy:**
1. **Netlify** (free for private repos)
2. **Vercel** (free for private repos)
3. **Cloudflare Pages** (free for private repos)

---

## 📞 Wsparcie

### Problemy z deploymentem?

1. **GitHub Issues** - zgłoś problem
2. **Trello Community** - https://community.atlassian.com/t5/Trello/ct-p/trello
3. **GitHub Pages Docs** - https://docs.github.com/pages

---

## 🎉 Gotowe!

Power-Up jest live i gotowy do użycia!

**Next steps:**
- [ ] Przetestuj z zespołem telemarketing
- [ ] Zbierz feedback
- [ ] Aktualizuj skrypty na podstawie nagrań
- [ ] Rozbuduj o nowe kampanie

**Happy calling! 📞**
