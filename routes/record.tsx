import * as React from 'react';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {StyleSheet, View, Text, Pressable, Alert} from 'react-native';
import Icon from 'react-native-ionicons';
import {useIsFocused} from '@react-navigation/native';
import {useIsForeground} from '../hooks/use-is-foreground';
import {CaptureButton} from '../components/capture-button';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {ReverseCameraButton} from '../components/reverse-camera-button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/stack';
import {Countdown} from '../components/countdown';

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
  const [isCountingDownToStart, setIsCountingDownToStart] =
    React.useState(false);
  const [isCountingDownToEnd, setIsCountingDownToEnd] = React.useState(false);

  const device = devices[selectedDevice];

  const stopRecording = async () => {
    await camera.current?.stopRecording();
    setIsCapturing(false);
    setIsCountingDownToStart(false);
    setIsCountingDownToEnd(false);
  };

  const onRecordHandler = async () => {
    if (isCapturing) {
      await stopRecording();
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
    setIsCapturing(val => !val);
    setIsCountingDownToStart(true);
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
      <CaptureButton isCapturing={isCapturing} onPress={onRecordHandler} />
      {isCountingDownToStart && (
        <Countdown
          time={route.params.countdown}
          onComplete={() => {
            setIsCountingDownToStart(false);
            setIsCountingDownToEnd(true);
          }}
        />
      )}
      {isCountingDownToEnd && (
        <Countdown
          beepFor={3}
          time={route.params.workTime}
          onComplete={async () => {
            await stopRecording();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
