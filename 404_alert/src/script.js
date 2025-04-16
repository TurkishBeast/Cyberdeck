// Screen shake effect on mouse movement
document.addEventListener('mousemove', function(e) {
    if (document.body.classList.contains('calm-mode')) return;
    
    const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
    
    document.body.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    // Reset position after a short delay for a jittery effect
    setTimeout(() => {
        document.body.style.transform = 'translate(0px, 0px)';
    }, 100);
});

// Random warning messages
const warningMessages = [
    "> CRITICAL: Memory corruption detected",
    "> ERROR: Navigation matrix collapsed",
    "> ALERT: Firewall breach imminent",
    "> WARNING: Quantum fluctuations detected",
    "> SYSTEM: Attempting recovery protocols...",
    "> FAILURE: Recovery attempt unsuccessful",
    "> DANGER: Unauthorized access detected",
    "> ALERT: Neural networks destabilizing",
    "> ERROR: Reality subroutines failing",
    "> CRITICAL: Dimensional integrity compromised"
];

const dynamicWarnings = document.getElementById('dynamic-warnings');

function addRandomWarning() {
    if (dynamicWarnings.children.length > 5) {
        dynamicWarnings.removeChild(dynamicWarnings.firstChild);
    }
    
    const randomIndex = Math.floor(Math.random() * warningMessages.length);
    const warningElement = document.createElement('p');
    warningElement.className = 'warning-line';
    warningElement.textContent = warningMessages[randomIndex];
    dynamicWarnings.appendChild(warningElement);
    
    // Auto-scroll to bottom
    dynamicWarnings.scrollTop = dynamicWarnings.scrollHeight;
}

// Add initial warnings
for (let i = 0; i < 3; i++) {
    addRandomWarning();
}

// Add new warnings periodically
setInterval(addRandomWarning, 3000);

// Countdown timer
const countdownDisplay = document.getElementById('countdown');
let seconds = 30 * 60; // 30 minutes in seconds

function updateCountdown() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    if (seconds > 0) {
        seconds--;
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Abort button effect
const abortButton = document.getElementById('abort-button');

abortButton.addEventListener('mouseover', function() {
    if (document.body.classList.contains('calm-mode')) return;
    
    // Random position shift on hover
    const randomX = (Math.random() - 0.5) * 20;
    const randomY = (Math.random() - 0.5) * 20;
    
    this.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.05)`;
});

abortButton.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

// Accessibility toggle
const toggleButton = document.getElementById('toggle-effects');

toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('calm-mode');
    this.textContent = document.body.classList.contains('calm-mode') ? 
        'Enable Effects' : 'Reduce Motion';
});

// Check user preference for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('calm-mode');
    toggleButton.textContent = 'Enable Effects';
}