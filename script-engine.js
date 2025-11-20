// Script Engine - Branching Logic
class ScriptEngine {
    constructor() {
        this.currentScript = null;
        this.currentStep = 'start';
        this.history = [];
        this.scriptData = null;
    }

    async loadScript(scriptName) {
        try {
            const response = await fetch(`./scripts/${scriptName}.json`);
            this.scriptData = await response.json();
            this.currentScript = scriptName;
            this.currentStep = 'start';
            this.history = [];
            return true;
        } catch (error) {
            console.error('Błąd ładowania skryptu:', error);
            return false;
        }
    }

    getCurrentStep() {
        if (!this.scriptData || !this.scriptData.steps[this.currentStep]) {
            return null;
        }
        return this.scriptData.steps[this.currentStep];
    }

    selectResponse(responseIndex) {
        const currentStep = this.getCurrentStep();
        if (!currentStep || !currentStep.responses[responseIndex]) {
            return false;
        }

        const response = currentStep.responses[responseIndex];

        // Zapisz w historii
        this.history.push({
            step: this.currentStep,
            stepName: currentStep.name || this.currentStep,
            said: currentStep.say,
            response: response.label
        });

        // Przejdź do następnego kroku
        if (response.next === null) {
            // Koniec skryptu
            return { end: true, outcome: response.label };
        } else {
            this.currentStep = response.next;
            return { end: false };
        }
    }

    goBack() {
        if (this.history.length === 0) {
            return false;
        }

        // Usuń ostatni wpis z historii
        this.history.pop();

        // Wróć do poprzedniego kroku
        if (this.history.length > 0) {
            const lastHistory = this.history[this.history.length - 1];
            // Znajdź następny krok z ostatniego wpisu historii
            const lastStep = this.scriptData.steps[lastHistory.step];
            const lastResponse = lastStep.responses.find(r => r.label === lastHistory.response);
            this.currentStep = lastResponse.next;
        } else {
            // Wróć do startu
            this.currentStep = 'start';
        }

        return true;
    }

    getHistory() {
        return this.history;
    }

    reset() {
        this.currentStep = 'start';
        this.history = [];
    }
}

// UI Controller
class ScriptUI {
    constructor(engine) {
        this.engine = engine;
        this.initElements();
        this.attachEventListeners();
    }

    initElements() {
        this.scriptText = document.getElementById('script-text');
        this.responseButtons = document.getElementById('response-buttons');
        this.backBtn = document.getElementById('back-btn');
        this.closeBtn = document.getElementById('close-btn');
        this.campaignSelector = document.getElementById('campaign-selector');
        this.historyPanel = document.getElementById('history-panel');
        this.historyList = document.getElementById('history-list');
    }

    attachEventListeners() {
        this.backBtn.addEventListener('click', () => this.handleBack());
        this.closeBtn.addEventListener('click', () => this.handleClose());
        this.campaignSelector.addEventListener('change', (e) => this.handleCampaignChange(e.target.value));
    }

    async loadScript(scriptName) {
        const loaded = await this.engine.loadScript(scriptName);
        if (loaded) {
            this.render();
        } else {
            this.showError('Nie można załadować skryptu');
        }
    }

    render() {
        const step = this.engine.getCurrentStep();

        if (!step) {
            this.showError('Błąd: brak kroku');
            return;
        }

        // Wyświetl tekst do powiedzenia
        this.scriptText.textContent = step.say;

        // Wyczyść przyciski
        this.responseButtons.innerHTML = '';

        // Wygeneruj przyciski odpowiedzi
        step.responses.forEach((response, index) => {
            const button = document.createElement('button');
            button.className = 'response-btn';
            button.textContent = response.label;

            // Dodaj klasy kolorów jeśli są oznaczenia
            if (response.label.includes('✅') || response.label.toLowerCase().includes('umówiono')) {
                button.classList.add('success');
            } else if (response.label.includes('❌') || response.label.toLowerCase().includes('nie zainteresowany')) {
                button.classList.add('danger');
            } else if (response.label.toLowerCase().includes('oddzwonić') || response.label.toLowerCase().includes('później')) {
                button.classList.add('warning');
            }

            button.addEventListener('click', () => this.handleResponse(index));
            this.responseButtons.appendChild(button);
        });

        // Pokaż/ukryj przycisk cofnij
        this.backBtn.style.display = this.engine.history.length > 0 ? 'block' : 'none';

        // Aktualizuj historię
        this.updateHistory();
    }

    handleResponse(index) {
        const result = this.engine.selectResponse(index);

        if (result.end) {
            this.showEndScreen(result.outcome);
        } else {
            this.render();
        }
    }

    handleBack() {
        const success = this.engine.goBack();
        if (success) {
            this.render();
        }
    }

    handleClose() {
        if (window.TrelloPowerUp) {
            window.TrelloPowerUp.iframe().close();
        } else {
            window.close();
        }
    }

    handleCampaignChange(scriptName) {
        this.engine.reset();
        this.loadScript(scriptName);
    }

    updateHistory() {
        const history = this.engine.getHistory();

        if (history.length === 0) {
            this.historyPanel.style.display = 'none';
            return;
        }

        this.historyPanel.style.display = 'block';
        this.historyList.innerHTML = '';

        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = `${index + 1}. ${item.stepName || 'Krok'} → ${item.response}`;
            this.historyList.appendChild(historyItem);
        });
    }

    showEndScreen(outcome) {
        const container = document.getElementById('script-content');
        container.innerHTML = `
            <div class="end-screen">
                <h3>✅ Rozmowa zakończona</h3>
                <p><strong>Wynik:</strong> ${outcome}</p>
                <p>Możesz teraz zaktualizować kartę w Trello i zamknąć to okno.</p>
            </div>
        `;

        // Zmień tekst przycisku zamknij
        this.closeBtn.textContent = '✓ Zamknij i wróć do Trello';
        this.backBtn.style.display = 'none';
    }

    showError(message) {
        const container = document.getElementById('script-content');
        container.innerHTML = `
            <div class="end-screen">
                <h3>⚠️ Błąd</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Inicjalizacja po załadowaniu DOM
let scriptEngine;
let scriptUI;

document.addEventListener('DOMContentLoaded', () => {
    scriptEngine = new ScriptEngine();
    scriptUI = new ScriptUI(scriptEngine);

    // Załaduj domyślny skrypt
    scriptUI.loadScript('rainbow-odkurzacz');
});
