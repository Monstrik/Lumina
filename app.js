/**
 * Lumina
 * Faithful Stofinity Clone with 5/10/15 Minute Auto-Timer & Dual-Layer Crossfade
 */

import {
  timerBadgeLabel,
  resetTimerCountdown,
  calculateProgress,
  generateTimerStatusText,
  getNextRandomIndex
} from './utils.js';

// 1. Mobile Viewport Height Normalizer
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
setVh();

// 2. Affirmations Image Database (Local Assets)
const images = [
  "images/01.png",
  "images/02.png",
  "images/04.png",
  "images/05.png",
  "images/06.png",
  "images/07.png",
  "images/08.png",
  "images/09.png",
  "images/10.png",
  "images/11.png",
  "images/12.png",
  "images/13.png",
  "images/14.png",
  "images/15.png",
  "images/16.png",
  "images/17.png",
  "images/18.png",
  "images/19.png",
  "images/20.png",
  "images/21.png",
  "images/22.png",
  "images/23.png",
  "images/24.png",
  "images/25.png",
  "images/26.png",
  "images/27.png",
  "images/28.png",
  "images/29.png",
  "images/30.png",
  "images/31.png",
  "images/32.png",
  "images/33.png",
  "images/34.png",
  "images/35.png",
  "images/37.png",
  "images/38.png",
  "images/39.png",
  "images/40.png",
  "images/41.png",
  "images/42.png",
  "images/43.png",
  "images/44.png",
  "images/45.png",
  "images/46.png",
  "images/47.png",
  "images/48.png",
  "images/49.png",
  "images/50.png",
  "images/jesus_1.jpg",
  "images/jesus_3.png",
  "images/jesus_4.png",
  "images/grim_reaper_1.png",
  "images/grim_reaper_2.jpg",
  "images/grim_reaper_3.png",
  "images/grim_reaper_4.jpg",
  "images/bat_1.png",
  "images/bat_2.jpg",
  "images/boo_1.png",
  "images/boo_2.jpg"
];

// 3. DOM Elements
const bgLayerA = document.getElementById('bg-layer-a');
const bgLayerB = document.getElementById('bg-layer-b');
const randomizeBtn = document.getElementById('randomize-btn');
const audioBtn = document.getElementById('audio-btn');
const audioIconNote = document.getElementById('audio-icon-note');
const audioIconMuted = document.getElementById('audio-icon-muted');

// Timer Controls
const timerToggleBtn = document.getElementById('timer-toggle-btn');
const timerBadge = document.getElementById('timer-badge');
const timerMenu = document.getElementById('timer-menu');
const timerOptionBtns = document.querySelectorAll('.timer-option-btn');
const timerStatus = document.getElementById('timer-status');
const timerStatusText = document.getElementById('timer-status-text');
const timerProgressBar = document.getElementById('timer-progress-bar');

// 4. State Management
let currentIndex = 0;
let currentLayer = 'A';
let timerIntervalSeconds = 0; // 0 = off
let countdownSecondsRemaining = 0;
let totalCountdownSeconds = 0;
let timerTickInterval = null;

// Initial setup with first image
bgLayerA.style.backgroundImage = `url("${images[0]}")`;
bgLayerA.classList.add('visible');

// Preloader cache to make transitions instant
const imageCache = [];
function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
    imageCache.push(img);
  });
}
preloadImages();

// 5. Dual-Layer Crossfade Image Transition
function showAffirmation(nextIndex) {
  currentIndex = nextIndex;
  const targetImageSrc = images[currentIndex];

  const incomingLayer = currentLayer === 'A' ? bgLayerB : bgLayerA;
  const outgoingLayer = currentLayer === 'A' ? bgLayerA : bgLayerB;

  // Load target image into incoming layer
  const preloader = new Image();
  preloader.onload = () => {
    incomingLayer.style.backgroundImage = `url("${targetImageSrc}")`;
    incomingLayer.classList.add('visible');
    outgoingLayer.classList.remove('visible');
    currentLayer = currentLayer === 'A' ? 'B' : 'A';
  };
  preloader.src = targetImageSrc;
}

