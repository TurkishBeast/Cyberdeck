// Custom Cursor
const cursor = document.getElementById('custom-cursor');
const cursorCircle = document.querySelector('.cursor-circle');
const cursorTrails = document.querySelector('.cursor-trails');
const trails = [];
const maxTrails = 10;

// Audio Elements
const ambientSound = document.getElementById('ambient-sound');
const glitchSound = document.getElementById('glitch-sound');
const clickSound = document.getElementById('click-sound');
const toggleAudioBtn = document.getElementById('toggle-audio');
const audioIcon = document.getElementById('audio-icon');
let audioEnabled = false;

// Sections
const loadingScreen = document.getElementById('loading-screen');
const hero = document.getElementById('hero');
const errorFeed = document.getElementById('error-feed');
const infection = document.getElementById('infection');
const reboot = document.getElementById('reboot');

// Loading Screen Elements
const terminalText = document.getElementById('terminal-text');
const loadingBar = document.getElementById('loading-bar');
const loadingPercentage = document.getElementById('loading-percentage');

// Hero Elements
const continueBtn = document.getElementById('continue-btn');

// Error Feed Elements
const consoleOutput = document.getElementById('console-output');

// Infection Elements
const meltingText = document.getElementById('melting-text');
const errorMessages = document.getElementById('error-messages');

// Reboot Elements
const rebootText = document.getElementById('reboot-text');
const particles = document.getElementById('particles');
const finalMessage = document.querySelector('.final-message');
const commandInput = document.getElementById('command-input');

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
  // Hide cursor
  document.body.style.cursor = 'none';
  
  // Setup event listeners
  document.addEventListener('mousemove', updateCursor);
  document.addEventListener('click', handleClick);
  toggleAudioBtn.addEventListener('click', toggleAudio);
  continueBtn.addEventListener('click', navigateToErrorFeed);
  commandInput.addEventListener('keydown', handleCommand);
  
  // Start loading sequence
  startLoadingSequence();
  
  // Create particles
  createParticles();
  
  // Add glitch events
  addRandomGlitches();
}

// Custom Cursor Functions
function updateCursor(e) {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  
  // Add trail
  addTrail(e.clientX, e.clientY);
}

function addTrail(x, y) {
  const trail = document.createElement('div');
  trail.classList.add('cursor-trail');
  trail.style.left = '0';
  trail.style.top = '0';
  trail.style.transform = `translate(${x - cursor.offsetLeft}px, ${y - cursor.offsetTop}px)`;
  cursorTrails.appendChild(trail);
  
  trails.push({
    element: trail,
    x: x - cursor.offsetLeft,
    y: y - cursor.offsetTop,
    alpha: 0.7,
    scale: 1
  });
  
  if (trails.length > maxTrails) {
    const oldestTrail = trails.shift();
    cursorTrails.removeChild(oldestTrail.element);
  }
  
  // Animate trails
  animateTrails();
}

