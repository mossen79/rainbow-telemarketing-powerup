# 🎯 Trello Setup Guide - Automatyzacja

Instrukcja konfiguracji automatycznych akcji w Trello.

---

## 📋 Krok 1: Stwórz Listy w Trello

Na Twojej tablicy Trello potrzebujesz następujących list:

1. **Termin spotkania** - dla umówionych prezentacji
2. **Stracony lead** - dla odrzuconych/złych numerów
3. **Do oddzwonienia** (opcjonalne) - dla callback

### Jak stworzyć listę:
1. Kliknij **"Dodaj listę"** na tablicy
2. Wpisz nazwę (np. "Termin spotkania")
3. Kliknij **"Dodaj listę"**

---

## 🏷️ Krok 2: Stwórz Etykiety

Potrzebujesz następujących etykiet (labels):

| Etykieta | Kolor | Użycie |
|----------|-------|--------|
| **Umówiono** | 🟢 Zielony | Gdy prezentacja została umówiona |
| **W innym terminie** | 🟡 Żółty | Gdy trzeba oddzwonić |
| **Brak zainteresowania** | 🔴 Czerwony | Gdy klient nie jest zainteresowany |
| **Zły numer** | ⚫ Czarny | Gdy numer jest nieprawidłowy |
| **Ma już Rainbow** | 🔵 Niebieski | Gdy klient już ma produkt |

### Jak stworzyć etykietę:
1. Otwórz dowolną kartę na tablicy
2. Kliknij **"Etykiety"** (po prawej)
3. Kliknij **"Utwórz nową etykietę"**
4. Wybierz kolor i wpisz nazwę
5. Kliknij **"Utwórz"**

**Powtórz dla wszystkich 5 etykiet!**

---

## 🔑 Krok 3: Znajdź ID List

Aby automatyzacja działała, musisz wpisać ID list do konfiguracji.

### Jak znaleźć ID listy:

1. **Otwórz Trello w przeglądarce**
2. **Kliknij nazwę listy** (np. "Termin spotkania")
3. **Dodaj `.json` do URL** w pasku adresu:
   
   **PRZED:**
   ```
   https://trello.com/b/ABC123/moja-tablica
   ```
   
   **PO:**
   ```
   https://trello.com/b/ABC123/moja-tablica.json
   ```

4. **Naciśnij Enter** - zobaczysz JSON
5. **Szukaj** (Ctrl+F): `"name":"Termin spotkania"`
6. **Skopiuj `"id"`** który jest nad tą linią:
   ```json
   {
     "id": "507f1f77bcf86cd799439011",  // ← TO SKOPIUJ!
     "name": "Termin spotkania",
     ...
   }
   ```

**Powtórz dla każdej listy!**

---

## ⚙️ Krok 4: Wpisz ID do Konfiguracji

Otwórz plik `trello-actions-config.js` i wpisz ID:

```javascript
LISTS: {
    'TERMIN_SPOTKANIA': '507f1f77bcf86cd799439011',  // ← Wklej tutaj
    'STRACONY_LEAD': '507f191e810c19729de860ea',     // ← Wklej tutaj
    'CALLBACK': '507f1f77bcf86cd799439012'           // ← Wklej tutaj (opcjonalne)
},
```

---

## 🎯 Krok 5: Sprawdź Nazwy Etykiet

W pliku `trello-actions-config.js` upewnij się że nazwy etykiet pasują:

```javascript
LABELS: {
    'UMOWIONO': 'Umówiono',                    // ← Nazwa dokładnie taka jak w Trello!
    'CALLBACK': 'W innym terminie',
    'BRAK_ZAINTERESOWANIA': 'Brak zainteresowania',
    'ZLY_NUMER': 'Zły numer',
    'MA_JUZ': 'Ma już Rainbow'
},
```

**WAŻNE:** Nazwy muszą być **dokładnie takie same** jak w Trello (wielkość liter ma znaczenie!)

