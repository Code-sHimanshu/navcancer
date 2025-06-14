// Chatbot Configuration
const chatbotConfig = {
    welcomeMessage: "Hello! I'm your navigation assistant. How can I help you today?",
    suggestions: [
        "Show me the main pages",
        "AI-based prediction",
        "Show me external links",
        "Find cancer centers",
        "Show me questions to ask"
    ]
};

// Chatbot UI Elements
const chatbotHTML = `
<div id="chatbot-container" class="chatbot-container hidden">
    <div id="chatbot-header" class="chatbot-header">
        <span>Navigation Assistant</span>
        <button id="chatbot-minimize" class="chatbot-minimize">−</button>
    </div>
    <div id="chatbot-messages" class="chatbot-messages"></div>
    <div id="chatbot-suggestions" class="chatbot-suggestions"></div>
    <div class="chatbot-input-container">
        <input type="text" id="chatbot-input" placeholder="Type your question here...">
        <button id="chatbot-send">Send</button>
    </div>
</div>
<button id="chatbot-toggle" class="chatbot-toggle">
    <i class="fas fa-robot"></i>
</button>
`;

// Add chatbot styles
const chatbotStyles = `
.chatbot-container {
    position: fixed;
    top: 50px;
    right: 50px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(4, 60, 246);
    display: flex;
    flex-direction: column;
    z-index: 1000;
    transition: all 0.3s ease;
}

.chatbot-header {
    padding: 15px;
    background:rgb(6, 123, 240);
    color: white;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chatbot-minimize {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
}

.chatbot-messages {
    flex-grow: 1;
    padding: 15px;
    overflow-y: auto;
    color: white;
}

.chatbot-message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
}

.bot-message {
    background:rgb(5, 101, 246);
    margin-right: auto;
    color: rgb(255, 238, 0);
}

.user-message {
    background:rgb(255, 217, 0);
    color: rgb(5, 101, 246);
    margin-left: auto;
}

.chatbot-suggestions {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.suggestion-chip {
    background:rgb(169, 121, 241);
    padding: 5px 10px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.3s ease;
}

.suggestion-chip:hover {
    background:rgb(4, 245, 229);
}

.chatbot-input-container {
    padding: 10px;
    display: flex;
    gap: 10px;
    border-top: 1px solid #eee;
}

#chatbot-input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;
}

#chatbot-send {
    padding: 8px 15px;
    background:rgb(0, 128, 255);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.chatbot-toggle {
    position: fixed;
    top: 20px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgb(6, 123, 240);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 0 10px rgb(255, 225, 1);
    z-index: 999;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chatbot-toggle i {
    font-size: 24px;
}

.chatbot-toggle:hover {
    transform: scale(1.1);
}

.chatbot-buttons-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
}

.chatbot-nav-button {
    background:rgb(0, 117, 234);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.3s ease;
    font-size: 14px;
    width: 100%;
}

.chatbot-nav-button:hover {
    background:rgb(6, 116, 226);
}

.hidden {
    display: none !important;
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = chatbotStyles;
document.head.appendChild(styleSheet);

// Add chatbot HTML to document
document.body.insertAdjacentHTML('beforeend', chatbotHTML);

// Chatbot functionality
class Chatbot {
    constructor() {
        this.container = document.getElementById('chatbot-container');
        this.toggle = document.getElementById('chatbot-toggle');
        this.minimize = document.getElementById('chatbot-minimize');
        this.messages = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.send = document.getElementById('chatbot-send');
        this.suggestions = document.getElementById('chatbot-suggestions');
        
        this.initializeEventListeners();
        this.showWelcomeMessage();
    }

    initializeEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChatbot());
        this.minimize.addEventListener('click', () => this.toggleChatbot());
        this.send.addEventListener('click', () => this.handleUserInput());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
    }

    toggleChatbot() {
        this.container.classList.toggle('hidden');
        this.toggle.classList.toggle('hidden');
    }

    showWelcomeMessage() {
        this.addMessage(chatbotConfig.welcomeMessage, 'bot');
        this.showSuggestions();
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        // Check if the text contains HTML (for buttons)
        if (text.includes('<button')) {
            messageDiv.innerHTML = text;
        } else {
            messageDiv.textContent = text;
        }
        
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    createButton(text, url) {
        return `<button class="chatbot-nav-button" onclick="window.open('${url}', '_blank')">${text}</button>`;
    }

    showSuggestions() {
        this.suggestions.innerHTML = '';
        chatbotConfig.suggestions.forEach(suggestion => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => this.handleSuggestion(suggestion));
            this.suggestions.appendChild(chip);
        });
    }

    handleSuggestion(suggestion) {
        this.addMessage(suggestion, 'user');
        this.processUserInput(suggestion);
    }

    handleUserInput() {
        const text = this.input.value.trim();
        if (text) {
            this.addMessage(text, 'user');
            this.processUserInput(text);
            this.input.value = '';
        }
    }

    processUserInput(input) {
        // Convert input to lowercase for easier matching
        const query = input.toLowerCase();
        
        // Define navigation responses and actions
        const responses = {
            'show me the main pages': 'Here are the main pages you can visit:\n1. Home (index.html)\n2. Guidelines (guidelines.html)\n3. Lung Cancer Guidelines (lung-cancer-guidelines.html)\n4. Choose Type (choose-type.html)',
            'where can i find guidelines': 'You can find guidelines in two places:\n1. General Guidelines (guidelines.html)\n2. Specific Lung Cancer Guidelines (lung-cancer-guidelines.html)',
            'tell me about lung cancer information': 'You can find detailed lung cancer information in the following sections:\n1. Tailored Information (tailored-information/)\n2. Cancer Center Information (cancer-center/)\n3. Questions to Ask (questions-to-ask/)',
            'what questions should i ask': 'You can find a comprehensive list of questions in the questions-to-ask/ directory. These questions are specifically curated to help you get the most out of your medical consultations.',
            'take me to services offered': {
                message: 'Taking you to the Services Offered section...',
                action: () => {
                    const servicesDropdown = document.querySelector('.nav-title:contains("Services Offered")');
                    if (servicesDropdown) {
                        servicesDropdown.click();
                    }
                }
            },
            'ai-based prediction': {
                message: 'Taking you to the AI-based prediction tool...',
                action: () => {
                    window.open('https://lungscan-ai.streamlit.app/', '_blank');
                }
            },
            'show me external links': {
                message: 'Here are the external links available:',
                action: () => {
                    const externalLinksButtons = `
                        <div class="chatbot-buttons-container">
                            ${this.createButton('SHUATS', 'https://shuats.edu.in/')}
                            ${this.createButton('ICPC', 'https://unite4cancer.com/')}
                            ${this.createButton('MOHFW', 'https://www.mohfw.gov.in/')}
                            ${this.createButton('ICMR', 'https://www.icmr.gov.in/')}
                            ${this.createButton('DBT', 'https://dbtindia.gov.in/')}
                            ${this.createButton('DST', 'https://dst.gov.in/')}
                            ${this.createButton('CSIR', 'https://www.csir.res.in/')}
                            ${this.createButton('DHR', 'https://dhr.gov.in/')}
                        </div>
                    `;
                    setTimeout(() => {
                        this.addMessage(externalLinksButtons, 'bot');
                    }, 500);
                }
            },
            'find cancer centers': {
                message: 'I can help you find cancer centers. Here are your options:',
                action: () => {
                    const cancerCenterButtons = `
                        <div class="chatbot-buttons-container">
                            ${this.createButton('Search Cancer Centers', './cancer-center/cancer-certer-form.html')}
                            ${this.createButton('View All Cancer Centers', './cancer-center/show-cancer-centers.html')}
                        </div>
                        <p style="margin-top: 10px; font-size: 14px; color: white;">
                            You can search for cancer centers by:
                            <br>• Country (India)
                            <br>• State (Uttar Pradesh, Bihar)
                            <br>• City
                            <br><br>
                            Each center listing includes:
                            <br>• Hospital name and address
                            <br>• Contact information
                            <br>• Website link
                        </p>
                    `;
                    setTimeout(() => {
                        this.addMessage(cancerCenterButtons, 'bot');
                    }, 500);
                }
            },
            'show me questions to ask': {
                message: 'Here are the different categories of questions you can ask your healthcare provider:',
                action: () => {
                    const questionsButtons = `
                        <div class="chatbot-buttons-container">
                            ${this.createButton('Risk Assessment Questions', './questions-to-ask/questions.html?category=risk')}
                        </div>
                        <p style="margin-top: 10px; font-size: 14px; color: white;">
                            These questions are designed to help you:
                            <br>• Understand your risk factors
                            <br>• Learn about insurance coverage
                            <br>• Prepare for screening procedures
                            <br>• Understand test results
                            <br>• Know what to expect from biopsies
                            <br><br>
                            Tips for using these questions:
                            <br>• Write down questions before your visit
                            <br>• Take notes during the appointment
                            <br>• Bring someone to help take notes
                            <br>• Ask for clarification when needed
                        </p>
                    `;
                    setTimeout(() => {
                        this.addMessage(questionsButtons, 'bot');
                    }, 500);
                }
            }
        };

        // Find the best matching response
        let response = "I'm not sure about that. Could you please rephrase your question?";
        let action = null;

        for (const [key, value] of Object.entries(responses)) {
            if (query.includes(key)) {
                if (typeof value === 'object') {
                    response = value.message;
                    action = value.action;
                } else {
                    response = value;
                }
                break;
            }
        }

        // Add a small delay to make it feel more natural
        setTimeout(() => {
            this.addMessage(response, 'bot');
            if (action) {
                action();
            }
            this.showSuggestions();
        }, 500);
    }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 