function animateTrails() {
  trails.forEach((trail, index) => {
    trail.alpha -= 0.05;
    trail.scale -= 0.05;
    
    if (trail.alpha <= 0) {
      trail.alpha = 0;
    }
    
    if (trail.scale <= 0) {
      trail.scale = 0;
    }
    
    trail.element.style.opacity = trail.alpha;
    trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px) scale(${trail.scale})`;
  });
  
  requestAnimationFrame(animateTrails);
}

function handleClick() {
  // Play click sound if audio is enabled
  if (audioEnabled) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
  
  // Flash cursor
  cursorCircle.style.width = '30px';
  cursorCircle.style.height = '30px';
  cursorCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  
  setTimeout(() => {
    cursorCircle.style.width = '20px';
    cursorCircle.style.height = '20px';
    cursorCircle.style.backgroundColor = 'transparent';
  }, 300);
  
  // Trigger glitch effect
  triggerGlitch();
}

function triggerGlitch() {
  const glitchOverlays = document.querySelectorAll('.glitch-overlay');
  
  glitchOverlays.forEach(overlay => {
    overlay.style.opacity = '0.5';
    overlay.style.transform = 'translateX(-3px)';
    
    setTimeout(() => {
      overlay.style.opacity = '';
      overlay.style.transform = '';
    }, 200);
  });
  
  // Play glitch sound if audio is enabled
  if (audioEnabled) {
    glitchSound.currentTime = 0;
    glitchSound.play();
  }
}

// Audio Functions
function toggleAudio() {
  audioEnabled = !audioEnabled;
  
  if (audioEnabled) {
    ambientSound.play();
    audioIcon.textContent = '🔊';
  } else {
    ambientSound.pause();
    audioIcon.textContent = '🔇';
  }
}

// Loading Sequence
function startLoadingSequence() {
  const loadingTexts = [
    'INITIALIZING MEMORY SECTOR_0043...',
    'CHECKING SYSTEM INTEGRITY...',
    'WARNING: ANOMALY DETECTED IN SECTOR_7G...',
    'ATTEMPTING TO BYPASS SECURITY PROTOCOLS...',
    'SECURITY BREACH DETECTED...',
    'UNKNOWN ENTITY ACCESSING SYSTEM...',
    'ATTEMPTING TO TRACE ORIGIN...',
    'TRACE FAILED: SIGNAL SCRAMBLED...',
    'SYSTEM COMPROMISED...',
    'INITIATING EMERGENCY PROTOCOLS...'
  ];
  
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let loadingProgress = 0;
  
  const typeText = () => {
    if (currentTextIndex < loadingTexts.length) {
      const currentText = loadingTexts[currentTextIndex];
      
      if (currentCharIndex < currentText.length) {
        terminalText.textContent += currentText.charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeText, 50);
      } else {
        terminalText.textContent += '\n\n';
        currentTextIndex++;
        currentCharIndex = 0;
        setTimeout(typeText, 500);
      }
    }
  };
  
  const updateLoadingBar = () => {
    if (loadingProgress < 100) {
      loadingProgress += Math.floor(Math.random() * 5) + 1;
      
      if (loadingProgress > 100) {
        loadingProgress = 100;
      }
      
      loadingBar.style.width = `${loadingProgress}%`;
      loadingPercentage.textContent = `${loadingProgress}%`;
      
      if (loadingProgress < 100) {
        setTimeout(updateLoadingBar, Math.floor(Math.random() * 300) + 100);
      } else {
        // Loading complete, show hero section
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          hero.classList.remove('hidden');
        }, 1000);
      }
    }
  };
  
  typeText();
  updateLoadingBar();
}

// Navigation Functions
function navigateToErrorFeed() {
  hero.classList.add('hidden');
  errorFeed.classList.remove('hidden');
  
  // Start console output
  startConsoleOutput();
  
  // Set timeout to navigate to infection section
  setTimeout(() => {
    errorFeed.classList.add('hidden');
    infection.classList.remove('hidden');
    
    // Start error messages
    startErrorMessages();
    
    // Apply melting text effect
    meltTextEffect();
    
    // Set timeout to navigate to reboot section
    setTimeout(() => {
      infection.classList.add('hidden');
      reboot.classList.remove('hidden');
      
      // Start reboot sequence
      startRebootSequence();
    }, 8000);
  }, 10000);
}

// Error Feed Functions
function startConsoleOutput() {
  const errorLines = [
    'ERROR: Memory corruption detected in sector 7G',
    'ALERT: Unauthorized access to system core',
    'WARNING: Firewall breach detected',
    'CRITICAL: System integrity compromised',
    'ALERT: Unknown entity detected in memory space',
    'ERROR: Unable to isolate foreign code',
    'WARNING: System resources being redirected',
    'CRITICAL: Core functions destabilizing',
    'ALERT: Attempting emergency containment',
    'ERROR: Containment failed',
    'WARNING: System collapse imminent',
    'CRITICAL: Initiating emergency shutdown'
  ];
  
  let lineIndex = 0;
  
  const addConsoleLine = () => {
    if (lineIndex < errorLines.length) {
      const line = document.createElement('div');
      line.textContent = errorLines[lineIndex];
      line.classList.add('console-line');
      consoleOutput.appendChild(line);
      
      // Auto-scroll to bottom
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
      
      lineIndex++;
      setTimeout(addConsoleLine, Math.floor(Math.random() * 1000) + 500);
    }
  };
  
  addConsoleLine();
}

// Infection Functions
function startErrorMessages() {
  const messages = [
    '404 CORE ERROR',
    'ROOT BREACH DETECTED',
    'SYSTEM FAILURE IMMINENT',
    'MEMORY CORRUPTION AT 78%',
    'UNKNOWN ENTITY DETECTED',
    'SECURITY PROTOCOLS FAILING',
    'SYSTEM INTEGRITY: CRITICAL',
    'EMERGENCY SHUTDOWN INITIATED',
    'BACKUP SYSTEMS OFFLINE',
    'CORE TEMPERATURE EXCEEDING LIMITS',
    'DATA CORRUPTION SPREADING',
    'CONNECTION TO MAINFRAME LOST'
  ];
  
  let messageIndex = 0;
  
  const addErrorMessage = () => {
    if (messageIndex < messages.length) {
      const message = document.createElement('div');
      message.textContent = messages[messageIndex];
      message.classList.add('error-message');
      errorMessages.appendChild(message);
      
      // Auto-scroll to bottom
      errorMessages.scrollTop = errorMessages.scrollHeight;
      
      messageIndex++;
      setTimeout(addErrorMessage, Math.floor(Math.random() * 800) + 300);
    }
  };
  
  addErrorMessage();
}

function meltTextEffect() {
  let chars = meltingText.textContent.split('');
  meltingText.textContent = '';
  
  chars.forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.transition = 'all 0.5s ease';
    meltingText.appendChild(span);
    
    setTimeout(() => {
      const randomY = Math.floor(Math.random() * 30) + 10;
      const randomRotate = Math.floor(Math.random() * 30) - 15;
      const randomScale = 0.8 + Math.random() * 0.5;
      
      span.style.transform = `translateY(${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`;
      span.style.opacity = '0.7';
      span.style.color = 'rgba(255, 0, 0, 0.8)';
      span.style.textShadow = '0 0 15px rgba(255, 0, 0, 0.8)';
      span.style.filter = 'blur(1px)';
    }, index * 100 + Math.random() * 500);
  });
}

// Reboot Functions
function startRebootSequence() {
  const rebootMessages = [
    'Trying to restore connection...',
    'Attempting system recovery...',
    'Scanning for viable memory sectors...',
    'Rebuilding core functions...',
    'Establishing new connection...'
  ];
  
  let messageIndex = 0;
  
  const updateRebootText = () => {
    if (messageIndex < rebootMessages.length) {
      rebootText.textContent = rebootMessages[messageIndex];
      messageIndex++;
      setTimeout(updateRebootText, 2000);
    } else {
      // Show final message
      finalMessage.classList.remove('hidden');
      
      // Focus on command input
      setTimeout(() => {
        commandInput.focus();
      }, 1000);
    }
  };
  
  updateRebootText();
}

function createParticles() {
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    const x = Math.random() * 300;
    const y = Math.random() * 300;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random color
    const colors = [
      'rgba(0, 255, 255, 0.7)',
      'rgba(255, 0, 255, 0.7)',
      'rgba(255, 255, 0, 0.7)',
      'rgba(0, 255, 0, 0.7)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 5px ${color}`;
    
    // Add to container
    particles.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const duration = Math.random() * 5000 + 3000;
  const x = Math.random() * 300;
  const y = Math.random() * 300;
  
  particle.style.transition = `all ${duration}ms ease-in-out`;
  particle.style.transform = `translate(${x - parseFloat(particle.style.left)}px, ${y - parseFloat(particle.style.top)}px)`;
  
  setTimeout(() => {
    animateParticle(particle);
  }, duration);
}

function handleCommand(e) {
  if (e.key === 'Enter') {
    const command = commandInput.value.trim().toUpperCase();
    
    if (command === 'REBOOT') {
      // Reset and restart the experience
      commandInput.value = '';
      reboot.classList.add('hidden');
      loadingScreen.classList.remove('hidden');
      
      // Reset terminal text and loading bar
      terminalText.textContent = '';
      loadingBar.style.width = '0%';
      loadingPercentage.textContent = '0%';
      
      // Reset other elements
      consoleOutput.innerHTML = '';
      errorMessages.innerHTML = '';
      finalMessage.classList.add('hidden');
      
      // Start loading sequence again
      startLoadingSequence();
    } else {
      // Shake input for invalid command
      commandInput.classList.add('shake');
      setTimeout(() => {
        commandInput.classList.remove('shake');
      }, 500);
      commandInput.value = '';
    }
  }
}

// Random Glitches
function addRandomGlitches() {
  setInterval(() => {
    triggerGlitch();
  }, Math.random() * 5000 + 3000);
}