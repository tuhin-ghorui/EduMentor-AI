// DOM Elements
const typingText = document.getElementById('typing-text');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const loadingOverlay = document.getElementById('loading-overlay');

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingOverlay.classList.add('hide');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000); // Show loading for 2 seconds
});

// Typing Effect
function typeWriter(text, i = 0) {
    if (i < text.length) {
        typingText.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        setTimeout(() => typeWriter(text, i + 1), 100);
    } else {
        typingText.innerHTML = text;
    }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const originalText = "Learn Smarter with AI";
    typingText.innerHTML = '';
    setTimeout(() => typeWriter(originalText), 500);
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth Scroll Navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event listeners to nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Dark Mode Toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update toggle icon
    const icon = darkModeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
const icon = darkModeToggle.querySelector('i');
if (savedTheme === 'dark') {
    icon.className = 'fas fa-sun';
}

darkModeToggle.addEventListener('click', toggleDarkMode);

// Back to Top Button
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', toggleBackToTop);

// Fade-in Animation on Scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .timeline-item, .dashboard-card, .testimonial-card, .stat');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('fade-in', 'visible');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Chatbot Functionality

// Function to append a message to the chat
function appendMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message premium-bubble' : 'ai-message premium-bubble'}`;

    if (!isUser) {
        // Add AI avatar for AI messages
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarIcon = document.createElement('i');
        avatarIcon.className = 'fas fa-robot';
        avatarDiv.appendChild(avatarIcon);
        messageDiv.appendChild(avatarDiv);
    }

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    const messageP = document.createElement('p');
    messageP.textContent = message;
    messageContent.appendChild(messageP);

    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Auto scroll to latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageDiv;
}

// Function to show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message premium-bubble typing-indicator';
    typingDiv.id = 'typing-indicator';

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    const avatarIcon = document.createElement('i');
    avatarIcon.className = 'fas fa-robot';
    avatarDiv.appendChild(avatarIcon);
    typingDiv.appendChild(avatarDiv);

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    const typingP = document.createElement('p');
    typingP.textContent = 'AI is typing...';
    messageContent.appendChild(typingP);

    typingDiv.appendChild(messageContent);
    chatMessages.appendChild(typingDiv);

    // Auto scroll to typing indicator
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typingDiv;
}

