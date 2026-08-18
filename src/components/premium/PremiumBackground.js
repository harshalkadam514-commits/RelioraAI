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

function FloatingOrb({
  size,
  color,
  startX,
  startY,
  duration,
  delay = 0,
  opacity = 0.3,
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const start = setTimeout(() => {
      progress.value = withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(start);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [-45, 55]
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [35, -55]
        ),
      },
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [0.86, 1.16]
        ),
      },
    ],
    opacity: interpolate(
      progress.value,
      [0, 0.5, 1],
      [opacity * 0.65, opacity, opacity * 0.75]
    ),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.floatingOrb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: startX,
          top: startY,
          opacity,
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={[
          color,
          'rgba(255,255,255,0.04)',
          'rgba(255,255,255,0)',
        ]}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 0.9 }}
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
  const breathe = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, {
        duration: 12000,
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

    breathe.value = withRepeat(
      withTiming(1, {
        duration: 4200,
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
          [-55, 70]
        ),
      },
      {
        translateY: interpolate(
          drift.value,
          [0, 1],
          [-35, 65]
        ),
      },
      {
        scale: interpolate(
          pulse.value,
          [0, 1],
          [0.92, 1.2]
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
          [55, -75]
        ),
      },
      {
        translateY: interpolate(
          drift.value,
          [0, 1],
          [35, -55]
        ),
      },
      {
        scale: interpolate(
          pulse.value,
          [0, 1],
          [0.94, 1.22]
        ),
      },
    ],
    opacity:
      interpolate(
        pulse.value,
        [0, 1],
        [0.25, 0.58]
      ) * intensity,
  }));

  const centerGlowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          drift.value,
          [0, 1],
          [35, -40]
        ),
      },
      {
        translateY: interpolate(
          drift.value,
          [0, 1],
          [-20, 35]
        ),
      },
      {
        scale: interpolate(
          breathe.value,
          [0, 1],
          [0.85, 1.18]
        ),
      },
    ],
    opacity:
      interpolate(
        breathe.value,
        [0, 1],
        [0.08, 0.24]
      ) * intensity,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          '#10101D',
          colors.background,
          '#06060E',
          '#040409',
        ]}
        locations={[0, 0.38, 0.72, 1]}
        style={StyleSheet.absoluteFill}
      />

      <AnimatedGradient
        colors={[
          'rgba(105,70,232,0.38)',
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
          'rgba(232,111,153,0.25)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bottomGlow, bottomGlowStyle]}
        pointerEvents="none"
      />

      <Animated.View
        pointerEvents="none"
        style={[styles.centerGlow, centerGlowStyle]}
      >
        <LinearGradient
          colors={[
            'rgba(155,123,255,0.18)',
            'rgba(155,123,255,0)',
          ]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <FloatingOrb
        size={170}
        color="rgba(155,123,255,0.24)"
        startX={-70}
        startY={120}
        duration={11500}
        opacity={0.8}
      />

      <FloatingOrb
        size={130}
        color="rgba(255,159,188,0.20)"
        startX={260}
        startY={260}
        duration={13500}
        delay={700}
        opacity={0.7}
      />

      <FloatingOrb
        size={95}
        color="rgba(120,185,255,0.16)"
        startX={40}
        startY={520}
        duration={10000}
        delay={1200}
        opacity={0.65}
      />

      <FloatingOrb
        size={210}
        color="rgba(105,70,232,0.12)"
        startX={250}
        startY={620}
        duration={16000}
        delay={500}
        opacity={0.6}
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
    zIndex: 10,
  },

  topGlow: {
    position: 'absolute',
    width: 470,
    height: 470,
    top: -210,
    left: -150,
    borderRadius: 240,
  },

  bottomGlow: {
    position: 'absolute',
    width: 440,
    height: 440,
    bottom: -210,
    right: -150,
    borderRadius: 230,
  },

  centerGlow: {
    position: 'absolute',
    width: 340,
    height: 340,
    top: '35%',
    left: '12%',
    borderRadius: 180,
    overflow: 'hidden',
  },

  floatingOrb: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
