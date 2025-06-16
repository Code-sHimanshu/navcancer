// Chatbot Configuration
const chatbotConfig = {
    welcomeMessage: "Hello! I'm your navigation assistant. How can I help you today?",
    suggestions: [
        "Main pages",
        "AI-based prediction",
        "External links",
        "Find cancer centers",
        "Questions to ask"
    ],
    aiPredictionKeywords: ["ai", "prediction", "tool", "diagnosis", "predict", "forecast", "analyze", "analysis"]
};

// Chatbot UI Elements
const chatbotHTML = `
<div id="chatbot-container" class="chatbot-container hidden">
    <div id="chatbot-header" class="chatbot-header">
        <span>Navigation Assistant</span>
        <div class="chatbot-header-buttons">
            <button id="chatbot-clear" class="chatbot-header-button" title="Clear Chat">
                <i class="fas fa-trash"></i>
            </button>
            <button id="chatbot-minimize" class="chatbot-minimize">−</button>
        </div>
    </div>
    <div id="chatbot-messages" class="chatbot-messages"></div>
    <div id="chatbot-suggestions" class="chatbot-suggestions"></div>
    <div class="chatbot-input-container">
        <div class="chatbot-input-actions">
            <button id="chatbot-voice-input" class="chatbot-input-button" title="Voice Input">
                <i class="fas fa-microphone"></i>
            </button>
            <label for="chatbot-file-input" class="chatbot-input-button" title="Attach File">
                <i class="fas fa-paperclip"></i>
            </label>
            <input type="file" id="chatbot-file-input" accept=".pdf,.jpg,.jpeg,.png" hidden>
        </div>
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

.chatbot-header-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
}

.chatbot-header-button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 5px;
    transition: transform 0.2s ease;
}

.chatbot-header-button:hover {
    transform: scale(1.1);
}

.chatbot-input-actions {
    display: flex;
    gap: 5px;
}

.chatbot-input-button {
    background: none;
    border: none;
    color: rgb(0, 128, 255);
    font-size: 18px;
    cursor: pointer;
    padding: 5px;
    transition: color 0.2s ease;
}

.chatbot-input-button:hover {
    color: rgb(6, 116, 226);
}

.chatbot-file-preview {
    max-width: 200px;
    max-height: 200px;
    margin: 5px 0;
    border-radius: 5px;
}

.chatbot-pdf-preview {
    width: 100%;
    height: 200px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.recording-indicator {
    color: red;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
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
        this.clearButton = document.getElementById('chatbot-clear');
        this.voiceInputButton = document.getElementById('chatbot-voice-input');
        this.fileInput = document.getElementById('chatbot-file-input');
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.maxRecordingDuration = 60000; // 60 seconds
        this.recordingTimeout = null;
        this.recognition = null;
        this.setupSpeechRecognition();
        
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
        
        // Clear chat button
        this.clearButton.addEventListener('click', () => this.clearChat());
        
        // Voice input button
        this.voiceInputButton.addEventListener('click', () => this.toggleVoiceInput());
        
        // File input
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
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
        console.log('Processing user input:', input); // Debug log
        const lowerInput = input.toLowerCase();
        console.log('Lowercased input for processing:', lowerInput); // Debug log
        
        // Check for AI prediction related keywords
        if (chatbotConfig.aiPredictionKeywords.some(keyword => lowerInput.includes(keyword))) {
            this.addMessage("I can help you with our AI Prediction Tool. Would you like to:", 'bot');
            this.addMessage(`
                <div class="chatbot-buttons-container">
                    <button class="chatbot-nav-button" onclick="window.location.href='ai-prediction.html'">Open AI Prediction Tool</button>
                    <button class="chatbot-nav-button" onclick="window.location.href='ai-prediction-guide.html'">Learn More About AI Predictions</button>
                </div>
            `, 'bot');
            return;
        }

        // Define navigation responses and actions with flexible keywords
        const responses = [
            {
                keywords: ['show', 'main', 'pages', 'home', 'homepage', 'start'],
                response: 'Here are the main pages you can visit:\n1. Home (index.html)\n2. Guidelines (guidelines.html)\n3. Lung Cancer Guidelines (lung-cancer-guidelines.html)\n4. Choose Type (choose-type.html)',
                matchType: 'every'
            },
            {
                keywords: ['about', 'us', 'history', 'who', 'we', 'are', 'company', 'organization'],
                response: 'You can find information about our history on the About Us page: <a href="/about.html" target="_blank">About Us - History</a>',
                matchType: 'every'
            },
            {
                keywords: ['profile', 'our', 'profile', 'view', 'profile'],
                response: 'You can view our organization\'s profile here: <a href="/profile.html" target="_blank">Our Profile</a>',
                matchType: 'every'
            },
            {
                keywords: ['faqs', 'frequently', 'asked', 'questions', 'common', 'questions'],
                response: 'For frequently asked questions, please visit our FAQs section: <a href="./questions-to-ask/questions-category.html" target="_blank">FAQs</a>',
                matchType: 'every'
            },
            {
                keywords: ['administration', 'board', 'team', 'management', 'leaders', 'admin'],
                response: 'Information about our administration and board members can be found here: <a href="/board.html" target="_blank">Administration Board</a>',
                matchType: 'every'
            },
            {
                keywords: ['services', 'offered', 'offer', 'show'], // Simplified keywords for some matching
                matchType: 'some', // Use 'some' for flexible matching
                action: (input) => {
                    const servicesButtons = `
                        <div class="chatbot-buttons-container">
                            ${this.createButton('AI-based Prediction Tool', 'ai-prediction.html')}
                            ${this.createButton('Find Cancer Centers', './cancer-center/cancer-certer-form.html')}
                            ${this.createButton('View All Cancer Centers', './cancer-center/show-cancer-centers.html')}
                            ${this.createButton('Explore External Links', '#')}
                            ${this.createButton('Questions to Ask', './questions-to-ask/questions.html')}
                        </div>
                    `;
                    setTimeout(() => {
                        this.addMessage('Here are some of the services and key sections available:', 'bot');
                        this.addMessage(servicesButtons, 'bot');
                    }, 500);
                }
            },
            {
                keywords: ['ai-based', 'prediction', 'ai', 'prediction', 'tool', 'diagnosis', 'predict', 'forecast', 'analyze', 'analysis'],
                action: () => {
                    window.open('https://navcancer-ai-lungscan.onrender.com/', '_blank');
                },
                matchType: 'every'
            },
            {
                keywords: ['external', 'links'],
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
                        this.addMessage('Here are the external links available:', 'bot');
                        this.addMessage(externalLinksButtons, 'bot');
                    }, 500);
                },
                matchType: 'every'
            },
            {
                keywords: ['find', 'cancer', 'centers', 'hospital', 'database', 'hospitals', 'hospital', 'info', 'hospital', 'information'],
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
                        this.addMessage('I can help you find cancer centers. Here are your options:', 'bot');
                        this.addMessage(cancerCenterButtons, 'bot');
                    }, 500);
                },
                matchType: 'every'
            },
            {
                keywords: ['show', 'questions', 'ask', 'questions'],
                action: () => {
                    const questionsButtons = `
                        <div class="chatbot-buttons-container">
                            ${this.createButton('Risk Assessment Questions', './questions-to-ask/questions.html?category=risk')}
                        </div>
                        <p style="margin-top: 10px; font-size: 14px; color: white;">
                            These questions are designed to help you:
                            <br>• Understand your risk factors
                            <br>• Learn about insurance coverage
                        </p>
                    `;
                    setTimeout(() => {
                        this.addMessage('Here are the different categories of questions you can ask your healthcare provider:', 'bot');
                        this.addMessage(questionsButtons, 'bot');
                    }, 500);
                },
                matchType: 'every'
            },
            {
                keywords: ['information', 'facility', 'health', 'services', 'info', 'facilities'],
                action: () => {
                    const infoServicesButtons = `
                        <p style="margin-top: 10px; font-size: 14px; color: white;">
                            Information and facility health services can be accessed through the Cancer Centers section.
                            You can also explore other relevant sections:
                        </p>
                        <div class="chatbot-buttons-container">
                            ${this.createButton('Search Cancer Centers', './cancer-center/cancer-certer-form.html')}
                            ${this.createButton('View All Cancer Centers', './cancer-center/show-cancer-centers.html')}
                            ${this.createButton('Explore Main Pages', 'index.html')}
                            ${this.createButton('Questions to Ask', './questions-to-ask/questions.html')}
                        </div>
                    `;
                    setTimeout(() => {
                        this.addMessage('Yes, I can help you with information on facilities and health services.', 'bot');
                        this.addMessage(infoServicesButtons, 'bot');
                    }, 500);
                },
                matchType: 'every'
            },
            {
                keywords: ['care', 'hub', 'carehub', 'patient', 'care'],
                response: 'Our Care Hub provides various support and resources: <a href="nav-pages/care-hub.html" target="_blank">Care Hub</a>',
                matchType: 'every'
            },
            {
                keywords: ['research', 'innovation', 'hub', 'research', 'innovate'],
                response: 'The Research and Innovation Hub focuses on advancements in cancer care. Please note: This is a placeholder and may not have a dedicated page yet. If you are a developer, please integrate.',
                matchType: 'every'
            },
            {
                keywords: ['events', 'all', 'events', 'upcoming', 'past', 'webinars', 'event'],
                response: 'You can find information about all our upcoming and past events here: <a href="/events.html" target="_blank">All Events</a>',
                matchType: 'every'
            },
            {
                keywords: ['gallery', 'event', 'photos', 'images', 'pictures', 'media'],
                response: 'View photos and memories from our past events in the Gallery: <a href="/gallery.html" target="_blank">Gallery</a>',
                matchType: 'every'
            },
            {
                keywords: ['patients', 'patient', 'info', 'for', 'patients', 'early', 'detection', 'symptoms', 'preventive'],
                response: 'For patients, we offer vital information on early detection, symptoms, and preventive strategies.',
                matchType: 'every'
            },
            {
                keywords: ['healthcare', 'professionals', 'doctors', 'medical', 'staff', 'treatment', 'protocols'],
                response: 'Healthcare professionals can discover comprehensive resources on treatment protocols and patient quality of life.',
                matchType: 'every'
            },
            {
                keywords: ['industry', 'professionals', 'industry', 'info', 'corporate', 'partners', 'post-treatment'],
                response: 'Industry professionals can gain insights into post-treatment care and recovery strategies.',
                matchType: 'every'
            },
            {
                keywords: ['general', 'support', 'others', 'community', 'help', 'recovery', 'follow-up'],
                response: 'For general support, explore guidance on recovery, follow-up care, and resources for patients and their families.',
                matchType: 'every'
            },
            {
                keywords: ['contact', 'us', 'get', 'in', 'touch', 'reach', 'us', 'feedback', 'inquiry'],
                response: 'You can get in touch with us through the Contact Us section on our homepage.',
                matchType: 'every'
            }
        ];

        for (const entry of responses) {
            let match;
            if (entry.matchType === 'some') {
                match = entry.keywords.some(keyword => lowerInput.includes(keyword));
            } else {
                // Default to 'every' if matchType is not specified or is 'every'
                match = entry.keywords.every(keyword => lowerInput.includes(keyword));
            }

            if (match) {
                if (entry.action) {
                    entry.action(input);
                } else if (entry.response) {
                    this.addMessage(entry.response, 'bot');
                }
                return;
            }
        }

        // Fallback response if no specific match is found
        this.addMessage("I\'m not sure about that. Could you please rephrase your question?", 'bot');
    }

    clearChat() {
        this.messages.innerHTML = '';
        this.showWelcomeMessage();
    }

    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('Voice input transcript:', transcript); // Debug log
                this.addMessage(transcript, 'user');
                this.processUserInput(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.addMessage("Sorry, there was an error with speech recognition. Please try again.", 'bot');
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                this.voiceInputButton.classList.remove('recording-indicator');
                clearTimeout(this.recordingTimeout);
            };
        } else {
            console.error('Speech recognition not supported in this browser');
        }
    }

    async toggleVoiceInput() {
        if (!this.isRecording) {
            if (!this.recognition) {
                this.addMessage("Sorry, speech recognition is not supported in your browser. Please use a modern browser like Chrome.", 'bot');
                return;
            }

            try {
                this.isRecording = true;
                this.voiceInputButton.classList.add('recording-indicator');
                this.recognition.start();
                
                // Set maximum recording duration
                this.recordingTimeout = setTimeout(() => {
                    if (this.isRecording) {
                        this.stopRecording();
                    }
                }, this.maxRecordingDuration);

                // Add recording duration indicator
                this.startRecordingDuration();
            } catch (err) {
                console.error('Error starting speech recognition:', err);
                this.addMessage("Sorry, I couldn't start speech recognition. Please check your browser permissions.", 'bot');
                this.isRecording = false;
                this.voiceInputButton.classList.remove('recording-indicator');
            }
        } else {
            this.stopRecording();
        }
    }

    stopRecording() {
        if (this.recognition && this.isRecording) {
            this.recognition.stop();
            this.isRecording = false;
            this.voiceInputButton.classList.remove('recording-indicator');
            clearTimeout(this.recordingTimeout);
            this.stopRecordingDuration();
        }
    }

    startRecordingDuration() {
        this.recordingStartTime = Date.now();
        this.updateRecordingDuration();
    }

    stopRecordingDuration() {
        clearInterval(this.durationInterval);
        this.recordingDuration = 0;
    }

    updateRecordingDuration() {
        this.durationInterval = setInterval(() => {
            const duration = Math.floor((Date.now() - this.recordingStartTime) / 1000);
            this.recordingDuration = duration;
            this.voiceInputButton.title = `Recording... ${duration}s`;
        }, 1000);
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (file.type === 'application/pdf') {
                this.addMessage(`
                    <div class="chatbot-pdf-preview">
                        <embed src="${e.target.result}" type="application/pdf" width="100%" height="100%">
                    </div>
                    <p>PDF file: ${file.name}</p>
                `, 'user');
            } else if (file.type.startsWith('image/')) {
                this.addMessage(`
                    <img src="${e.target.result}" class="chatbot-file-preview" alt="${file.name}">
                    <p>Image file: ${file.name}</p>
                `, 'user');
            }
        };

        if (file.type === 'application/pdf') {
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            this.addMessage("Sorry, I can only handle PDF and image files.", 'bot');
        }
    }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 