---

## 🔄 Krok 6: Włącz/Wyłącz Funkcje

W pliku `trello-actions-config.js` możesz włączyć/wyłączyć poszczególne funkcje:

```javascript
FEATURES: {
    AUTO_MOVE_CARDS: true,          // ← true = automatycznie przenoś karty
    AUTO_ADD_LABELS: true,          // ← true = automatycznie dodawaj etykiety
    AUTO_SET_DUE_DATE: true,        // ← true = automatycznie ustaw due date
    ADD_CONVERSATION_COMMENT: true  // ← true = dodawaj komentarz
}
```

### Co robi każda funkcja:

| Funkcja | Opis |
|---------|------|
| `AUTO_MOVE_CARDS` | Przenosi kartę na odpowiednią listę (np. "Termin spotkania") |
| `AUTO_ADD_LABELS` | Dodaje kolorową etykietę (np. "Umówiono") |
| `AUTO_SET_DUE_DATE` | Ustawia datę (due date) na datę spotkania/callback |
| `ADD_CONVERSATION_COMMENT` | Dodaje komentarz z pełną historią rozmowy |

---

## 📝 Krok 7: Mapowanie Akcji

Każdy outcome z rozmowy ma przypisane akcje:

### 1. **UMÓWIONO** (prezentacja umówiona)
```javascript
'UMÓWIONO': {
    addLabel: 'UMOWIONO',           // → Dodaje etykietę "Umówiono"
    moveToList: 'TERMIN_SPOTKANIA', // → Przenosi na listę "Termin spotkania"
    setDueDate: true,               // → Ustawia due date na wybraną datę
    addComment: true                // → Dodaje komentarz
}
```

### 2. **ODDZWONIĆ** (callback)
```javascript
'ODDZWONIĆ': {
    addLabel: 'CALLBACK',
    moveToList: 'CALLBACK',         // → Przenosi na "Do oddzwonienia"
    setDueDate: true,               // → Due date = data callback
    addComment: true
}
```

### 3. **NIE ZAINTERESOWANY**
```javascript
'NIE ZAINTERESOWANY': {
    addLabel: 'BRAK_ZAINTERESOWANIA',
    moveToList: 'STRACONY_LEAD',    // → Przenosi na "Stracony lead"
    addComment: true
}
```

### 4. **ZŁY NUMER**
```javascript
'ZŁY NUMER': {
    addLabel: 'ZLY_NUMER',
    moveToList: 'STRACONY_LEAD',    // → Przenosi na "Stracony lead"
    addComment: true
}
```

### 5. **MA JUŻ RAINBOW**
```javascript
'MA JUŻ RAINBOW': {
    addLabel: 'MA_JUZ',
    moveToList: 'STRACONY_LEAD',    // → Możesz zmienić na inną listę
    addComment: true
}
```

### 6. **KLIENT ODDZWONI**
```javascript
'KLIENT ODDZWONI': {
    addLabel: 'CALLBACK',
    addComment: true
    // Karta zostaje na obecnej liście
}
```

---

## 🧪 Krok 8: Testowanie

### Test 1: Umówiono prezentację

1. Otwórz kartę leada w Trello
2. Kliknij **"📞 Skrypt rozmowy"**
3. Przejdź przez rozmowę → wybierz **"Umówiono"**
4. Wybierz datę
5. Zakończ rozmowę

**Sprawdź czy:**
- ✅ Karta ma etykietę "Umówiono" (zielona)
- ✅ Karta ma due date ustawione na wybraną datę
- ✅ Karta jest na liście "Termin spotkania"
- ✅ W komentarzach jest historia rozmowy

### Test 2: Oddzwoń w innym terminie

1. Przejdź przez rozmowę → wybierz **"Oddzwonić"**
2. Podaj datę callback

