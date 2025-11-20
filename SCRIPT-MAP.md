# 🌳 Mapa Skryptu Rainbow - Drzewo Decyzyjne

**Skrypt:** Odkurzacz Rainbow - Umówienie prezentacji
**Wersja:** 1.0
**Total kroków:** 18
**Total opcji odpowiedzi:** 53

---

## 📊 Wizualizacja Drzewa

```
START (Powitanie)
├─ "Tak, słucham"
│  └─ INTRO (Wprowadzenie)
│     ├─ "Tak, znam Rainbow"
│     │  └─ PITCH_SHORT (Krótka prezentacja)
│     │     ├─ "Dzisiaj/Jutro" → BOOK_SOON
│     │     ├─ "W tym tygodniu" → BOOK_THIS_WEEK
│     │     ├─ "W weekend" → BOOK_WEEKEND
│     │     └─ "Muszę pomyśleć" → OBJECTION_THINK
│     │
│     ├─ "Nie, nie znam"
│     │  └─ PITCH_FULL (Pełna prezentacja)
│     │     ├─ "Dzisiaj/Jutro" → BOOK_SOON
│     │     ├─ "W tym tygodniu" → BOOK_THIS_WEEK
│     │     ├─ "W weekend" → BOOK_WEEKEND
│     │     ├─ "Muszę pomyśleć" → OBJECTION_THINK
│     │     └─ "To za drogie" → OBJECTION_PRICE
│     │
│     ├─ "Mam już Rainbow"
│     │  └─ ALREADY_HAS (Upsell)
│     │     ├─ "Tak, interesuje" → BOOK_THIS_WEEK
│     │     └─ "Nie, mój działa" → END_HAS_RAINBOW ✅
│     │
│     └─ "Nie interesuje mnie"
│        └─ OBJECTION_1 (Pierwsza obiekcja)
│           ├─ "OK, umów" → BOOK_THIS_WEEK
│           └─ "Dalej nie" → OBJECTION_FINAL
│
├─ "To nie ja / Zły numer"
│  └─ WRONG_NUMBER
│     └─ "❌ ZŁY NUMER" ✅ KONIEC
│
├─ "Nie mam czasu teraz"
│  └─ CALLBACK_REQUEST (Prośba o callback)
│     ├─ "Jutro" → CALLBACK_SCHEDULED
│     ├─ "Za kilka dni" → CALLBACK_SCHEDULED
│     └─ "Ja sam zadzwonię" → END_CALLBACK_CLIENT ✅
│
└─ "Nie interesuje mnie"
   └─ OBJECTION_START (Obiekcja na starcie)
      ├─ "Odkurzacz (za drogi)" → OBJECTION_PRICE
      ├─ "Nie mam czasu" → OBJECTION_TIME
      └─ "Nic nie interesuje" → END_NOT_INTERESTED ❌


═══════════════════════════════════════════════════════════

BOOK_SOON (Najbliższe dni)
├─ "Dzisiaj 18:00" → CONFIRM_BOOKING ✅
├─ "Dzisiaj 19:30" → CONFIRM_BOOKING ✅
├─ "Jutro 10:00" → CONFIRM_BOOKING ✅
├─ "Jutro 16:00" → CONFIRM_BOOKING ✅
└─ "Inna godzina" → CUSTOM_TIME
   ├─ "Klient podał termin" → CONFIRM_BOOKING ✅
   └─ "Nie może ustalić" → CALLBACK_REQUEST

BOOK_THIS_WEEK (Ten tydzień)
├─ "Wtorek/Środa" → CONFIRM_BOOKING ✅
├─ "Czwartek/Piątek" → CONFIRM_BOOKING ✅
└─ "Wolę weekend" → BOOK_WEEKEND

BOOK_WEEKEND (Weekend)
├─ "Sobota rano/południe" → CONFIRM_BOOKING ✅
├─ "Sobota popołudnie" → CONFIRM_BOOKING ✅
└─ "Niedziela" → CONFIRM_BOOKING ✅

═══════════════════════════════════════════════════════════

OBJECTION_THINK (Muszę pomyśleć)
├─ "Tak, proszę oddzwonić" → CALLBACK_SCHEDULED ⏰
└─ "Nie, dziękuję" → END_NOT_INTERESTED ❌

OBJECTION_PRICE (Za drogie)
├─ "OK, umów prezentację" → BOOK_THIS_WEEK
└─ "To i tak za drogo" → END_NOT_INTERESTED ❌

OBJECTION_TIME (Brak czasu)
├─ "OK, umów na weekend" → BOOK_WEEKEND
└─ "Dalej nie mam czasu" → CALLBACK_REQUEST

OBJECTION_FINAL (Ostatnia próba)
└─ "❌ NIE ZAINTERESOWANY" ❌ KONIEC

CALLBACK_SCHEDULED (Potwierdzenie callback)
└─ "⏰ ODDZWONIĆ" ⏰ KONIEC

CONFIRM_BOOKING (Potwierdzenie)
└─ "✅ UMÓWIONO" ✅ KONIEC
```

