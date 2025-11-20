# ⚡ QUICK START - 5 minut do działającego Power-Up

## 📋 Wymagania

- Konto GitHub
- Konto Trello
- Git zainstalowany lokalnie

---

## 🚀 Setup (5 kroków)

### 1️⃣ Stwórz GitHub repo (2 min)

```bash
# Przejdź do folderu projektu
cd "C:\Users\mosse\OneDrive\Desktop\rainbow-telemarketing-powerup"

# Inicjalizuj Git
git init
git add .
git commit -m "Initial commit"

# Stwórz repo na github.com (nazwa: rainbow-telemarketing-powerup)
# Potem:
git remote add origin https://github.com/[USERNAME]/rainbow-telemarketing-powerup.git
git branch -M main
git push -u origin main
```

### 2️⃣ Włącz GitHub Pages (1 min)

1. GitHub repo → **Settings** → **Pages**
2. Source: **main** branch, **(root)** folder
3. **Save**
4. Czekaj 2 minuty

### 3️⃣ Dodaj Power-Up do Trello (1 min)

1. Trello → Board → **Power-Ups**
2. Scroll w dół → **Custom**
3. **New Custom Power-Up**
4. Manifest URL:
   ```
   https://[USERNAME].github.io/rainbow-telemarketing-powerup/manifest.json
   ```
5. **Add** → **Enable**

### 4️⃣ Test (30 sek)

1. Otwórz kartę w Trello
2. Zobacz przycisk: **📞 Skrypt rozmowy**
3. Kliknij
4. Działa? ✅ SUCCESS!

### 5️⃣ Edytuj skrypt (1 min)

```bash
# Edytuj skrypt
notepad scripts/rainbow-odkurzacz.json

# Push zmian
git add scripts/rainbow-odkurzacz.json
git commit -m "Zaktualizowano skrypt"
git push

# Czekaj 1-2 min → odśwież Trello (Ctrl+F5)
```

---

## ✅ Gotowe!

**Power-Up działa. Teraz:**
- Dostosuj skrypt do swoich potrzeb
- Dodaj nowe kampanie (kopiuj `template.json`)
- Testuj z zespołem

---

## 📚 Więcej info

- [README.md](README.md) - Pełna dokumentacja
- [DEPLOYMENT.md](DEPLOYMENT.md) - Szczegółowy guide
- Przykładowy skrypt: `scripts/rainbow-odkurzacz.json`

---

**Happy calling! 📞**
