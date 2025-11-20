# ✅ Manual Test Checklist - Rainbow Telemarketing Power-Up

**Tester:** [Twoje imię]
**Data:** _____________
**Przeglądarka:** Chrome / Edge / Firefox (zaznacz)

---

## 🧪 Test 1: Lokalny Test (Standalone)

### Krok 1: Otwórz plik testowy

```bash
# Z folderu projektu, otwórz:
test-standalone.html
```

**Lub:** Dwuklik na `test-standalone.html` w Eksploratorze

### Oczekiwany rezultat:
- [ ] Przeglądarka się otwiera
- [ ] Widzisz tytuł: **"📞 Skrypt Rozmowy - TEST"**
- [ ] Widzisz sekcję "POWIEDZ:" z tekstem
- [ ] Widzisz przyciski odpowiedzi (4 sztuki)

**Screenshot:**
```
┌─────────────────────────────────────────┐
│  📞 Skrypt Rozmowy - TEST               │
├─────────────────────────────────────────┤
│  POWIEDZ:                               │
│  ┌─────────────────────────────────┐  │
│  │ Dzień dobry, nazywam się        │  │
│  │ [TWOJE IMIĘ], dzwonię z firmy   │  │
│  │ Rainbow System...               │  │
│  └─────────────────────────────────┘  │
│                                         │
│  KLIENT ODPOWIEDZIAŁ:                  │
│  ┌──────────────────┐                  │
│  │ Tak, słucham     │  (niebieski)     │
│  └──────────────────┘                  │
│  ┌──────────────────┐                  │
│  │ To nie ja...     │  (niebieski)     │
│  └──────────────────┘                  │
│  ... (więcej przycisków)                │
└─────────────────────────────────────────┘
```

**Status:** ⬜ PASS / ⬜ FAIL

**Notatki:**
_______________________________________

---

## 🧪 Test 2: Nawigacja (Klikanie Przycisków)

### Krok 2: Kliknij "Tak, słucham"

**Oczekiwany rezultat:**
- [ ] Tekst się zmienia na nowy krok (INTRO)
- [ ] Nowy tekst: "Dzwonię w sprawie darmowej prezentacji odkurzacza Rainbow System..."
- [ ] Nowe przyciski (4 opcje)
- [ ] Przycisk "← Cofnij" pojawia się (na dole)
- [ ] Panel "Historia rozmowy" pojawia się (na dole)

**Status:** ⬜ PASS / ⬜ FAIL

### Krok 3: Kliknij "Tak, znam Rainbow"

**Oczekiwany rezultat:**
- [ ] Tekst zmienia się na PITCH_SHORT
- [ ] Historia pokazuje: "1. Powitanie → Tak, słucham"
- [ ] Przycisk "Cofnij" nadal widoczny

**Status:** ⬜ PASS / ⬜ FAIL

### Krok 4: Kliknij "Dzisiaj/Jutro"

**Oczekiwany rezultat:**
- [ ] Tekst zmienia się na BOOK_SOON
- [ ] 5 opcji terminów (18:00, 19:30, 10:00, 16:00, Inna)
- [ ] Historia pokazuje 3 kroki

**Status:** ⬜ PASS / ⬜ FAIL

### Krok 5: Kliknij "Dzisiaj 18:00"

**Oczekiwany rezultat:**
- [ ] Tekst zmienia się na CONFIRM_BOOKING
- [ ] Jeden zielony przycisk: "✅ UMÓWIONO - Zapisz w Trello"

**Status:** ⬜ PASS / ⬜ FAIL

### Krok 6: Kliknij "✅ UMÓWIONO"

**Oczekiwany rezultat:**
- [ ] Ekran końcowy pojawia się
- [ ] Tekst: "✅ Rozmowa zakończona"
- [ ] Wynik: "Umówiono - Zapisz w Trello"
- [ ] Przycisk "✓ Zamknij i wróć do Trello"

**Status:** ⬜ PASS / ⬜ FAIL

---

## 🧪 Test 3: Przycisk Cofnij

### Krok 7: Rozpocznij od nowa (reload strony)

### Krok 8: Kliknij "Tak, słucham" → "Nie, nie znam"

**Teraz jesteś w PITCH_FULL**

### Krok 9: Kliknij przycisk "← Cofnij"

**Oczekiwany rezultat:**
- [ ] Wrócisz do INTRO
- [ ] Tekst zmienia się z powrotem na "Czy słyszała/słyszał..."
- [ ] Historia jest krótsza (jeden krok mniej)

**Status:** ⬜ PASS / ⬜ FAIL

---

## 🧪 Test 4: Obiekcje

### Krok 10: Rozpocznij od nowa

### Krok 11: Ścieżka obiekcji
```
START → "Nie interesuje mnie"
```

**Oczekiwany rezultat:**
- [ ] Przechodzi do OBJECTION_START
- [ ] Tekst: "Rozumiem. Czy mogę zapytać co konkretnie..."

### Krok 12: Kliknij "Odkurzacz (za drogi)"

