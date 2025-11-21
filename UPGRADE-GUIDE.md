# 🔄 Upgrade Guide: v1.0 → v1.1

## Szybki upgrade (2 minuty)

### Krok 1: Pull latest changes

```bash
cd rainbow-telemarketing-powerup
git pull origin main
```

### Krok 2: Create config.js

**Opcja A: Skopiuj template**
```bash
cp config.js.example config.js
```

**Opcja B: Stwórz ręcznie**
```javascript
// config.js
const CONFIG = {
    TRELLO_APP_KEY: 'YOUR_API_KEY_HERE', // Wklej swój klucz
    APP_NAME: 'Rainbow Telemarketing Scripts',
    APP_VERSION: '1.1.0',
    FEATURES: {
        SAVE_TO_TRELLO: true,
        KEYBOARD_SHORTCUTS: true,
        MULTI_CAMPAIGN: false
    }
};
```

### Krok 3: Get your Trello API Key

1. Idź na: https://trello.com/app-key
2. Skopiuj "Key" (nie Secret!)
3. Wklej do `config.js` jako `TRELLO_APP_KEY`

### Krok 4: Deploy

**GitHub Pages:**
```bash
# Commit wszystkie zmiany (NIE commituj config.js!)
git add .
git commit -m "Upgrade to v1.1.0 - Security fixes"
git push

# Upload config.js RĘCZNIE przez GitHub web interface:
# Repository → Add file → Upload files → wybierz config.js
# (lub użyj git z personal access token)
```

**Manual Upload (FTP/SFTP):**
- Upload wszystkich plików INCLUDING config.js
- Upewnij się że `config.js` jest w root directory

### Krok 5: Test

1. Otwórz Power-Up w Trello
2. Kliknij "Skrypt rozmowy"
3. Sprawdź czy działa
4. Na końcu rozmowy sprawdź czy komentarz zapisuje się w Trello

**✅ Gotowe!**

---

## Co się zmieniło?

### 🔒 Security
- API key teraz w `config.js` (nie hardcoded)
- Lepsze zabezpieczenie przed wyciekami

### ✨ New Features
- Notyfikacje (success/error/warning)
- Lepsza walidacja daty (nie można wybrać przeszłości)
- Limit 3 miesięcy dla terminów
- Fallback UI gdy zapis do Trello fails

### 🐛 Bug Fixes
- Naprawiony icon path w manifest
- Lepsze error messages
- Zastąpiono `alert()` na notyfikacje

---

## Breaking Changes

**BRAK** - wersja 1.1 jest w pełni backwards compatible.

Jeśli nie stworzysz `config.js`, app użyje fallback API key (development mode).

---

## Troubleshooting

### Problem: "CONFIG is not defined"

**Rozwiązanie:**
- Sprawdź czy `config.js` istnieje w root directory
- Sprawdź czy `<script src="./config.js"></script>` jest w HTML
- Wyczyść cache (Ctrl+F5)

### Problem: "Unauthorized" error when saving to Trello

**Rozwiązanie:**
1. Sprawdź czy API key jest poprawny (skopiuj ponownie z https://trello.com/app-key)
2. Sprawdź czy nie ma spacji przed/po kluczu w `config.js`
3. Zweryfikuj czy Power-Up ma uprawnienia "read,write"

### Problem: Notyfikacje się nie pokazują

**Rozwiązanie:**
- Sprawdź Console (F12) - szukaj błędów CSS
- Wyczyść cache przeglądarki
- Sprawdź czy `styles.css` jest załadowany (Network tab)

---

## Rollback (jeśli coś pójdzie nie tak)

```bash
# Wróć do v1.0
git checkout v1.0.0

# Lub commit hash
git checkout <previous-commit-hash>

# Push (TYLKO jeśli musisz)
git push origin main --force
```

---

## FAQ

### Q: Czy muszę zmienić coś w Trello?
**A:** Nie. Power-Up pozostaje ten sam (ten sam manifest URL).

### Q: Czy stare dane/komentarze zostaną?
**A:** Tak. Upgrade nie dotyka zapisanych danych.

### Q: Czy mogę używać starej wersji (1.0)?
**A:** Tak, ale zalecamy upgrade ze względu na security fixes.

### Q: Ile to zajmie?
**A:** 2-5 minut (większość czasu to kopiowanie API key).

---

## Potrzebujesz pomocy?

- 📚 [README-SECURITY.md](README-SECURITY.md) - Security guidelines
- 📋 [CHANGELOG.md](CHANGELOG.md) - Wszystkie zmiany
- 🐛 [GitHub Issues](https://github.com/mossen79/rainbow-telemarketing-powerup/issues)

---

**Ostatnia aktualizacja:** 2025-11-21  
**Dotyczy wersji:** 1.0.0 → 1.1.0


