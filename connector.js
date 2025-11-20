// Trello Power-Up Connector - INITIALIZATION ONLY
// This file should ONLY be loaded on the connector page

TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return [{
            icon: 'https://mossen79.github.io/rainbow-telemarketing-powerup/icon-powerup.svg',
            text: 'Skrypt rozmowy',
            callback: function (t) {
                return t.modal({
                    url: './script-popup.html',
                    fullscreen: true,
                    title: 'Rainbow Telemarketing Scripts'
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
