import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PremiumBackground({ children }) {
  const topFloat = React.useRef(new Animated.Value(0)).current;
  const rightFloat = React.useRef(new Animated.Value(0)).current;
  const bottomFloat = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const topLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(topFloat, {
          toValue: 1,
          duration: 7000,
          useNativeDriver: true,
        }),
        Animated.timing(topFloat, {
          toValue: 0,
          duration: 7000,
          useNativeDriver: true,
        }),
      ])
    );

    const rightLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(rightFloat, {
          toValue: 1,
          duration: 8500,
          useNativeDriver: true,
        }),
        Animated.timing(rightFloat, {
          toValue: 0,
          duration: 8500,
          useNativeDriver: true,
        }),
      ])
    );

    const bottomLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bottomFloat, {
          toValue: 1,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(bottomFloat, {
          toValue: 0,
          duration: 9000,
          useNativeDriver: true,
        }),
      ])
    );

    topLoop.start();
    rightLoop.start();
    bottomLoop.start();

    return () => {
      topLoop.stop();
      rightLoop.stop();
      bottomLoop.stop();
    };
  }, []);

  const topTranslateX = topFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 35],
  });

  const topTranslateY = topFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  const rightTranslateX = rightFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const rightTranslateY = rightFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 35],
  });

  const bottomTranslateX = bottomFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const bottomTranslateY = bottomFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05020D', '#0B031A', '#12052A', '#070313']}
        locations={[0, 0.35, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.glowTop,
          {
            transform: [
              { translateX: topTranslateX },
              { translateY: topTranslateY },
            ],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.glowRight,
          {
            transform: [
              { translateX: rightTranslateX },
              { translateY: rightTranslateY },
            ],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.glowBottom,
          {
            transform: [
              { translateX: bottomTranslateX },
              { translateY: bottomTranslateY },
            ],
          },
        ]}
      />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#070313',
  },

  content: {
    flex: 1,
  },

  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.28,
  },

  glowTop: {
    top: -150,
    left: -80,
    backgroundColor: '#7C3AED',
  },

  glowRight: {
    top: 130,
    right: -180,
    backgroundColor: '#D946EF',
  },

  glowBottom: {
    bottom: -180,
    left: 40,
    backgroundColor: '#4C1D95',
  },
});
