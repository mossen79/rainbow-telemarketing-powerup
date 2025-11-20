// Trello Power-Up Connector
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

// Inicjalizacja Power-Up
TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return [{
            icon: './icon.png',
            text: '📞 Skrypt rozmowy',
            callback: function (t) {
                return t.popup({
                    title: 'Rainbow Telemarketing Scripts',
                    url: './index.html',
                    height: 600
                });
            }
        }];
    },
    'show-settings': function (t, options) {
        return t.popup({
            title: 'Ustawienia Skryptów',
            url: './settings.html',
            height: 300
        });
    }
});

// Helper functions dla integracji z Trello
window.TrelloHelpers = {
    // Pobierz dane karty
    getCardData: async function () {
        const card = await t.card('name', 'desc', 'members');
        return card;
    },

    // Dodaj komentarz do karty (opcjonalne - na przyszłość)
    addComment: async function (text) {
        // To wymaga dodatkowych uprawnień w manifeście
        // Na razie zostawiamy jako placeholder
        console.log('Dodaj komentarz:', text);
    },

    // Zapisz outcome do custom field (opcjonalne - na przyszłość)
    saveOutcome: async function (outcome) {
        // To wymaga konfiguracji custom fields
        console.log('Zapisz outcome:', outcome);
    }
};
