import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {playbackService} from '../../musicPlayerServices';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ControllCenter = () => {
  // to get the state of playback

  const playBackState = usePlaybackState();

  //Next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  //previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };
  //check what is the current state of the playback on that basis toggle the state
  const togglePlayBack = async (playback: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>

      <Pressable
        onPress={
          //@ts-ignore
          () => togglePlayBack(playBackState)
        }>
        <Icon
          style={styles.icon}
          name={
            //@ts-ignore
            playBackState === State.Playing ? 'pause' : 'play-arrow'
          }
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControllCenter;
