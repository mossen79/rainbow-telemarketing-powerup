// Configuration file for Trello Power-Up
// DO NOT commit this file to public repos!

const CONFIG = {
    // Trello App Key
    TRELLO_APP_KEY: '9a2872ee8e651d0f63ba2fbb3a18a047',
    
    // App metadata
    APP_NAME: 'Rainbow Telemarketing Scripts',
    APP_VERSION: '1.2.0',
    
    // Features flags
    FEATURES: {
        SAVE_TO_TRELLO: true,
        KEYBOARD_SHORTCUTS: true,
        MULTI_CAMPAIGN: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