**Oczekiwany rezultat:**
- [ ] Przechodzi do OBJECTION_PRICE
- [ ] Tekst zawiera: "raty 0%", "inwestycja 20-30 lat"

### Krok 13: Kliknij "To i tak za drogo"

**Oczekiwany rezultat:**
- [ ] Przechodzi do END_NOT_INTERESTED
- [ ] Ekran końcowy: "❌ NIE ZAINTERESOWANY - Zapisz"

**Status:** ⬜ PASS / ⬜ FAIL

---

## 🧪 Test 5: Kolory Przycisków

### Sprawdź kolory:

**Zielone przyciski** (sukces):
- [ ] "✅ UMÓWIONO" - zielony tło

**Czerwone przyciski** (porażka):
- [ ] "❌ NIE ZAINTERESOWANY" - czerwony tło
- [ ] "❌ ZŁY NUMER" - czerwony tło

**Żółte przyciski** (callback):
- [ ] "⏰ ODDZWONIĆ" - żółty tło
- [ ] "📞 KLIENT ODDZWONI" - żółty tło

**Niebieskie przyciski** (neutralne):
- [ ] Większość standardowych opcji - niebieski tło

**Status:** ⬜ PASS / ⬜ FAIL

---

## 🧪 Test 6: Responsywność (Mobile)

### Krok 14: Zmień rozmiar okna przeglądarki (wąskie)

**Oczekiwany rezultat:**
- [ ] Przyciski nadal czytelne
- [ ] Tekst się zawija (nie wychodzi poza ekran)
- [ ] Font większy na małym ekranie
- [ ] Wszystko pozostaje funkcjonalne

**Status:** ⬜ PASS / ⬜ FAIL

---

## 🧪 Test 7: Console (Developer Tools)

### Krok 15: Otwórz Console (F12)

**W zakładce Console sprawdź:**
- [ ] Brak czerwonych błędów (errors)
- [ ] Mogą być żółte warningi (OK)
- [ ] Log: "Skrypt załadowany" lub podobny

**Status:** ⬜ PASS / ⬜ FAIL

---

## 🧪 Test 8: Network (Developer Tools)

### W zakładce Network sprawdź:
- [ ] `rainbow-odkurzacz.json` załadowany (status 200)
- [ ] `styles.css` załadowany (status 200)
- [ ] `script-engine.js` załadowany (status 200)

**Status:** ⬜ PASS / ⬜ FAIL

---

## 📊 Kompleksowy Test Flow

### Test 9: Pełna ścieżka sukcesu

```
START
→ "Tak, słucham"
→ "Tak, znam Rainbow"
→ "W weekend"
→ "Sobota rano/południe"
→ "✅ UMÓWIONO"
```

**Kroki:**
1. [ ] Każdy krok wyświetla się poprawnie
2. [ ] Historia śledzi wszystkie kroki
3. [ ] Przyciski działają
4. [ ] Ekran końcowy OK

**Status:** ⬜ PASS / ⬜ FAIL

### Test 10: Pełna ścieżka z obiekcjami

```
START
→ "Nie interesuje"
→ "Odkurzacz (za drogi)"
→ "OK, umów prezentację"
→ "Czwartek/Piątek"
→ "✅ UMÓWIONO"
```

**Kroki:**
1. [ ] Recovery po obiekcji działa
2. [ ] Tekst argumentacji wyświetla się
3. [ ] Zakończenie sukcesem

**Status:** ⬜ PASS / ⬜ FAIL

---

## 🎯 Final Checklist

### UI/UX:
- [ ] Czcionka czytelna (min. 16px)
- [ ] Przyciski duże (łatwe do kliknięcia)
- [ ] Kolory kontrastowe
- [ ] Brak migotania/lagów

### Funkcjonalność:
- [ ] Wszystkie przyciski działają
- [ ] Cofnij działa
- [ ] Historia działa
- [ ] Zakończenia działają (7 różnych outcomes)

### Content:
- [ ] Teksty profesjonalne
- [ ] Brak literówek
- [ ] Personalizacja ([TWOJE IMIĘ], [IMIĘ Z LEADA])
- [ ] Logiczny flow rozmowy

### Performance:
- [ ] Ładowanie < 2 sekundy
- [ ] Brak opóźnień przy klikaniu
- [ ] Płynne przejścia

---

## 📝 Znalezione Problemy

### Problem 1:
**Opis:**
_______________________________________

**Priorytet:** ⬜ Critical / ⬜ High / ⬜ Medium / ⬜ Low

**Fix:**
_______________________________________

---

### Problem 2:
**Opis:**
_______________________________________

**Priorytet:** ⬜ Critical / ⬜ High / ⬜ Medium / ⬜ Low

**Fix:**
_______________________________________

---

## ✅ FINAL VERDICT

**Ogólny status:** ⬜ READY FOR DEPLOYMENT / ⬜ NEEDS FIXES

**Procentowe przejście testów:** _____ / _____ (____%)

**Notatki:**
_______________________________________
_______________________________________
_______________________________________

**Podpis testera:** _____________________
**Data:** _____________

---

**Test checklist by Claude**
**Version:** 1.0