**Sprawdź czy:**
- ✅ Karta ma etykietę "W innym terminie" (żółta)
- ✅ Karta ma due date ustawione na datę callback
- ✅ Karta jest na liście "Do oddzwonienia"

### Test 3: Brak zainteresowania

1. Przejdź przez rozmowę → wybierz **"Nie zainteresowany"**

**Sprawdź czy:**
- ✅ Karta ma etykietę "Brak zainteresowania" (czerwona)
- ✅ Karta jest na liście "Stracony lead"
- ✅ W komentarzach jest historia

### Test 4: Zły numer

1. Na starcie wybierz **"Zły numer"**

**Sprawdź czy:**
- ✅ Karta ma etykietę "Zły numer" (czarna)
- ✅ Karta jest na liście "Stracony lead"

---

## 🐛 Troubleshooting

### Problem: "Nie udało się zapisać w Trello"

**Możliwe przyczyny:**
1. Brak uprawnień "read,write" - Power-Up musi mieć dostęp do edycji
2. ID list są niepoprawne (sprawdź czy skopiowałeś prawidłowe ID)
3. Nazwy etykiet nie pasują (wielkość liter!)

**Rozwiązanie:**
- Otwórz Console (F12) → szukaj błędów
- Sprawdź `trello-actions-config.js`
- Upewnij się że etykiety istnieją w Trello

### Problem: Etykiety się nie dodają

**Przyczyna:** Etykiety nie istnieją lub mają inne nazwy

**Rozwiązanie:**
1. Sprawdź czy wszystkie 5 etykiet są stworzone w Trello
2. Nazwy muszą być **dokładnie takie same**
3. W pliku config zmień nazwy jeśli trzeba

### Problem: Karty się nie przenoszą

**Przyczyna:** Niepoprawne ID list

**Rozwiązanie:**
1. Ponownie znajdź ID list (krok 3)
2. Sprawdź czy nie skopiowałeś z cudzysłowami
3. Format: `'TERMIN_SPOTKANIA': '507f1f77bcf86cd799439011'`

### Problem: Due date się nie ustawia

**Przyczyna:** Data nie została wybrana w rozmowie

**Rozwiązanie:**
- Due date ustawia się tylko gdy użytkownik wybierze datę w kalendarzu
- Dla "Nie zainteresowany" nie ma daty (to jest OK)

---

## 📋 Checklist Wdrożenia

Przed uruchomieniem sprawdź:

- [ ] Stworzyłem 3 listy w Trello (Termin spotkania, Stracony lead, Do oddzwonienia)
- [ ] Stworzyłem 5 etykiet (Umówiono, W innym terminie, Brak zainteresowania, Zły numer, Ma już Rainbow)
- [ ] Znalazłem i skopiowałem ID wszystkich 3 list
- [ ] Wpisałem ID do `trello-actions-config.js`
- [ ] Sprawdziłem że nazwy etykiet pasują dokładnie
- [ ] Włączyłem wszystkie 4 funkcje w FEATURES
- [ ] Upload plików na GitHub Pages (config.js, trello-actions-config.js, trello-automation.js)
- [ ] Przetestowałem 3 scenariusze (umówiono, callback, brak zainteresowania)

---

## 🎉 Gotowe!

Po zakończeniu konfiguracji Twój Power-Up będzie automatycznie:

✅ Dodawał etykiety  
✅ Ustawiał daty  
✅ Przenosił karty między listami  
✅ Zapisywał historię rozmów

**To oszczędzi Ci godziny ręcznej pracy!** 🚀

---

**Potrzebujesz pomocy?**
- Zobacz: [README-SECURITY.md](README-SECURITY.md) - bezpieczeństwo
- Zobacz: [CHANGELOG.md](CHANGELOG.md) - historia zmian
- Issues: https://github.com/mossen79/rainbow-telemarketing-powerup/issues

---

**Autor:** Rainbow System Team  
**Wersja:** 1.2.0  
**Data:** 2025-11-21

