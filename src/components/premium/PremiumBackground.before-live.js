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

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function PremiumBackground({ children, intensity = 1 }) {
  const drift = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, {
        duration: 9000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    pulse.value = withRepeat(
      withTiming(1, {
        duration: 5200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const topGlowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(drift.value, [0, 1], [-35, 35]),
      },
      {
        translateY: interpolate(drift.value, [0, 1], [-20, 45]),
      },
      {
        scale: interpolate(pulse.value, [0, 1], [1, 1.14]),
      },
    ],
    opacity: interpolate(pulse.value, [0, 1], [0.52, 0.82]) * intensity,
  }));

  const bottomGlowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(drift.value, [0, 1], [30, -30]),
      },
      {
        translateY: interpolate(drift.value, [0, 1], [20, -35]),
      },
      {
        scale: interpolate(pulse.value, [0, 1], [1.05, 1.2]),
      },
    ],
    opacity: interpolate(pulse.value, [0, 1], [0.30, 0.55]) * intensity,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          colors.backgroundSoft,
          colors.background,
          '#05050C',
        ]}
        locations={[0, 0.48, 1]}
        style={StyleSheet.absoluteFill}
      />

      <AnimatedGradient
        colors={[
          'rgba(105,70,232,0.30)',
          'rgba(155,123,255,0.08)',
          'rgba(155,123,255,0)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.topGlow, topGlowStyle]}
        pointerEvents="none"
      />

      <AnimatedGradient
        colors={[
          'rgba(255,159,188,0)',
          'rgba(255,159,188,0.06)',
          'rgba(232,111,153,0.20)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomGlow, bottomGlowStyle]}
        pointerEvents="none"
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
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
  },

  topGlow: {
    position: 'absolute',
    width: 420,
    height: 420,
    top: -190,
    left: -120,
    borderRadius: 220,
  },

  bottomGlow: {
    position: 'absolute',
    width: 380,
    height: 380,
    bottom: -180,
    right: -120,
    borderRadius: 200,
  },
});