---

## 📈 Analiza Ścieżek

### 🟢 Ścieżki Sukcesu (Umówiono):

#### Fast Track (3 kroki):
```
START → INTRO → PITCH_SHORT → BOOK_SOON → CONFIRM ✅
Czas: ~2 minuty
```

#### Standard (4 kroki):
```
START → INTRO → PITCH_FULL → BOOK_THIS_WEEK → CONFIRM ✅
Czas: ~3 minuty
```

#### Recovery Path (5 kroków):
```
START → INTRO → PITCH_FULL → OBJECTION_PRICE → BOOK_THIS_WEEK → CONFIRM ✅
Czas: ~4 minuty
```

#### Hard Sell (6 kroków):
```
START → OBJECTION_START → OBJECTION_PRICE → BOOK_WEEKEND → CONFIRM ✅
Czas: ~5 minut
```

### 🟡 Ścieżki Callback (Oddzwonić):

#### Quick Callback (2 kroki):
```
START → CALLBACK_REQUEST → CALLBACK_SCHEDULED ⏰
```

#### Post-Objection Callback (4 kroki):
```
START → INTRO → PITCH_FULL → OBJECTION_THINK → CALLBACK_SCHEDULED ⏰
```

### 🔴 Ścieżki Negatywne (Nie zainteresowany):

#### Immediate Rejection (2 kroki):
```
START → OBJECTION_START → END_NOT_INTERESTED ❌
```

#### Post-Pitch Rejection (4 kroki):
```
START → INTRO → PITCH_FULL → OBJECTION_PRICE → END_NOT_INTERESTED ❌
```

#### Final Rejection (5 kroków):
```
START → INTRO → OBJECTION_1 → OBJECTION_FINAL → END ❌
```

---

## 📊 Statystyki

### Outcomes Distribution (końcowe wyniki):

| Outcome | Symbol | Typ | Exit Points |
|---------|--------|-----|-------------|
| Umówiono prezentację | ✅ | Sukces | 13 ścieżek |
| Oddzwonić | ⏰ | Follow-up | 1 ścieżka |
| Klient oddzwoni | 📞 | Follow-up | 1 ścieżka |
| Nie zainteresowany | ❌ | Negatywny | 3 ścieżki |
| Zły numer | ❌ | Invalid | 1 ścieżka |
| Ma już Rainbow | ✅ | Info | 1 ścieżka |

### Depth Analysis:

- **Najkrótsza rozmowa:** 2 kroki (zły numer)
- **Najdłuższa rozmowa:** 6 kroków (hard sell)
- **Średnia głębokość:** 3-4 kroki
- **Maksymalna ilość decyzji:** 5 poziomów

### Branching Factor:

- **START:** 4 opcje
- **INTRO:** 4 opcje
- **PITCH_FULL:** 5 opcji (największy wybór)
- **PITCH_SHORT:** 4 opcje
- **BOOK_SOON:** 5 opcji
- **Średnio:** 3.2 opcji na krok

---

## 🎯 Coverage Obiekcji

### ✅ Obsługiwane obiekcje:

1. **"Za drogie"** → OBJECTION_PRICE
   - Argument: Inwestycja 20-30 lat
   - Rozwiązanie: Raty 0%, leasing
   - Recovery: → BOOK_THIS_WEEK

2. **"Nie mam czasu"** → OBJECTION_TIME
   - Argument: Tylko 45 minut
   - Rozwiązanie: Elastyczne terminy (wieczór, weekend)
   - Recovery: → BOOK_WEEKEND

