import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {beepOk, beepErr} from '../utils/sounds';

type Props = {
  time: number;
  beepFor?: number;
  onComplete: () => void;
};

const playBeep = (timeLeft: number, beepFor: number) => {
  if (timeLeft <= beepFor) {
    if (timeLeft === 0) {
      beepErr.play();
      return;
    }
    beepOk.play();
  }
};

export const Countdown = ({time, onComplete, beepFor = time}: Props) => {
  const [timeLeft, setTimeLeft] = React.useState(time);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(val => {
        const nextTimeLeft = val - 1;
        if (nextTimeLeft <= 0) {
          clearInterval(interval);
        }
        return nextTimeLeft;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  React.useEffect(() => {
    playBeep(timeLeft, beepFor);
  }, [timeLeft, beepFor]);

  React.useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  return <Text style={styles.counter}>{timeLeft}</Text>;
};

const styles = StyleSheet.create({
  counter: {
    marginTop: 100,
    alignSelf: 'center',
    color: 'white',
    fontSize: 100,
    fontWeight: 'bold',
  },
});
