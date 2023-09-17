import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {NumericInput} from '../components/numeric-input';
import {Camera} from 'react-native-vision-camera';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

const getCameraPermission = async () => {
  const permissionStatus = await Camera.getCameraPermissionStatus().then(
    status =>
      status === 'not-determined' ? Camera.requestCameraPermission() : status,
  );
  return permissionStatus === 'granted';
};

const getMicrophonePermission = async () => {
  const permissionStatus = await Camera.getMicrophonePermissionStatus().then(
    status =>
      status === 'not-determined'
        ? Camera.requestMicrophonePermission()
        : status,
  );
  return permissionStatus === 'granted';
};

export const Main = ({navigation}: Props) => {
  const [countdownTime, setCountdownTime] = React.useState(0);
  const [workTime, setWorkTime] = React.useState(0);

  const onRecordHandler = async () => {
    if (!countdownTime || !workTime) {
      Alert.alert('Please set countdown and work time');
      return;
    }
    const hasAllPermissions =
      (await getCameraPermission()) && (await getMicrophonePermission());
    if (!hasAllPermissions) {
      Alert.alert(
        'Before proceeding, you will have to allow camera/audio access in your mobile phone settings',
      );
      return;
    }
    navigation.navigate('Record', {
      countdown: countdownTime,
      workTime: workTime,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <NumericInput
              value={countdownTime}
              onChange={setCountdownTime}
              label="Countdown time until exercise"
              placeholder="Enter countdown time"
            />
            <NumericInput
              value={workTime}
              onChange={setWorkTime}
              label="Work time"
              placeholder="Enter work time"
            />
          </View>
          <View style={styles.button}>
            <Button title="Record!" onPress={onRecordHandler} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    margin: 20,
  },
});
