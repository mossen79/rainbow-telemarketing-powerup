# Changelog - Rainbow Telemarketing Power-Up

## [1.2.0] - 2025-11-21

### ✨ MAJOR NEW FEATURES - Automatyzacja Trello

#### Automatyczne Akcje Po Zakończeniu Rozmowy:

**Umówiono prezentację:**
- ✅ Dodaje etykietę "Umówiono" (zielona)
- ✅ Ustawia due date na datę spotkania
- ✅ Przenosi kartę na listę "Termin spotkania"
- ✅ Zapisuje historię rozmowy w komentarzu

**Oddzwoń w innym terminie:**
- ✅ Dodaje etykietę "W innym terminie" (żółta)
- ✅ Ustawia due date na datę callback
- ✅ Przenosi kartę na listę "Do oddzwonienia"
- ✅ Zapisuje historię rozmowy

**Brak zainteresowania / Zły numer:**
- ✅ Dodaje odpowiednią etykietę (czerwona/czarna)
- ✅ Przenosi kartę na listę "Stracony lead"
- ✅ Zapisuje historię rozmowy

**Ma już Rainbow:**
- ✅ Dodaje etykietę "Ma już Rainbow" (niebieska)
- ✅ Konfigurowalny target list
- ✅ Zapisuje historię

### 📦 Nowe Pliki

- **trello-actions-config.js** - Konfiguracja akcji (listy, etykiety, mapowanie)
- **trello-automation.js** - Engine automatyzacji Trello
- **TRELLO-SETUP-GUIDE.md** - Szczegółowa instrukcja konfiguracji

### 🔧 Zmiany Techniczne

- Refactor `saveConversationToTrello` → `executeAutomation`
- Dodano `TrelloAutomation` class z metodami:
  - `addLabel()` - dodawanie etykiet
  - `setDueDate()` - ustawianie terminów
  - `moveCard()` - przenoszenie między listami
  - `addComment()` - zapisywanie historii
- Dodano `formatActionsResult()` - wyświetlanie wykonanych akcji
- Loading state podczas zapisywania

### 🎨 UI Improvements

- Pokazuje "⏳ Zapisywanie..." podczas akcji
- Lista wykonanych akcji po zakończeniu
- Lepszy feedback dla użytkownika

### ⚙️ Konfiguracja

Plik `trello-actions-config.js` pozwala na:
- Mapowanie ID list Trello
- Definiowanie nazw etykiet
- Włączanie/wyłączanie poszczególnych funkcji
- Customizację akcji dla każdego outcome

### 🐛 Bug Fixes

- Naprawiono problem z nie zapisującymi się komentarzami
- Poprawiono error handling dla Trello API
- Dodano szczegółowe logi błędów

### 📝 Dokumentacja

- Nowy **TRELLO-SETUP-GUIDE.md** - step-by-step setup
- Zaktualizowano README.md
- Instrukcje znajdowania ID list
- Troubleshooting guide

---

## [1.1.0] - 2025-11-21

### 🔒 Security
- **CRITICAL FIX**: Removed hardcoded API key from source files
- Added `config.js` for centralized configuration management
- Added `.env.example` template for secure key management
- API key now loaded from config file with fallback

### ✨ Features
- Added notification system for user feedback (success/error/warning)
- Improved date validation with past date check
- Added 3-month future date limit for appointments
- Better error messages with visual feedback

### 🐛 Bug Fixes
- Fixed icon path in `manifest.json` (icon.png → icon-powerup.svg)
- Improved error handling for Trello API save failures
- Added fallback UI when Trello save fails (copy to clipboard)
- Replaced `alert()` with custom notification system

### 💅 UI/UX Improvements
- Added loading states for async operations
- Better visual feedback with notification toasts
- Auto-hide notifications after 5 seconds
- Improved button icons (← Cofnij, ✕ Zamknij)
- Warning message styling for failed saves
- Copy-to-clipboard functionality for manual backup

### 📝 Documentation
- Added this CHANGELOG.md
- Updated configuration documentation in config.js
- Added security notes in README

### 🧹 Code Quality
- Separated configuration from business logic
- Improved error handling throughout the app
- Added input validation for date picker
- Better separation of concerns

### 📦 Files Changed
- `script-popup.html` - Major refactor for error handling
- `connector.js` - API key from config
- `authorize.html` - Added config.js loading
- `manifest.json` - Fixed icon path
- `styles.css` - Added notification styles
- **NEW**: `config.js` - Configuration file
- **NEW**: `.env.example` - Environment template
- **NEW**: `CHANGELOG.md` - This file

### ⚠️ Breaking Changes
None - backwards compatible

### 📋 Upgrade Notes
1. Create `config.js` if deploying (template provided)
2. For sensitive deployments, use `.env` file (see `.env.example`)
3. Clear browser cache after update

---

## [1.0.0] - 2025-11-20

### 🎉 Initial Release
- Full telemarketing script engine
- 18 conversation steps
- 7 outcome paths
- Trello Power-Up integration
- History tracking
- Back button functionality
- Color-coded response buttons
- Mobile-responsive design
- Comprehensive documentation

---

**Versioning**: We follow [Semantic Versioning](https://semver.org/)
- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality
- PATCH version for backwards-compatible bug fixes

