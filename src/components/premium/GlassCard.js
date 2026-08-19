import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { radius, shadow } from '../../theme';

export default function GlassCard({
  children,
  style,
  intensity = 35,
  tint = 'dark',
  border = true,
}) {
  return (
    <View style={[styles.wrapper, shadow.card, style]}>
      <BlurView
        intensity={intensity}
        tint={tint}
        style={styles.blur}
      >
        <View
          style={[
            styles.overlay,
            border && styles.border,
          ]}
        >
          {children}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: radius.xl,
    backgroundColor: 'rgba(18, 10, 42, 0.58)',
  },

  blur: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
  },

  border: {
    borderWidth: 1,
    borderColor: 'rgba(205, 180, 255, 0.16)',
  },
});
