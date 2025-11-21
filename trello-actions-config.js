// Trello Actions Configuration - LIDY ODKURZACZ
// Tablica: Lidy Odkurzacz (ID: 6388ea7a0896f202f14ba1b1)
// Wygenerowano: 2025-11-21

const TRELLO_ACTIONS_CONFIG = {
    // ID list Trello z tablicy "Lidy Odkurzacz"
    LISTS: {
        'TERMIN_SPOTKANIA': '66a799b51db77ab8688e964f',  // 📅TERMIN SPOTKANIA📅
        'STRACONY_LEAD': '67b9d0eb24121e7e00a009e3',      // ❌STRACONY LID❌
        'NOWA_LISTA': '6815f580d9254b5c401f2421'          // Nowe Lidy (dla callback)
    },

    // Nazwy etykiet (NIE UŻYWANE - używamy bezpośrednio ID z formularza)
    LABELS: {
        'UMOWIONO': 'Umówione',
        'CALLBACK': 'Do ponownego umówienia',
        'NIE_ODBIERA': 'nie odbiera'
    },

    // Mapowanie outcome do akcji
    OUTCOME_ACTIONS: {
        'UMÓWIONO': {
            // Etykiety dodawane są z formularza (user wybiera)
            moveToList: 'TERMIN_SPOTKANIA',
            setDueDate: true,  // Data + godzina z formularza
            addComment: true,
            commentPrefix: '✅ UMÓWIONO'
        },
        
        'ODDZWONIĆ': {
            // Etykiety z formularza
            moveToList: 'NOWA_LISTA',  // Zostaje na "Nowe Lidy"
            setDueDate: true,  // Data callback + godzina
            addComment: true,
            commentPrefix: '⏰ CALLBACK'
        },
        
        'NIE ZAINTERESOWANY': {
            addLabel: 'BRAK_ZAINTERESOWANIA',
            moveToList: 'STRACONY_LEAD',
            addComment: true,
            commentPrefix: '❌ NIE ZAINTERESOWANY'
        },
        
        'ZŁY NUMER': {
            addLabel: 'ZLY_NUMER',
            moveToList: 'STRACONY_LEAD',
            addComment: true,
            commentPrefix: '❌ ZŁY NUMER / POMYŁKA'
        },
        
        'MA JUŻ RAINBOW': {
            addLabel: 'MA_JUZ',
            moveToList: 'STRACONY_LEAD',
            addComment: true,
            commentPrefix: '✅ MA JUŻ RAINBOW'
        },
        
        'KLIENT ODDZWONI': {
            // Etykiety z formularza
            addComment: true,
            commentPrefix: '📞 KLIENT ODDZWONI'
        }
    },

    // Feature flags
    FEATURES: {
        AUTO_MOVE_CARDS: true,          // Automatycznie przenoś karty
        AUTO_ADD_LABELS: true,          // Dodawaj etykiety (z formularza lub domyślne)
        AUTO_SET_DUE_DATE: true,        // Ustaw due date z godziną
        ADD_CONVERSATION_COMMENT: true  // Dodawaj komentarz z historią
    }
};

// Helper function
function getOutcomeType(outcomeLabel) {
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