// Roll to random affirmation without immediate repeating
function nextAffirmation(isAutoTriggered = false) {
  const nextIndex = getNextRandomIndex(currentIndex, images.length);

  showAffirmation(nextIndex);

  // If auto-triggered by timer, play a soothing bell chime
  if (isAutoTriggered) {
    playNotificationChime();
  }

  // Reset the timer countdown for a full cycle
  if (timerIntervalSeconds > 0) {
    const { total, remaining } = resetTimerCountdown(timerIntervalSeconds);
    totalCountdownSeconds = total;
    countdownSecondsRemaining = remaining;
    updateTimerUI();
  }
}

randomizeBtn.addEventListener('click', () => {
  nextAffirmation(false);
});

// 6. Affirmation Auto-Change Interval Timer (seconds-based)
function updateTimerUI() {
  if (timerIntervalSeconds <= 0) {
    timerBadge.classList.add('hidden');
    timerStatus.classList.add('hidden');
    timerToggleBtn.classList.remove('active');
    return;
  }

  timerBadge.textContent = timerBadgeLabel(timerIntervalSeconds);
  timerBadge.classList.remove('hidden');
  timerToggleBtn.classList.add('active');

  timerStatusText.textContent = generateTimerStatusText(countdownSecondsRemaining);
  timerStatus.classList.remove('hidden');

  const progressPercent = calculateProgress(totalCountdownSeconds, countdownSecondsRemaining);
  timerProgressBar.style.width = `${progressPercent}%`;
}

function startTimer(seconds) {
  clearInterval(timerTickInterval);
  timerIntervalSeconds = parseInt(seconds, 10);

  timerOptionBtns.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.seconds, 10) === timerIntervalSeconds);
  });

  if (timerIntervalSeconds <= 0) {
    updateTimerUI();
    return;
  }

  const { total, remaining } = resetTimerCountdown(timerIntervalSeconds);
  totalCountdownSeconds = total;
  countdownSecondsRemaining = remaining;

  timerTickInterval = setInterval(() => {
    countdownSecondsRemaining--;
    if (countdownSecondsRemaining <= 0) {
      nextAffirmation(true);
    } else {
      updateTimerUI();
    }
  }, 1000);
}

// Toggle Timer Selection Menu
timerToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  timerMenu.classList.toggle('hidden');
});

// Select Interval from Menu
timerOptionBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const seconds = btn.dataset.seconds;
    startTimer(seconds);
    timerMenu.classList.add('hidden');
  });
});

// Close timer menu when clicking elsewhere
document.addEventListener('click', (e) => {
  if (!timerMenu.contains(e.target) && e.target !== timerToggleBtn) {
    timerMenu.classList.add('hidden');
  }
});

// 7. Ambient Music — Original audio track from Stofinity
const ambientAudio = new Audio('audio/ambient.mp4');
window.ambientAudio = ambientAudio; // expose for testing
ambientAudio.loop = true;
ambientAudio.volume = 1.0;
let isAudioPlaying = false;

function startAmbientSound() {
  ambientAudio.play().catch(err => {
    console.debug('Audio play blocked:', err);
  });
  isAudioPlaying = true;
  audioBtn.classList.add('active');
  audioIconNote.classList.add('hidden');
  audioIconMuted.classList.remove('hidden');
}

function stopAmbientSound() {
  ambientAudio.pause();
  isAudioPlaying = false;
  audioBtn.classList.remove('active');
  audioIconNote.classList.remove('hidden');
  audioIconMuted.classList.add('hidden');
}

function playNotificationChime() {
  if (isAudioPlaying) return; // Disable chime when music is playing

  // Generate a soft chime using Web Audio API
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.3); // E6

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch (err) {
    console.debug('Chime play blocked:', err);
  }
}

audioBtn.addEventListener('click', () => {
  if (isAudioPlaying) {
    stopAmbientSound();
  } else {
    startAmbientSound();
  }
});

// 8. Keyboard Accessibility
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowRight') {
    e.preventDefault();
    nextAffirmation(false);
  } else if (e.key === 'm' || e.key === 'M') {
    audioBtn.click();
  } else if (e.key === 't' || e.key === 'T') {
    timerToggleBtn.click();
  }
});