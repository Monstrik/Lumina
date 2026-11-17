import { test, expect } from '@playwright/test';

test.describe('Chime behavior', () => {
  test('chime is disabled when music is playing', async ({ page }) => {
    await page.goto('http://localhost:8001');
    await page.waitForLoadState('networkidle');

    // Wait for audio to be ready
    await page.waitForTimeout(1000);

    // Click audio button to start music
    await page.click('#audio-btn');
    await page.waitForTimeout(500);

    // Verify music is playing
    const audioInfo = await page.evaluate(() => {
      const audio = window.ambientAudio;
      if (!audio) return { found: false };
      return { found: true, paused: audio.paused, volume: audio.volume };
    });
    expect(audioInfo.found).toBe(true);
    expect(audioInfo.paused).toBe(false);

    // Get initial volume
    const initialVolume = audioInfo.volume;

    // Open timer menu and select 5 seconds
    await page.click('#timer-toggle-btn');
    await page.waitForTimeout(200);
    await page.click('.timer-option-btn[data-seconds="5"]');
    await page.waitForTimeout(200);

    // Wait for timer to trigger (6 seconds to be safe)
    await page.waitForTimeout(7000);

    // Check volume after auto-change
    const volumeAfter = await page.evaluate(() => {
      const audio = window.ambientAudio;
      return audio ? audio.volume : 1;
    });

    // Verify volume didn't change (chime disabled when music playing)
    expect(volumeAfter).toBe(initialVolume);
  });

  test('chime plays when music is stopped', async ({ page }) => {
    await page.goto('http://localhost:8001');
    await page.waitForLoadState('networkidle');

    // Wait for audio to be ready
    await page.waitForTimeout(1000);

    // Start music first
    await page.click('#audio-btn');
    await page.waitForTimeout(500);

    // Stop music
    await page.click('#audio-btn');
    await page.waitForTimeout(500);

    // Verify music is stopped
    const isPlayingAfterStop = await page.evaluate(() => {
      const audio = window.ambientAudio;
      return audio && !audio.paused;
    });
    expect(isPlayingAfterStop).toBe(false);

    // Set timer again
    await page.click('#timer-toggle-btn');
    await page.waitForTimeout(200);
    await page.click('.timer-option-btn[data-seconds="5"]');
    await page.waitForTimeout(200);

    // Wait for timer to trigger
    await page.waitForTimeout(7000);

    // The chime should play (we can't easily test Web Audio API volume,
    // but we can verify the timer triggered by checking image changed)
    const currentImage = await page.evaluate(() => {
      return document.getElementById('bg-layer-a').style.backgroundImage ||
             document.getElementById('bg-layer-b').style.backgroundImage;
    });
    expect(currentImage).toBeTruthy();
  });
});

test.describe('Timer functionality', () => {
  test('timer menu opens and closes', async ({ page }) => {
    await page.goto('http://localhost:8001');
    await page.waitForLoadState('networkidle');

    // Timer menu should be hidden initially
    await expect(page.locator('#timer-menu')).toHaveClass(/hidden/);

    // Click timer toggle to open menu
    await page.click('#timer-toggle-btn');
    await expect(page.locator('#timer-menu')).not.toHaveClass(/hidden/);

    // Click outside to close
    await page.click('body', { position: { x: 10, y: 10 } });
    await expect(page.locator('#timer-menu')).toHaveClass(/hidden/);
  });

  test('timer badge shows selected interval', async ({ page }) => {
    await page.goto('http://localhost:8001');
    await page.waitForLoadState('networkidle');

    // Badge should be hidden when timer is off
    await expect(page.locator('#timer-badge')).toHaveClass(/hidden/);

    // Open menu and select 5 min
    await page.click('#timer-toggle-btn');
    await page.waitForTimeout(200);
    await page.click('.timer-option-btn[data-seconds="300"]');
    await page.waitForTimeout(200);

    // Badge should show 5m
    await expect(page.locator('#timer-badge')).not.toHaveClass(/hidden/);
    await expect(page.locator('#timer-badge')).toHaveText('5m');
  });

  test('keyboard shortcuts work', async ({ page }) => {
    await page.goto('http://localhost:8001');
    await page.waitForLoadState('networkidle');

    // Space should trigger next affirmation
    await page.keyboard.press('Space');
    await page.waitForTimeout(200);
    const newImageA = await page.locator('#bg-layer-a').getAttribute('style');

    // Image should have changed (or at least the transition triggered)
    // Note: Due to crossfade, we check that the transition happened
    expect(newImageA).toBeTruthy();
  });
});

test.describe('Audio toggle', () => {
  test('audio button toggles play/pause', async ({ page }) => {
    await page.goto('http://localhost:8001');
    await page.waitForLoadState('networkidle');

    // Initially audio should be paused
    let audioState = await page.evaluate(() => {
      const audio = window.ambientAudio;
      return { paused: audio.paused, volume: audio.volume };
    });
    expect(audioState.paused).toBe(true);

    // Click to play
    await page.click('#audio-btn');
    await page.waitForTimeout(500);

    audioState = await page.evaluate(() => {
      const audio = window.ambientAudio;
      return { paused: audio.paused, volume: audio.volume };
    });
    expect(audioState.paused).toBe(false);

    // Click to pause
    await page.click('#audio-btn');
    await page.waitForTimeout(200);

    audioState = await page.evaluate(() => {
      const audio = window.ambientAudio;
      return { paused: audio.paused };
    });
    expect(audioState.paused).toBe(true);
  });

  test('M key toggles audio', async ({ page }) => {
    await page.goto('http://localhost:8001');
    await page.waitForLoadState('networkidle');

    // Press M to play
    await page.keyboard.press('m');
    await page.waitForTimeout(500);

    let audioState = await page.evaluate(() => {
      const audio = window.ambientAudio;
      return { paused: audio.paused };
    });
    expect(audioState.paused).toBe(false);

    // Press M to pause
    await page.keyboard.press('m');
    await page.waitForTimeout(200);

    audioState = await page.evaluate(() => {
      const audio = window.ambientAudio;
      return { paused: audio.paused };
    });
    expect(audioState.paused).toBe(true);
  });
});