/* eslint-disable global-require */
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function LottieAnimation(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const makeExample = (name, getJson) => ({name, getJson});
  const animationJson = props.animationJson
    ? props.animationJson
    : '291-searchask-loop.json';

  const EXAMPLES = [
    makeExample('Search', () =>
      require('../../assets/lottie_animations/291-searchask-loop.json'),
    ),
    makeExample('Orbit', () =>
      require('../../assets/lottie_animations/4441-galaxy-orbit-animation.json'),
    ),
    makeExample('Shop', () =>
      require('../../assets/lottie_animations/7431-planet.json'),
    ),
    makeExample('Heart', () =>
      require('../../assets/lottie_animations/PinJump.json'),
    ),
  ];
  const DURATION = props.duration ? props.duration : 4000;
  const example = EXAMPLES[props.animationId];

  const manageAnimation = shouldPlay => {
    if (!progress) {
      // this condition is unlikely to execute as progress is set early on
      if (shouldPlay) {
        this.anim.play();
      } else {
        this.anim.reset();
      }
    } else {
      progress.setValue(0);
      if (shouldPlay) {
        Animated.timing(progress, {
          toValue: 1,
          duration: DURATION,
          delay: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          setIsPlaying(false);
        });
      }
    }
    setIsPlaying(shouldPlay);
  };

  // Start animation onLoad
  useEffect(() => {
    setIsPlaying(true);
    manageAnimation(true);
  }, [props.animationId]);

  const onPlayPress = () => manageAnimation(!isPlaying);

  setAnim = anim => {
    this.anim = anim;
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <LottieView
          ref={this.setAnim}
          source={example.getJson()}
          progress={progress}
          loop={false}
          enableMergePathsAndroidForKitKatAndAbove
        />
      </Animated.View>
      <View style={{paddingBottom: 20, paddingHorizontal: 10}}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
            {!isPlaying && <Icon name={'play'} size={10} color={'gray'} />}
            {isPlaying && <Icon name={'pause'} size={10} color={'gray'} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const PLAY_BUTTON_SIZE = 24;
const styles = StyleSheet.create({
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playButton: {
    width: PLAY_BUTTON_SIZE,
    height: PLAY_BUTTON_SIZE,
    borderRadius: PLAY_BUTTON_SIZE / 2,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    width: 10,
    height: 10,
  },
});
