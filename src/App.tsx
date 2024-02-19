import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

import {setupPlayer, addTrack} from '../musicPlayerServices';

function App(): React.JSX.Element {
  const [isPlayerReady, setIsplayerReady] = useState(false);

  async function setup() {
    const isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }

    setIsplayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <StatusBar />

      <Text>Testing</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
