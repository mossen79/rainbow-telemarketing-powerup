# 📞 Rainbow Telemarketing Scripts - Trello Power-Up

**Ultra prosty skrypt rozmów telefonicznych dla telemarketerów.**

Integracja z Trello - jeden przycisk w karcie leada otwiera dynamiczny skrypt rozmowy.

---

## 🎯 Dla kogo?

✅ **Dla telemarketerów** - prosty interface, duże przyciski, żadnych komplikacji
✅ **Dla managerów** - łatwa edycja skryptów, rozbudowa w miarę potrzeb
✅ **Dla firm** - zero kosztów, hosting na GitHub Pages (darmowy)

---

## 🚀 Instalacja (3 kroki)

### 1. Upload na GitHub Pages

```bash
# Stwórz nowe repo na GitHubie: rainbow-telemarketing-powerup
# Upload wszystkich plików z tego folderu
# Włącz GitHub Pages w Settings → Pages → Source: main branch
```

### 2. Dodaj Power-Up w Trello

1. Otwórz swoją tablicę Trello
2. Menu → Power-Ups → Custom
3. New Power-Up
4. Wklej link: `https://[twoj-username].github.io/rainbow-telemarketing-powerup/manifest.json`
5. Kliknij Add

### 3. Gotowe! 🎉

Teraz w każdej karcie będzie przycisk: **📞 Skrypt rozmowy**

---

## 📝 Jak używać (dla telemarketerów)

1. **Otwórz kartę leada** w Trello
2. **Kliknij przycisk** "📞 Skrypt rozmowy"
3. **Czytaj tekst** z sekcji "POWIEDZ:"
4. **Klikaj odpowiedzi** klienta
5. **Skrypt prowadzi Cię** przez całą rozmowę
6. **Zamknij okno** gdy skończysz

**TYLE. Nic więcej.**

---

## ✏️ Jak edytować skrypty

### Struktura plików:

```
scripts/
  ├── rainbow-odkurzacz.json    ← Aktywny skrypt Rainbow
  ├── oze-recruitment.json       ← Dodaj nowe kampanie tutaj
  └── template.json              ← Kopiuj ten plik dla nowych skryptów
```

### Edycja skryptu:

1. **Otwórz plik** `scripts/rainbow-odkurzacz.json`
2. **Znajdź krok** który chcesz zmienić (np. "start")
3. **Edytuj tekst** w polu `"say"`
4. **Dodaj/usuń odpowiedzi** w `"responses"`
5. **Zapisz plik**
6. **Commit + push** do GitHub
7. **GitHub Pages zaktualizuje automatycznie** (1-2 minuty)

### Przykład edycji:

**PRZED:**
```json
"start": {
  "say": "Dzień dobry, dzwonię z Rainbow System.",
  "responses": [
    { "label": "Słucham", "next": "intro" }
  ]
}
```

**PO:**
```json
"start": {
  "say": "Cześć! Dzwonię w sprawie Rainbow. Masz 5 minut?",
  "responses": [
    { "label": "Tak", "next": "intro" },
    { "label": "Nie", "next": "callback" }
  ]
}
```

---

## 🌳 Jak działa drzewo odpowiedzi?

Każdy krok ma:
- **`"say"`** - tekst do powiedzenia
- **`"responses"`** - przyciski z odpowiedziami
  - **`"label"`** - tekst na przycisku
  - **`"next"`** - ID następnego kroku (lub `null` = koniec)

### Schemat:

```
start
  ├─ "Tak" → intro
  ├─ "Nie" → objection
  └─ "Później" → callback

intro
  ├─ "Interesuje" → booking
  └─ "Nie interesuje" → end

booking
  └─ "Umówiono" → null (KONIEC)
```

### Przykład kompletnego kroku:

```json
{
  "intro": {
    "name": "Wprowadzenie",
    "say": "Oferujemy darmową prezentację odkurzacza Rainbow.\n\nCzy Pani/Pana interesuje?",
    "responses": [
      {
        "label": "Tak, interesuje",
        "next": "booking"
      },
      {
        "label": "Nie, dziękuję",
        "next": "end_not_interested"
      },
      {
        "label": "Proszę oddzwonić później",
        "next": "callback"
      }
    ]
  }
}
```

