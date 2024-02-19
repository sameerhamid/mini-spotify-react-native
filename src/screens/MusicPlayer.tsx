import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playListData} from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControllCenter from '../components/ControllCenter';
const {width} = Dimensions.get('window');

const events = [Event.PlaybackState, Event.PlaybackError];

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        //@ts-ignore
        const playingTrack = await TrackPlayer.getTrack(event.track);
        setTrack(playingTrack);
        break;
    }
  });

  const renderArtWork = ({item}: {item: Track}) => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {item?.artwork && (
            <Image
              source={{uri: item?.artwork?.toString()}}
              style={styles.albumArtImg}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />
      <SongInfo track={track} />
      <SongSlider />
      <ControllCenter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});

export default MusicPlayer;
