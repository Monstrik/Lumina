/**
 * Pure utility functions for Lumina - extracted for testability
 * These functions have no side effects and no DOM dependencies
 */

// Format seconds into human-readable time string
export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }
  if (m > 0) {
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${s}s`;
}

// Generate short label for timer badge
export function timerBadgeLabel(secs) {
  if (secs < 60) return `${secs}s`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h`;
  return '24h';
}

// Reset timer countdown state - returns new state, doesn't mutate
export function resetTimerCountdown(timerIntervalSeconds) {
  if (timerIntervalSeconds <= 0) return { total: 0, remaining: 0 };
  return {
    total: timerIntervalSeconds,
    remaining: timerIntervalSeconds
  };
}

// Calculate progress percentage
export function calculateProgress(totalSeconds, remainingSeconds) {
  if (totalSeconds <= 0) return 0;
  return ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
}

// Generate timer status text
export function generateTimerStatusText(remainingSeconds) {
  return `Next affirmation in ${formatTime(remainingSeconds)}`;
}

// Get next random index (avoiding immediate repeat)
export function getNextRandomIndex(currentIndex, arrayLength) {
  if (arrayLength <= 1) return 0;
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * arrayLength);
  } while (nextIndex === currentIndex);
  return nextIndex;
}

// Timer interval options (seconds)
export const TIMER_OPTIONS = [
  { seconds: 1, label: '1 sec', subLabel: 'Instant' },
  { seconds: 5, label: '5 sec', subLabel: 'Quick peek' },
  { seconds: 10, label: '10 sec', subLabel: 'Brisk' },
  { seconds: 15, label: '15 sec', subLabel: 'Slideshow' },
  { seconds: 30, label: '30 sec', subLabel: 'Breathe' },
  { seconds: 60, label: '1 min', subLabel: 'Steady' },
  { seconds: 300, label: '5 min', subLabel: 'Focus pace' },
  { seconds: 600, label: '10 min', subLabel: 'Balanced' },
  { seconds: 900, label: '15 min', subLabel: 'Mindful' },
  { seconds: 1800, label: '30 min', subLabel: 'Relaxed' },
  { seconds: 3600, label: '1 hour', subLabel: 'Hourly' },
  { seconds: 10800, label: '3 hours', subLabel: 'Long session' },
  { seconds: 21600, label: '6 hours', subLabel: 'Work session' },
  { seconds: 43200, label: '12 hours', subLabel: 'Half day' },
  { seconds: 86400, label: '24 hours', subLabel: 'Daily' },
  { seconds: 0, label: 'Off', subLabel: 'Manual only' }
];