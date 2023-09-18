import * as React from 'react';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useIsForeground} from '../hooks/use-is-foreground';
import {CaptureButton} from '../components/capture-button';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {ReverseCameraButton} from '../components/reverse-camera-button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/stack';
import {useCountdown} from '../hooks/use-countdown';

type Props = NativeStackScreenProps<RootStackParamList, 'Record'>;

export const Record = ({route}: Props) => {
  const devices = useCameraDevices();
  const isForeground = useIsForeground();
  const isFocused = useIsFocused();
  const camera = React.useRef<Camera>(null);
  const [selectedDevice, setSelectedDevice] = React.useState<'back' | 'front'>(
    'back',
  );

  const [isCapturing, setIsCapturing] = React.useState(false);
  const {
    countdown,
    stop: stopCountdown,
    start: startCountdown,
  } = useCountdown(route.params.countdown, timePassed => {
    if (timePassed >= route.params.countdown) {
      stopCountdown();
      startWorktime();
    }
  });
  const {
    countdown: worktimeCountdown,
    stop: stopWorktime,
    start: startWorktime,
  } = useCountdown(
    route.params.workTime,
    async timePassed => {
      if (timePassed > route.params.workTime) {
        await stopCapturing();
      }
    },
    3,
  );

  const device = devices[selectedDevice];

  const stopCapturing = async () => {
    await camera.current?.stopRecording();
    setIsCapturing(false);
    stopWorktime();
    stopCountdown();
  };

  const onStartCapturingHandler = async () => {
    if (isCapturing) {
      await stopCapturing();
      return;
    }
    camera.current?.startRecording({
      onRecordingFinished: async video => {
        await CameraRoll.save(video.path, {type: 'video'}).catch(() => {
          Alert.alert('Error saving video to camera roll');
        });
        Alert.alert('Video saved to camera roll');
      },
      onRecordingError: error => {
        console.error(error);
        Alert.alert('Error recording video');
      },
    });
    setIsCapturing(true);
    startCountdown();
  };

  if (device == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        video={true}
        audio={true}
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isForeground && isFocused}
      />
      <ReverseCameraButton
        onPress={() => {
          setSelectedDevice(val => (val === 'back' ? 'front' : 'back'));
        }}
      />
      <CaptureButton
        isCapturing={isCapturing}
        onPress={onStartCapturingHandler}
      />
      {countdown}
      {worktimeCountdown}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
