import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../theme';

const AnimatedGradient =
  Animated.createAnimatedComponent(LinearGradient);

function FloatingOrb({ style, colorsArr, duration, delay = 0 }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      progress.value = withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 0.5, 1], [-40, 30, -40]),
      },
      {
        translateY: interpolate(progress.value, [0, 0.5, 1], [30, -40, 30]),
      },
      {
        scale: interpolate(progress.value, [0, 0.5, 1], [0.9, 1.15, 0.9]),
      },
    ],
    opacity: interpolate(progress.value, [0, 0.5, 1], [0.55, 0.85, 0.55]),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.floatingOrb, style, animatedStyle]}
    >
      <LinearGradient
        colors={colorsArr}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

export default function PremiumBackground({ children, intensity = 1 }) {
  const drift = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, { duration: 13000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.backgroundSoft, colors.background]}
        style={StyleSheet.absoluteFill}
      />

      <FloatingOrb
        colorsArr={['rgba(139,127,232,0.35)', 'rgba(139,127,232,0)']}
        duration={12000}
        delay={0}
        style={styles.orbOne}
      />

      <FloatingOrb
        colorsArr={['rgba(245,201,155,0.40)', 'rgba(245,201,155,0)']}
        duration={15000}
        delay={600}
        style={styles.orbTwo}
      />

      <FloatingOrb
        colorsArr={['rgba(244,169,192,0.35)', 'rgba(244,169,192,0)']}
        duration={17000}
        delay={1200}
        style={styles.orbThree}
      />

      <FloatingOrb
        colorsArr={['rgba(125,211,192,0.30)', 'rgba(125,211,192,0)']}
        duration={14000}
        delay={1800}
        style={styles.orbFour}
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  floatingOrb: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    overflow: 'hidden',
  },
  orbOne: {
    top: '-8%',
    left: '-20%',
  },
  orbTwo: {
    top: '8%',
    right: '-25%',
  },
  orbThree: {
    bottom: '15%',
    left: '-18%',
  },
  orbFour: {
    bottom: '-10%',
    right: '-15%',
  },
});
