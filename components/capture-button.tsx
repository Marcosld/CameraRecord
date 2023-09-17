import {View, Pressable, StyleSheet} from 'react-native';
import * as React from 'react';

type Props = {
  isCapturing: boolean;
  onPress: () => void;
};

export const CaptureButton = ({isCapturing, onPress}: Props) => {
  return (
    <View style={styles.buttonOuter}>
      <Pressable
        onPress={onPress}
        style={[styles.button, isCapturing && styles.buttonCapturing]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuter: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    width: 70,
    height: 70,
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#9e1919',
    width: '100%',
    height: '100%',
    borderRadius: 40,
    transform: 'scale(0.94)',
  },
  buttonCapturing: {
    transform: 'scale(0.6)',
    borderRadius: 15,
  },
});
