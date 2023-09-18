import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as React from 'react';

type Props = {
  onPress: () => void;
};

export const ReverseCameraButton = ({onPress}: Props) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon name="camera-reverse-outline" color="white" size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 20,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});
