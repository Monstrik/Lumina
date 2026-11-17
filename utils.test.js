import { describe, it, expect } from 'vitest';
import {
  formatTime,
  timerBadgeLabel,
  resetTimerCountdown,
  calculateProgress,
  generateTimerStatusText,
  getNextRandomIndex,
  TIMER_OPTIONS
} from './utils.js';

describe('formatTime', () => {
  it('formats seconds only', () => {
    expect(formatTime(0)).toBe('0s');
    expect(formatTime(5)).toBe('5s');
    expect(formatTime(30)).toBe('30s');
    expect(formatTime(59)).toBe('59s');
  });

  it('formats minutes and seconds', () => {
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(125)).toBe('02:05');
    expect(formatTime(3599)).toBe('59:59');
  });

  it('formats hours, minutes, and seconds', () => {
    expect(formatTime(3600)).toBe('1h 00m 00s');
    expect(formatTime(3665)).toBe('1h 01m 05s');
    expect(formatTime(7200)).toBe('2h 00m 00s');
    expect(formatTime(86399)).toBe('23h 59m 59s');
  });
});

describe('timerBadgeLabel', () => {
  it('shows seconds for under 60', () => {
    expect(timerBadgeLabel(1)).toBe('1s');
    expect(timerBadgeLabel(5)).toBe('5s');
    expect(timerBadgeLabel(30)).toBe('30s');
    expect(timerBadgeLabel(59)).toBe('59s');
  });

  it('shows minutes for under 1 hour', () => {
    expect(timerBadgeLabel(60)).toBe('1m');
    expect(timerBadgeLabel(300)).toBe('5m');
    expect(timerBadgeLabel(600)).toBe('10m');
    expect(timerBadgeLabel(3599)).toBe('59m');
  });

  it('shows hours for under 24 hours', () => {
    expect(timerBadgeLabel(3600)).toBe('1h');
    expect(timerBadgeLabel(7200)).toBe('2h');
    expect(timerBadgeLabel(86399)).toBe('23h');
  });

  it('shows 24h for 24 hours or more', () => {
    expect(timerBadgeLabel(86400)).toBe('24h');
    expect(timerBadgeLabel(90000)).toBe('24h');
  });
});

describe('resetTimerCountdown', () => {
  it('returns zeros for zero or negative interval', () => {
    expect(resetTimerCountdown(0)).toEqual({ total: 0, remaining: 0 });
    expect(resetTimerCountdown(-5)).toEqual({ total: 0, remaining: 0 });
  });

  it('returns total and remaining equal to interval for positive values', () => {
    expect(resetTimerCountdown(5)).toEqual({ total: 5, remaining: 5 });
    expect(resetTimerCountdown(300)).toEqual({ total: 300, remaining: 300 });
    expect(resetTimerCountdown(3600)).toEqual({ total: 3600, remaining: 3600 });
  });
});

describe('calculateProgress', () => {
  it('returns 0 for zero total', () => {
    expect(calculateProgress(0, 0)).toBe(0);
    expect(calculateProgress(0, 5)).toBe(0);
  });

  it('returns 0 when just started', () => {
    expect(calculateProgress(60, 60)).toBe(0);
    expect(calculateProgress(300, 300)).toBe(0);
  });

  it('returns 50 at halfway', () => {
    expect(calculateProgress(60, 30)).toBe(50);
    expect(calculateProgress(100, 50)).toBe(50);
  });

  it('returns 100 when complete', () => {
    expect(calculateProgress(60, 0)).toBe(100);
    expect(calculateProgress(300, 0)).toBe(100);
  });

  it('calculates correct percentage for partial progress', () => {
    expect(calculateProgress(60, 45)).toBe(25);
    expect(calculateProgress(60, 15)).toBe(75);
    expect(calculateProgress(300, 240)).toBe(20);
  });
});

describe('generateTimerStatusText', () => {
  it('formats status text correctly', () => {
    expect(generateTimerStatusText(0)).toBe('Next affirmation in 0s');
    expect(generateTimerStatusText(5)).toBe('Next affirmation in 5s');
    expect(generateTimerStatusText(60)).toBe('Next affirmation in 01:00');
    expect(generateTimerStatusText(3665)).toBe('Next affirmation in 1h 01m 05s');
  });
});

describe('getNextRandomIndex', () => {
  it('returns 0 for single element array', () => {
    expect(getNextRandomIndex(0, 1)).toBe(0);
  });

  it('returns different index from current for multi-element array', () => {
    // Run multiple times to verify it never returns current index
    for (let i = 0; i < 100; i++) {
      const result = getNextRandomIndex(0, 5);
      expect(result).not.toBe(0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(5);
    }
  });

  it('works with different current indices', () => {
    for (let current = 0; current < 10; current++) {
      for (let i = 0; i < 50; i++) {
        const result = getNextRandomIndex(current, 10);
        expect(result).not.toBe(current);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(10);
      }
    }
  });
});

describe('TIMER_OPTIONS', () => {
  it('has expected number of options', () => {
    expect(TIMER_OPTIONS.length).toBe(16);
  });

  it('includes Off option with 0 seconds', () => {
    const offOption = TIMER_OPTIONS.find(opt => opt.seconds === 0);
    expect(offOption).toBeDefined();
    expect(offOption.label).toBe('Off');
    expect(offOption.subLabel).toBe('Manual only');
  });

  it('includes 5 min option', () => {
    const fiveMin = TIMER_OPTIONS.find(opt => opt.seconds === 300);
    expect(fiveMin).toBeDefined();
    expect(fiveMin.label).toBe('5 min');
    expect(fiveMin.subLabel).toBe('Focus pace');
  });

  it('includes 24 hours option', () => {
    const twentyFourHours = TIMER_OPTIONS.find(opt => opt.seconds === 86400);
    expect(twentyFourHours).toBeDefined();
    expect(twentyFourHours.label).toBe('24 hours');
    expect(twentyFourHours.subLabel).toBe('Daily');
  });

  it('all options have required properties', () => {
    TIMER_OPTIONS.forEach(opt => {
      expect(opt).toHaveProperty('seconds');
      expect(opt).toHaveProperty('label');
      expect(opt).toHaveProperty('subLabel');
      expect(typeof opt.seconds).toBe('number');
      expect(typeof opt.label).toBe('string');
      expect(typeof opt.subLabel).toBe('string');
    });
  });
});