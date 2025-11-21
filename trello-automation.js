// Trello Automation Engine
// Wykonuje automatyczne akcje w Trello po zakończeniu rozmowy

class TrelloAutomation {
    constructor(trelloClient, config, appKey) {
        this.t = trelloClient;
        this.config = config;
        this.appKey = appKey;
    }

    /**
     * Wykonuje wszystkie akcje dla danego outcome
     */
    async executeOutcomeActions(outcomeLabel, conversationData) {
        try {
            // Określ typ outcome
            const outcomeType = getOutcomeType(outcomeLabel);
            
            if (!outcomeType) {
                console.warn('Unknown outcome type:', outcomeLabel);
                return { success: false, error: 'Unknown outcome type' };
            }

            const actions = this.config.OUTCOME_ACTIONS[outcomeType];
            
            if (!actions) {
                console.warn('No actions defined for outcome:', outcomeType);
                return { success: false, error: 'No actions defined' };
            }

            // Pobierz dane karty
            const card = await this.t.card('id', 'labels', 'idList');
            const cardId = card.id;

            // Autoryzacja
            const restApi = this.t.getRestApi();
            const isAuthorized = await restApi.isAuthorized();
            
            if (!isAuthorized) {
                await restApi.authorize({ scope: 'read,write' });
            }
            
            const token = await restApi.getToken();

            const results = {
                success: true,
                actions: {},
                errors: []
            };

            // 1. Dodaj etykiety (z formularza lub domyślne)
            if (this.config.FEATURES.AUTO_ADD_LABELS) {
                try {
                    if (conversationData.labels && conversationData.labels.length > 0) {
                        // Użyj etykiet wybranych przez użytkownika
                        const labelResults = await this.addMultipleLabels(cardId, conversationData.labels, token);
                        results.actions.labels = `added ${labelResults.filter(r => r.success).length}`;
                    } else if (actions.addLabel) {
                        // Fallback do domyślnej etykiety z config
                        await this.addLabel(cardId, actions.addLabel, token);
                        results.actions.label = 'added';
                    }
                } catch (error) {
                    results.errors.push({ action: 'addLabel', error: error.message });
                }
            }

            // 2. Ustaw due date (z godziną jeśli podano)
            if (this.config.FEATURES.AUTO_SET_DUE_DATE && actions.setDueDate && conversationData.selectedDate) {
                try {
                    await this.setDueDate(
                        cardId, 
                        conversationData.selectedDate, 
                        conversationData.selectedTime || '9:00',
                        token
                    );
                    results.actions.dueDate = 'set';
                } catch (error) {
                    results.errors.push({ action: 'setDueDate', error: error.message });
                }
            }
            
            // 2b. Dodaj adres do opisu karty (jeśli podano)
            if (conversationData.address && conversationData.address.trim()) {
                try {
                    // Pobierz istniejący opis
                    const cardResponse = await fetch(`https://api.trello.com/1/cards/${cardId}?key=${this.appKey}&token=${token}&fields=desc`);
                    const cardData = await cardResponse.json();
                    const existingDesc = cardData.desc || '';
                    
                    // Dodaj adres na początku opisu
                    const newDesc = `📍 ADRES SPOTKANIA:\n${conversationData.address}\n\n${existingDesc}`;
                    
                    await this.updateDescription(cardId, newDesc, token);
                    results.actions.address = 'added to description';
                } catch (error) {
                    results.errors.push({ action: 'updateAddress', error: error.message });
                }
            }

            // 3. Dodaj komentarz z historią rozmowy
            if (this.config.FEATURES.ADD_CONVERSATION_COMMENT && actions.addComment) {
                try {
                    const comment = this.formatConversationComment(
                        actions.commentPrefix, 
                        outcomeLabel, 
                        conversationData
                    );
                    await this.addComment(cardId, comment, token);
                    results.actions.comment = 'added';
                } catch (error) {
                    results.errors.push({ action: 'addComment', error: error.message });
                }
            }

            // 4. Przenieś kartę na odpowiednią listę (na końcu, żeby nie zginęła z widoku)
            if (this.config.FEATURES.AUTO_MOVE_CARDS && actions.moveToList) {
                try {
                    const listId = this.config.LISTS[actions.moveToList];
                    if (listId && listId !== 'WPISZ_ID_LISTY') {
                        await this.moveCard(cardId, listId, token);
                        results.actions.move = 'moved';
                    } else {
                        results.errors.push({ action: 'moveCard', error: 'List ID not configured' });
                    }
                } catch (error) {
                    results.errors.push({ action: 'moveCard', error: error.message });
                }
            }

            return results;

        } catch (error) {
            console.error('Error executing outcome actions:', error);
            return {
                success: false,
                error: error.message,
                actions: {},
                errors: [{ action: 'general', error: error.message }]
            };
        }
    }

