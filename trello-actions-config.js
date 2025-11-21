// Trello Actions Configuration
// Konfiguracja automatycznych akcji po zakończeniu rozmowy

const TRELLO_ACTIONS_CONFIG = {
    // Mapowanie ID list Trello (musisz wpisać swoje ID!)
    // Aby znaleźć ID listy: otwórz listę w Trello → dodaj .json do URL
    LISTS: {
        'TERMIN_SPOTKANIA': 'WPISZ_ID_LISTY_TERMIN_SPOTKANIA',  // Lista: Termin spotkania
        'STRACONY_LEAD': 'WPISZ_ID_LISTY_STRACONY_LEAD',        // Lista: Stracony lead
        'CALLBACK': 'WPISZ_ID_LISTY_CALLBACK'                   // Lista: Do oddzwonienia (opcjonalne)
    },

    // Mapowanie nazw etykiet (utworzysz je w Trello)
    LABELS: {
        'UMOWIONO': 'Umówiono',
        'CALLBACK': 'W innym terminie',
        'BRAK_ZAINTERESOWANIA': 'Brak zainteresowania',
        'ZLY_NUMER': 'Zły numer',
        'MA_JUZ': 'Ma już Rainbow'
    },

    // Mapowanie outcome z rozmowy do akcji
    OUTCOME_ACTIONS: {
        // Umówiono prezentację
        'UMÓWIONO': {
            addLabel: 'UMOWIONO',
            moveToList: 'TERMIN_SPOTKANIA',
            setDueDate: true,           // Ustaw due date na datę spotkania
            addComment: true,
            commentPrefix: '✅ UMÓWIONO'
        },
        
        // Oddzwonić
        'ODDZWONIĆ': {
            addLabel: 'CALLBACK',
            moveToList: 'CALLBACK',     // Lub zostaw na obecnej liście
            setDueDate: true,           // Ustaw due date na datę callback
            addComment: true,
            commentPrefix: '⏰ CALLBACK'
        },
        
        // Nie zainteresowany
        'NIE ZAINTERESOWANY': {
            addLabel: 'BRAK_ZAINTERESOWANIA',
            moveToList: 'STRACONY_LEAD',
            addComment: true,
            commentPrefix: '❌ NIE ZAINTERESOWANY'
        },
        
        // Zły numer
        'ZŁY NUMER': {
            addLabel: 'ZLY_NUMER',
            moveToList: 'STRACONY_LEAD',
            addComment: true,
            commentPrefix: '❌ ZŁY NUMER'
        },
        
        // Ma już Rainbow
        'MA JUŻ RAINBOW': {
            addLabel: 'MA_JUZ',
            moveToList: 'STRACONY_LEAD', // Lub inna lista
            addComment: true,
            commentPrefix: '✅ MA JUŻ RAINBOW'
        },
        
        // Klient oddzwoni
        'KLIENT ODDZWONI': {
            addLabel: 'CALLBACK',
            addComment: true,
            commentPrefix: '📞 KLIENT ODDZWONI'
        }
    },

    // Feature flags
    FEATURES: {
        AUTO_MOVE_CARDS: true,          // Automatyczne przenoszenie kart
        AUTO_ADD_LABELS: true,          // Automatyczne dodawanie etykiet
        AUTO_SET_DUE_DATE: true,        // Automatyczne ustawianie due date
        ADD_CONVERSATION_COMMENT: true  // Dodawanie komentarza z historią rozmowy
    }
};

// Helper function: Wyciągnij outcome type z labela
function getOutcomeType(outcomeLabel) {
    // Przykłady labelek:
    // "✅ UMÓWIONO - Zapisz w Trello" → "UMÓWIONO"
    // "❌ NIE ZAINTERESOWANY - Zapisz" → "NIE ZAINTERESOWANY"
    // "⏰ ODDZWONIĆ - Zapisz w Trello" → "ODDZWONIĆ"
    
    const patterns = {
        'UMÓWIONO': /um[oó]wiono/i,
        'ODDZWONIĆ': /oddzwoni[cć]/i,
        'NIE ZAINTERESOWANY': /nie zainteresowany/i,
        'ZŁY NUMER': /z[łl]y numer/i,
        'MA JUŻ RAINBOW': /ma ju[zż] rainbow/i,
        'KLIENT ODDZWONI': /klient oddzwoni/i
    };
    
    for (const [key, pattern] of Object.entries(patterns)) {
        if (pattern.test(outcomeLabel)) {
            return key;
        }
    }
    
    return null;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TRELLO_ACTIONS_CONFIG, getOutcomeType };
}