// Function to hide typing indicator
function hideTyping() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Intelligent fallback responses for testing without active API
function getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Math topics
    if (message.includes('math') || message.includes('algebra') || message.includes('calculus') || message.includes('equation') || message.includes('geometry')) {
        if (message.includes('solve')) {
            return "To solve equations:\n1. Isolate the variable\n2. Apply inverse operations to both sides\n3. Simplify and check your answer\n\nFor example: 2x + 3 = 7\nStep 1: Subtract 3 from both sides → 2x = 4\nStep 2: Divide by 2 → x = 2\n\nWhat specific equation are you working on?";
        }
        if (message.includes('derivative') || message.includes('integral')) {
            return "Calculus focuses on rates of change (derivatives) and accumulation (integrals).\n\nDerivatives tell you how fast something is changing at a moment.\nIntegrals tell you the total accumulation over a range.\n\nWould you like me to explain a specific calculus concept?";
        }
        return "Mathematics is about problem-solving and logical thinking. Break complex problems into smaller steps.\n\n1. Understand what's being asked\n2. Plan your approach\n3. Execute your solution\n4. Verify your answer\n\nWhat math topic can I help you with today?";
    }

    // Programming/Coding topics
    if (message.includes('code') || message.includes('program') || message.includes('python') || message.includes('javascript') || message.includes('bug') || message.includes('error')) {
        if (message.includes('error') || message.includes('bug') || message.includes('wrong')) {
            return "Debugging Steps:\n1. Read the error message carefully - it tells you what's wrong\n2. Check the line number mentioned in the error\n3. Look for common issues:\n   - Typos in variable/function names\n   - Missing semicolons or brackets\n   - Wrong data types\n4. Use console.log() to print values and trace the problem\n5. Compare your code with working examples\n\nShare the error message and I'll help!";
        }
        if (message.includes('learn') || message.includes('start')) {
            return "Great! Here's how to start programming:\n\n1. Choose a language (Python is beginner-friendly)\n2. Learn basics: variables, data types, loops, conditions\n3. Practice with small projects\n4. Build increasingly complex programs\n5. Read others' code to learn patterns\n\nWhich programming language interests you?";
        }
        return "Programming is about breaking problems into steps your computer can follow.\n\nKey concepts:\n- Variables store information\n- Loops repeat actions\n- Conditions make decisions\n- Functions organize code\n\nStart simple, then build complexity. What would you like to learn?";
    }

    // Science topics
    if (message.includes('science') || message.includes('physics') || message.includes('chemistry') || message.includes('biology')) {
        if (message.includes('physics')) {
            return "Physics explains how the physical world works through laws and principles.\n\nKey areas:\n- Mechanics: Motion and forces\n- Energy: Conservation and transformation\n- Waves: Sound and light\n- Thermodynamics: Heat and temperature\n\nRemember: F = ma, E = mc², and Newton's laws govern motion.\n\nWhich physics topic interests you?";
        }
        if (message.includes('chemistry')) {
            return "Chemistry studies matter, reactions, and how substances interact.\n\nKey concepts:\n- Elements and atoms\n- Chemical bonds (ionic, covalent)\n- Reactions and equations\n- Acids, bases, and pH\n\nStart by understanding the periodic table and atomic structure. What would you like to learn?";
        }
        if (message.includes('biology')) {
            return "Biology is the study of living organisms and life processes.\n\nKey areas:\n- Cell structure and function\n- DNA and genetics\n- Evolution\n- Ecology and ecosystems\n\nUnderstand cells first - they're the basic unit of life. Any specific biology topic?";
        }
        return "Science uses observation, experimentation, and analysis to understand the natural world.\n\nScientific method:\n1. Observe and ask questions\n2. Form a hypothesis\n3. Design an experiment\n4. Collect and analyze data\n5. Draw conclusions\n\nWhich science subject interests you?";
    }

    // Exam/Study tips
    if (message.includes('exam') || message.includes('test') || message.includes('study') || message.includes('prepare')) {
        return "Effective Exam Preparation:\n\n1. **Start Early**: Don't cram. Begin 2-3 weeks before\n2. **Organize Material**: Group topics logically\n3. **Practice Problems**: Do past papers and exercises\n4. **Active Recall**: Test yourself regularly\n5. **Spaced Repetition**: Review material over time\n6. **Study Groups**: Discuss with peers\n7. **Get Rest**: Sleep is crucial for memory consolidation\n8. **Manage Anxiety**: Practice relaxation techniques\n\nCreate a study schedule with specific topics for each day. What exam are you preparing for?";
    }

    // History/Literature
    if (message.includes('history') || message.includes('literature') || message.includes('novel') || message.includes('essay')) {
        if (message.includes('essay')) {
            return "Essay Writing Structure:\n\n1. **Introduction**: Hook + thesis statement\n2. **Body Paragraphs**: Each has topic sentence + evidence + analysis\n3. **Conclusion**: Restate thesis + summarize key points\n\nTips:\n- Use clear topic sentences\n- Support claims with evidence\n- Explain the significance of your evidence\n- Maintain consistent tone and structure\n\nWhat type of essay are you writing?";
        }
        return "History teaches us by examining past events, causes, and consequences.\n\nWhen studying history:\n- Understand the context (time, place, culture)\n- Identify causes and effects\n- Consider multiple perspectives\n- Analyze primary sources\n- Look for patterns and lessons\n\nWhat historical period interests you?";
    }

    // Languages
    if (message.includes('language') || message.includes('english') || message.includes('spanish') || message.includes('french') || message.includes('grammar')) {
        if (message.includes('grammar')) {
            return "Grammar Fundamentals:\n\n1. **Parts of Speech**: Nouns, verbs, adjectives, adverbs, etc.\n2. **Sentence Structure**: Subject + verb + object\n3. **Tenses**: Past, present, future\n4. **Common Issues**:\n   - Subject-verb agreement\n   - Pronoun reference\n   - Comma usage\n\nPractice tip: Read quality writing and identify grammar patterns. What grammar concept confused you?";
        }
        return "Language Learning Strategy:\n\n1. **Listen**: Expose yourself to the language daily\n2. **Read**: Start with simple texts, progress to complex\n3. **Write**: Journal or practice writing\n4. **Speak**: Talk to yourself or find conversation partners\n5. **Immerse**: Change your phone/computer language settings\n6. **Consistency**: 15-30 minutes daily beats occasional long sessions\n\nWhich language are you learning?";
    }

    // Career guidance
    if (message.includes('career') || message.includes('job') || message.includes('major') || message.includes('future')) {
        return "Career Planning Guide:\n\n1. **Explore**: Research different career paths\n2. **Assess**: Know your strengths, interests, and values\n3. **Learn**: Develop relevant skills through education\n4. **Network**: Connect with professionals in your field\n5. **Gain Experience**: Internships, projects, volunteering\n6. **Adapt**: Career paths evolve - stay flexible\n7. **Upskill**: Continuous learning is essential\n\nWhat career field interests you?";
    }

    // General learning
    if (message.includes('how') || message.includes('what') || message.includes('why') || message.includes('explain')) {
        return "I'm here to help you learn! Ask me about:\n\n✓ Math, Science, Coding, Languages\n✓ Study strategies and exam prep\n✓ History, Literature, Writing\n✓ Career guidance and skill development\n✓ Any academic topic!\n\nBe specific with your question for the best help. What would you like to learn about?";
    }

    // Default helpful response
    return "I'm EduMentor AI, your learning companion! I can help with:\n\n📚 Academic subjects (Math, Science, History, Languages)\n💻 Programming and coding\n📖 Writing and essays\n🎯 Exam preparation and study tips\n🚀 Career guidance\n\nAsk me anything related to your studies, and I'll provide clear, helpful explanations!";
}

