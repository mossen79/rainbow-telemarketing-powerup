// Trello Power-Up Connector - INITIALIZATION ONLY
// This file should ONLY be loaded on the connector page

TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return [{
            icon: 'https://mossen79.github.io/rainbow-telemarketing-powerup/icon.svg',
            text: 'Skrypt rozmowy',
            callback: function (t) {
                return t.popup({
                    title: 'Rainbow Telemarketing Scripts',
                    url: './script-popup.html',
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
