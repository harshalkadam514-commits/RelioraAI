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

function AuroraBlob({ color, style, duration, range }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          range.x
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          range.y
        ),
      },
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [0.92, 1.12]
        ),
      },
    ],
    opacity: interpolate(
      progress.value,
      [0, 1],
      [0.42, 0.72]
    ),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.blob, style, animatedStyle]}
    >
      <LinearGradient
        colors={[
          color,
          'rgba(255,255,255,0.04)',
          'rgba(255,255,255,0)',
        ]}
        start={{ x: 0.15, y: 0.15 }}
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
  const atmosphere = useSharedValue(0);

  useEffect(() => {
    atmosphere.value = withRepeat(
      withTiming(1, {
        duration: 9000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const atmosphereStyle = useAnimatedStyle(() => ({
    opacity:
      interpolate(
        atmosphere.value,
        [0, 1],
        [0.55, 0.9]
      ) * intensity,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          '#111827',
          '#17213A',
          '#111A2E',
        ]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          atmosphereStyle,
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(123,63,242,0.20)',
            'rgba(0,212,255,0.07)',
            'rgba(255,107,222,0.13)',
            'rgba(17,24,39,0)',
          ]}
          locations={[0, 0.32, 0.68, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <AuroraBlob
        color="rgba(123,63,242,0.38)"
        duration={11000}
        range={{
          x: [-35, 55],
          y: [25, -35],
        }}
        style={styles.violet}
      />

      <AuroraBlob
        color="rgba(0,212,255,0.28)"
        duration={14000}
        range={{
          x: [35, -45],
          y: [-20, 45],
        }}
        style={styles.cyan}
      />

      <AuroraBlob
        color="rgba(255,107,222,0.28)"
        duration={16000}
        range={{
          x: [-25, 35],
          y: [30, -25],
        }}
        style={styles.pink}
      />

      <View style={styles.vignette} pointerEvents="none" />

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
    backgroundColor: '#111827',
  },

  content: {
    flex: 1,
  },

  blob: {
    position: 'absolute',
    width: 330,
    height: 330,
    borderRadius: 165,
    overflow: 'hidden',
  },

  violet: {
    top: -110,
    left: -120,
  },

  cyan: {
    top: '30%',
    right: -150,
  },

  pink: {
    bottom: -120,
    left: '18%',
  },

  vignette: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.025)',
  },
});
