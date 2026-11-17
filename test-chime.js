const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Track audio volume changes
  await page.exposeFunction('logVolume', (vol) => {
    console.log('Audio volume:', vol);
  });

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
  console.log('Audio element:', audioInfo);

  // Get initial volume
  const initialVolume = audioInfo.found ? audioInfo.volume : 1;
  console.log('Initial volume:', initialVolume);

  // Open timer menu and select 5 seconds
  await page.click('#timer-toggle-btn');
  await page.waitForTimeout(200);
  await page.click('.timer-option-btn[data-seconds="5"]');
  await page.waitForTimeout(200);

  console.log('Timer set to 5 seconds, waiting for auto-change...');

  // Wait for timer to trigger (6 seconds to be safe)
  await page.waitForTimeout(7000);

  // Check volume after auto-change
  const volumeAfter = await page.evaluate(() => {
    const audio = window.ambientAudio;
    return audio ? audio.volume : 1;
  });
  console.log('Volume after auto-change:', volumeAfter);

  // Verify volume didn't change (chime disabled when music playing)
  if (volumeAfter === initialVolume) {
    console.log('✅ SUCCESS: Volume unchanged - chime correctly disabled when music playing');
  } else {
    console.log('❌ FAILURE: Volume changed from', initialVolume, 'to', volumeAfter);
  }

  // Now test: stop music, set timer again, verify chime works (volume dips)
  await page.click('#audio-btn'); // Stop music
  await page.waitForTimeout(500);

  const isPlayingAfterStop = await page.evaluate(() => {
    const audio = window.ambientAudio;
    return audio && !audio.paused;
  });
  console.log('Music playing after stop:', isPlayingAfterStop);

  // Set timer again
  await page.click('#timer-toggle-btn');
  await page.waitForTimeout(200);
  await page.click('.timer-option-btn[data-seconds="5"]');
  await page.waitForTimeout(200);

  console.log('Timer set to 5 seconds (music OFF), waiting for auto-change...');
  await page.waitForTimeout(7000);

  const volumeAfterNoMusic = await page.evaluate(() => {
    const audio = window.ambientAudio;
    return audio ? audio.volume : 1;
  });
  console.log('Volume after auto-change (music off):', volumeAfterNoMusic);

  await browser.close();
})();