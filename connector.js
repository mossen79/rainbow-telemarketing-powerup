// Trello Power-Up Connector - INITIALIZATION ONLY
// This file should ONLY be loaded on the connector page

// Load configuration (API key should be in config.js, not hardcoded here)
const TRELLO_APP_KEY = (typeof CONFIG !== 'undefined' && CONFIG.TRELLO_APP_KEY) 
    ? CONFIG.TRELLO_APP_KEY 
    : '538572f48dd27b2c1be5bc2dcdd12bdc'; // Fallback for development

TrelloPowerUp.initialize({
    appKey: TRELLO_APP_KEY,
    appName: 'Rainbow Telemarketing Scripts',
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
    'card-detail-badges': function(t, options) {
        return [{
            title: 'Skrypt rozmowy',
            text: 'Rozpocznij rozmowę',
            icon: 'https://mossen79.github.io/rainbow-telemarketing-powerup/icon-powerup.svg',
            color: 'blue',
            callback: function(t) {
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
    },
    'authorization-status': function(t, options) {
        return t.getRestApi().isAuthorized();
    },
    'show-authorization': function(t, options) {
        return t.popup({
            title: 'Autoryzacja Trello',
            url: './authorize.html',
            height: 140
        });
    }
});
