import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';

export default function App() {
  // Set the accelerometer update interval (e.g., every 100 ms)
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);

  // State to hold accelerometer values
  const [acceleration, setAcceleration] = useState({x: 0, y: 0, z: 0});

  useEffect(() => {
    // Subscribe to accelerometer data
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      setAcceleration({x, y, z});
    });

    // Clean up the subscription
    return () => subscription.unsubscribe();
  }, []);

  // Animated styles for the background and foreground images
  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: withSpring(acceleration.x * 5, {damping: 20})},
      {translateY: withSpring(-acceleration.y * 5, {damping: 20})},
    ],
  }));

  const foregroundStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: withSpring(acceleration.x * 8, {damping: 20})},
      {translateY: withSpring(-acceleration.y * 5, {damping: 20})},
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, backgroundStyle]}>
        <Image
          source={require('./SensorAssets/background.jpg')}
          style={styles.image}
        />
      </Animated.View>

      <Animated.View style={[styles.foreground, foregroundStyle]}>
        <Image
          source={require('./SensorAssets/foreground.png')}
          style={styles.image}
        />
      </Animated.View>

      <Text style={styles.text}>Dream Come True</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    width: '160%',
    height: '160%',
  },
  foreground: {
    position: 'absolute',
    width: '140%',
    height: '110%',
    bottom: -50,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    top: 130,
  },
});
