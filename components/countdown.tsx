import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

type Props = {
  seconds: number;
  onTick: (secondsPassed: number) => void;
};

export const Countdown = ({onTick, seconds}: Props) => {
  const [timePassed, setTimePassed] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimePassed]);

  React.useLayoutEffect(() => {
    onTick(timePassed);
  }, [onTick, timePassed]);

  const countdown = seconds - timePassed > 0 ? seconds - timePassed : 0;

  return <Text style={styles.counter}>{countdown}</Text>;
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
