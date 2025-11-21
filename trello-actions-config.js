// Trello Actions Configuration
// WYGENEROWANO AUTOMATYCZNIE: 21.11.2025, 15:45:27

const TRELLO_ACTIONS_CONFIG = {
    // ID list Trello
    LISTS: {
        'TERMIN_SPOTKANIA': '69207b05859f00c16109506b',  // Termin spotkania
        'STRACONY_LEAD': '69207b055b6d7d0fa20f40d3',      // Stracony lead
        'CALLBACK': '69207b05c7b60b93ccdbed35'               // Do oddzwonienia
    },

    // Nazwy etykiet (muszą pasować do Trello!)
    LABELS: {
        'UMOWIONO': 'Umówiono',
        'CALLBACK': 'W innym terminie',
        'BRAK_ZAINTERESOWANIA': 'Brak zainteresowania',
        'ZLY_NUMER': 'Zły numer',
        'MA_JUZ': 'Ma już Rainbow'
    },

    // Mapowanie outcome do akcji
    OUTCOME_ACTIONS: {
        'UMÓWIONO': {
            addLabel: 'UMOWIONO',
            moveToList: 'TERMIN_SPOTKANIA',
            setDueDate: true,
            addComment: true,
            commentPrefix: '✅ UMÓWIONO'
        },
        
        'ODDZWONIĆ': {
            addLabel: 'CALLBACK',
            moveToList: 'CALLBACK',
            setDueDate: true,
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
            commentPrefix: '❌ ZŁY NUMER'
        },
        
        'MA JUŻ RAINBOW': {
            addLabel: 'MA_JUZ',
            moveToList: 'STRACONY_LEAD',
            addComment: true,
            commentPrefix: '✅ MA JUŻ RAINBOW'
        },
        
        'KLIENT ODDZWONI': {
            addLabel: 'CALLBACK',
            addComment: true,
            commentPrefix: '📞 KLIENT ODDZWONI'
        }
    },

    // Feature flags
    FEATURES: {
        AUTO_MOVE_CARDS: true,
        AUTO_ADD_LABELS: true,
        AUTO_SET_DUE_DATE: true,
        ADD_CONVERSATION_COMMENT: true
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