---

## 🔧 Dodawanie nowej kampanii

### 1. Skopiuj template:

```bash
cp scripts/template.json scripts/nowa-kampania.json
```

### 2. Edytuj plik:

- Zmień `"name"` i `"description"`
- Dodaj swoje kroki
- Zdefiniuj drzewo odpowiedzi

### 3. Dodaj do selectora (opcjonalnie):

W pliku `index.html` znajdź:

```html
<select id="campaign-selector">
  <option value="rainbow-odkurzacz">Odkurzacz Rainbow</option>
  <!-- DODAJ TUTAJ: -->
  <option value="nowa-kampania">Nowa Kampania</option>
</select>
```

### 4. Push do GitHub:

```bash
git add scripts/nowa-kampania.json index.html
git commit -m "Dodano nową kampanię"
git push
```

---

## 📊 Przykładowe skrypty

### Rainbow Odkurzacz (gotowy)
- ✅ Powitanie + weryfikacja osoby
- ✅ Pitch (pełny i krótki)
- ✅ Umawianie prezentacji (różne terminy)
- ✅ Obiekcje (cena, czas, nie interesuje)
- ✅ Callback scheduling
- ✅ Końcowe outcomes (umówiono, nie zainteresowany, oddzwonić)

**~15 kroków, ~6 końcowych outcomes**

---

## 🎨 Customizacja wyglądu

Edytuj `styles.css` jeśli chcesz zmienić:
- Kolory przycisków
- Rozmiar czcionki
- Layout

**Przykład:** Większe przyciski dla seniorów:

```css
.response-btn {
  padding: 25px 30px;  /* Zwiększ padding */
  font-size: 20px;     /* Większa czcionka */
}
```

---

## 🔮 Przyszłe funkcje (TODO)

- [ ] **Przełącznik kampanii** - dropdown w Power-Up
- [ ] **Auto-save outcome** - zapisywanie wyniku do custom field w Trello
- [ ] **Statystyki** - dashboard z conversion rate
- [ ] **Audio prompts** - text-to-speech dla telemarketerów
- [ ] **Keyboard shortcuts** - 1,2,3,4 zamiast klikać
- [ ] **Multi-language** - angielski, niemiecki, itp.

---

## 💡 Wskazówki

### Dla telemarketerów:
- **Czytaj naturalnie** - skrypt to wskazówki, nie regulamin
- **Używaj przycisku cofnij** (←) jeśli źle klikniesz
- **Historia rozmowy** pokazuje co już było powiedziane

### Dla managerów:
- **Aktualizuj skrypty** na podstawie nagrań rozmów
- **Testuj nowe wersje** przed wdrożeniem (branch w Git)
- **Zbieraj feedback** od zespołu
- **Analizuj outcomes** - które ścieżki działają najlepiej

---

## 🆘 Troubleshooting

### Power-Up nie ładuje się
- Sprawdź czy GitHub Pages jest włączone
- Sprawdź URL manifestu (powinien być HTTPS)
- Sprawdź Console w przeglądarce (F12)

### Skrypt nie wyświetla się
- Sprawdź czy plik JSON jest poprawny (użyj JSONLint.com)
- Sprawdź nazwę pliku (musi być taka jak w `script-engine.js`)
- Wyczyść cache przeglądarki (Ctrl+F5)

### Przyciski nie działają
- Sprawdź czy `"next"` wskazuje na istniejący krok
- Sprawdź Console w przeglądarce (F12) - szukaj błędów
- Upewnij się że wszystkie `responses` mają `"label"` i `"next"`

---

## 📞 Support

Pytania? Problemy?

- **GitHub Issues**: [Link do repo]/issues
- **Email**: [twoj-email]
- **Trello**: [link do tablicy support]

---

## 📄 Licencja

MIT License - użyj jak chcesz, edytuj, rozbudowuj.

---

**Zbudowane z ❤️ dla Rainbow System Telemarketing Team**

**Wersja:** 1.0
**Data:** 2025-11-20