3. **"Nie interesuje mnie"** → OBJECTION_1, OBJECTION_START
   - Argument: Darmowa prezentacja, nie sprzedaż
   - Recovery: → BOOK_THIS_WEEK lub OBJECTION_FINAL

4. **"Muszę pomyśleć"** → OBJECTION_THINK
   - Argument: Nic nie kosztuje, warto zobaczyć
   - Recovery: → CALLBACK_SCHEDULED

5. **"Mam już Rainbow"** → ALREADY_HAS
   - Argument: Nowe modele, program wymiany, rabat
   - Recovery: → BOOK_THIS_WEEK lub END

6. **"Zły numer"** → WRONG_NUMBER
   - Action: Przeprosić, zakończyć

### ⚠️ Potencjalne obiekcje do dodania (future):

- [ ] "Mam alergię" → Argument: Rainbow dla alergików (HEPA)
- [ ] "Mam zwierzęta" → Argument: Idealny do sierści
- [ ] "Za duży/za ciężki" → Argument: Lekkie modele
- [ ] "Brak prądu/gniazdek" → Argument: Standardowe gniazdko
- [ ] "Wynajmuję mieszkanie" → Argument: Przenośny, na lata

---

## 🔄 Możliwe Pętle (Loops)

### Wykryte pętle: **BRAK** ✅

Wszystkie ścieżki kończą się w określonym punkcie (null).
Brak infinite loops.

### Maksymalne powtórzenia:
- Cofnij: nieograniczone (funkcja back)
- Obiekcje: max 2-3 poziomy (potem FINAL lub END)

---

## 💡 Optymalizacje

### Sugerowane skróty:

1. **Fast Track dla "Znam Rainbow":**
   - INTRO → PITCH_SHORT (już zaimplementowane ✅)

2. **Direct Booking z OBJECTION_PRICE:**
   - Już idzie bezpośrednio do BOOK_THIS_WEEK ✅

3. **Multi-level Callbacks:**
   - Różne callback timings (jutro, tydzień) ✅

---

## 📞 Przykładowe Rozmowy (Scenarios)

### Scenario 1: Idealny Klient
```
Krok 1 (START): "Dzień dobry, dzwonię z Rainbow System"
Klient: "Tak, słucham"

Krok 2 (INTRO): "Czy słyszał Pan o Rainbow?"
Klient: "Tak, znam"

Krok 3 (PITCH_SHORT): "Darmowa prezentacja, 45 min"
Klient: "Dzisiaj/Jutro"

Krok 4 (BOOK_SOON): "Dzisiaj 18:00 lub jutro 10:00?"
Klient: "Dzisiaj 18:00"

Krok 5 (CONFIRM): "Rezerwuję termin"
OUTCOME: ✅ UMÓWIONO
```
**Czas: 2-3 minuty**

### Scenario 2: Skeptyczny Klient
```
Krok 1 (START): "Dzień dobry..."
Klient: "Nie interesuje mnie"

Krok 2 (OBJECTION_START): "Co konkretnie nie interesuje?"
Klient: "Odkurzacz - za drogi"

Krok 3 (OBJECTION_PRICE): "Raty 0%, inwestycja 20-30 lat"
Klient: "OK, umów prezentację"

Krok 4 (BOOK_THIS_WEEK): "Wtorek-piątek, która pora?"
Klient: "Czwartek/Piątek"

Krok 5 (CONFIRM): "Rezerwuję"
OUTCOME: ✅ UMÓWIONO
```
**Czas: 4-5 minut**

### Scenario 3: Callback
```
Krok 1 (START): "Dzień dobry..."
Klient: "Nie mam czasu teraz"

Krok 2 (CALLBACK_REQUEST): "Kiedy oddzwonić?"
Klient: "Jutro"

Krok 3 (CALLBACK_SCHEDULED): "Oddzwonię jutro"
OUTCOME: ⏰ ODDZWONIĆ
```
**Czas: 1 minuta**

---

## ✅ Podsumowanie

**Skrypt Rainbow jest:**
- ✅ Kompletny (18 kroków)
- ✅ Zrównoważony (3-4 opcje/krok)
- ✅ Elastyczny (53 total opcji)
- ✅ Bezpieczny (brak infinite loops)
- ✅ Profesjonalny (coverage wszystkich main obiekcji)

**Gotowy do produkcji!** 🚀

---

**Mapa stworzona automatycznie przez Claude**
**Data:** 2025-11-20
