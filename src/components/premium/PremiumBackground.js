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

function FloatingOrb({ style, color, duration, delay = 0 }) {
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
        translateX: interpolate(
          progress.value,
          [0, 0.5, 1],
          [-35, 25, -35]
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 0.5, 1],
          [25, -35, 25]
        ),
      },
      {
        scale: interpolate(
          progress.value,
          [0, 0.5, 1],
          [0.9, 1.12, 0.9]
        ),
      },
    ],
    opacity: interpolate(
      progress.value,
      [0, 0.5, 1],
      [0.25, 0.6, 0.25]
    ),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.floatingOrb, style, animatedStyle]}
    >
      <LinearGradient
        colors={[
          color,
          'rgba(255,255,255,0.02)',
          'rgba(255,255,255,0)',
        ]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

export default function PremiumBackground({
  children,
  intensity = 1,
}) {
  const drift = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, {
        duration: 11000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    pulse.value = withRepeat(
      withTiming(1, {
        duration: 6500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const topGlowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          drift.value,
          [0, 1],
          [-45, 45]
        ),
      },
      {
        translateY: interpolate(
          drift.value,
          [0, 1],
          [-25, 55]
        ),
      },
      {
        scale: interpolate(
          pulse.value,
          [0, 1],
          [1, 1.18]
        ),
      },
    ],
    opacity:
      interpolate(
        pulse.value,
        [0, 1],
        [0.42, 0.78]
      ) * intensity,
  }));

  const bottomGlowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          drift.value,
          [0, 1],
          [40, -40]
        ),
      },
      {
        translateY: interpolate(
          drift.value,
          [0, 1],
          [30, -45]
        ),
      },
      {
        scale: interpolate(
          pulse.value,
          [0, 1],
          [1.05, 1.22]
        ),
      },
    ],
    opacity:
      interpolate(
        pulse.value,
        [0, 1],
        [0.24, 0.52]
      ) * intensity,
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
          'rgba(105,70,232,0.34)',
          'rgba(155,123,255,0.10)',
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
          'rgba(255,159,188,0.07)',
          'rgba(232,111,153,0.22)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomGlow, bottomGlowStyle]}
        pointerEvents="none"
      />

      <FloatingOrb
        color="rgba(155,123,255,0.30)"
        duration={12000}
        delay={200}
        style={styles.orbOne}
      />

      <FloatingOrb
        color="rgba(255,159,188,0.24)"
        duration={14500}
        delay={900}
        style={styles.orbTwo}
      />

      <FloatingOrb
        color="rgba(120,185,255,0.18)"
        duration={17000}
        delay={1400}
        style={styles.orbThree}
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
    width: 460,
    height: 460,
    top: -210,
    left: -130,
    borderRadius: 230,
  },

  bottomGlow: {
    position: 'absolute',
    width: 420,
    height: 420,
    bottom: -200,
    right: -140,
    borderRadius: 210,
  },

  floatingOrb: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    overflow: 'hidden',
  },

  orbOne: {
    top: '18%',
    left: '-12%',
  },

  orbTwo: {
    top: '48%',
    right: '-18%',
  },

  orbThree: {
    bottom: '8%',
    left: '28%',
  },
});
