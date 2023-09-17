import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const beepOk = new Sound('beep-ok.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  beepOk.setSpeed(2);
  beepOk.setVolume(1);
});

export const beepErr = new Sound('beep-err.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  beepOk.setSpeed(2);
  beepOk.setVolume(1);
});