// Function to get AI response from Google Gemini API
async function getAIResponse(userMessage) {
    try {
        // Show typing indicator
        showTyping();

        // Add a small delay to simulate thinking (UX enhancement)
        await new Promise(resolve => setTimeout(resolve, 800));

        // Try Gemini API first (if configured properly)
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        const payload = {
            contents: [{
                parts: [{
                    text: `${SYSTEM_PROMPT}\n\nStudent: ${userMessage}\n\nEduMentor AI:`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 512
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            // Hide typing indicator
            hideTyping();
            const aiText = data.candidates[0].content.parts[0].text.trim();
            
            if (aiText && aiText.length > 0) {
                return aiText;
            }
        }

        // If API fails, use fallback
        console.warn('Gemini API not available, using fallback responses');
        hideTyping();
        return getFallbackResponse(userMessage);

    } catch (error) {
        console.warn('Gemini API unavailable, using intelligent fallback:', error.message);
        hideTyping();
        return getFallbackResponse(userMessage);
    }
}

// Main function to send message
async function sendMessage() {
    const message = userInput.value.trim();

    // Prevent empty messages
    if (message === '') return;

    // Add user message to chat
    appendMessage(message, true);

    // Clear input field
    userInput.value = '';

    // Disable input and send button while processing
    userInput.disabled = true;
    const sendBtn = document.querySelector('.send-btn');
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.5';

    try {
        // Get AI response
        const aiResponse = await getAIResponse(message);

        // Add AI response to chat
        appendMessage(aiResponse);

    } catch (error) {
        console.error('Error in sendMessage:', error);
        appendMessage("Sorry, AI is temporarily unavailable. Please try again.");
    } finally {
        // Re-enable input and send button
        userInput.disabled = false;
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';

        // Focus back to input
        userInput.focus();
    }
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simulate form submission
    alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);

    // Reset form
    contactForm.reset();
});

// Navbar background change on scroll
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }
}

window.addEventListener('scroll', updateNavbar);

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize animations on load
window.addEventListener('load', () => {
    animateProgressBars();
    fadeInOnScroll();
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Smooth hover effects for cards
document.querySelectorAll('.feature-card, .dashboard-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Typing cursor animation
setInterval(() => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }
}, 500);