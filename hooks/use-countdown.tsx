import {Countdown} from '../components/countdown';
import {playBeep} from '../utils/sounds';
import * as React from 'react';

export const useCountdown = (
  seconds: number,
  onTick: (timePassed: number) => void,
  tickFor: number = seconds,
) => {
  const [isCounting, setIsCounting] = React.useState(false);

  return {
    stop() {
      setIsCounting(false);
    },
    start() {
      setIsCounting(true);
    },
    countdown: isCounting && (
      <Countdown
        seconds={seconds}
        onTick={timePassed => {
          onTick(timePassed);
          if (timePassed === seconds) {
            playBeep('ko');
            return;
          }
          const timeLeft = seconds - timePassed;
          if (timeLeft > 0 && timeLeft <= tickFor) {
            playBeep('ok');
          }
        }}
      />
    ),
  };
};
