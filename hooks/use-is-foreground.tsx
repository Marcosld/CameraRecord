import * as React from 'react';
import {AppState} from 'react-native';

export const useIsForeground = () => {
  const [appState, setAppState] = React.useState(AppState.currentState);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState === 'active';
};