    /**
     * Dodaje etykietę do karty
     */
    async addLabel(cardId, labelName, token) {
        // Najpierw pobierz dostępne etykiety na tablicy
        const board = await this.t.board('id', 'labels');
        const boardLabels = board.labels || [];

        // Znajdź etykietę o danej nazwie
        const labelConfig = this.config.LABELS[labelName];
        let label = boardLabels.find(l => l.name === labelConfig);

        // Jeśli etykiety nie ma, stwórz ją (wymaga uprawnień)
        if (!label) {
            console.warn(`Label "${labelConfig}" not found. Card will not be labeled.`);
            return;
        }

        // Dodaj etykietę do karty
        const url = `https://api.trello.com/1/cards/${cardId}/idLabels?key=${this.appKey}&token=${token}&value=${label.id}`;
        
        const response = await fetch(url, { method: 'POST' });
        
        if (!response.ok) {
            throw new Error(`Failed to add label: ${response.status}`);
        }

        return label;
    }

    /**
     * Ustawia due date na karcie (z godziną)
     */
    async setDueDate(cardId, dateString, timeString, token) {
        // dateString format: YYYY-MM-DD
        // timeString format: HH:MM (np. "10:00")
        const [hours, minutes] = timeString ? timeString.split(':') : ['9', '0'];
        const date = new Date(dateString);
        date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        const dueDate = date.toISOString();

        const url = `https://api.trello.com/1/cards/${cardId}?key=${this.appKey}&token=${token}&due=${encodeURIComponent(dueDate)}`;
        
        const response = await fetch(url, { method: 'PUT' });
        
        if (!response.ok) {
            throw new Error(`Failed to set due date: ${response.status}`);
        }

        return dueDate;
    }
    
    /**
     * Aktualizuje opis karty (description) - dla adresu
     */
    async updateDescription(cardId, description, token) {
        const url = `https://api.trello.com/1/cards/${cardId}?key=${this.appKey}&token=${token}&desc=${encodeURIComponent(description)}`;
        
        const response = await fetch(url, { method: 'PUT' });
        
        if (!response.ok) {
            throw new Error(`Failed to update description: ${response.status}`);
        }

        return true;
    }
    
    /**
     * Dodaje wiele etykiet na raz (z listy ID)
     */
    async addMultipleLabels(cardId, labelIds, token) {
        const results = [];
        
        for (const labelId of labelIds) {
            try {
                const url = `https://api.trello.com/1/cards/${cardId}/idLabels?key=${this.appKey}&token=${token}&value=${labelId}`;
                const response = await fetch(url, { method: 'POST' });
                
                if (response.ok) {
                    results.push({ labelId, success: true });
                } else {
                    results.push({ labelId, success: false, error: response.status });
                }
            } catch (error) {
                results.push({ labelId, success: false, error: error.message });
            }
        }
        
        return results;
    }

    /**
     * Dodaje komentarz do karty
     */
    async addComment(cardId, comment, token) {
        const url = `https://api.trello.com/1/cards/${cardId}/actions/comments?key=${this.appKey}&token=${token}&text=${encodeURIComponent(comment)}`;
        
        const response = await fetch(url, { method: 'POST' });
        
        if (!response.ok) {
            throw new Error(`Failed to add comment: ${response.status} - ${await response.text()}`);
        }

        return true;
    }

    /**
     * Przenosi kartę na inną listę
     */
    async moveCard(cardId, listId, token) {
        const url = `https://api.trello.com/1/cards/${cardId}?key=${this.appKey}&token=${token}&idList=${listId}`;
        
        const response = await fetch(url, { method: 'PUT' });
        
        if (!response.ok) {
            throw new Error(`Failed to move card: ${response.status}`);
        }

        return listId;
    }

    /**
     * Formatuje komentarz z historią rozmowy
     */
    formatConversationComment(prefix, outcome, conversationData) {
        const { history, selectedDate } = conversationData;

        let comment = `## ${prefix}\n\n`;
        comment += `**Wynik:** ${outcome}\n`;
        
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            const formatted = dateObj.toLocaleDateString('pl-PL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            comment += `**Data spotkania:** ${formatted}\n`;
        }
        
        comment += `\n**Historia rozmowy:**\n\n`;

        history.forEach((item, index) => {
            comment += `${index + 1}. **${item.stepName}**\n`;
            const truncatedSay = item.said.substring(0, 150);
            comment += `   → *"${truncatedSay}${item.said.length > 150 ? '...' : ''}"*\n`;
            comment += `   ← **${item.response}**\n\n`;
        });

        comment += `\n---\n*Wygenerowano automatycznie przez Rainbow Telemarketing Scripts v1.2*`;

        return comment;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrelloAutomation;
}

