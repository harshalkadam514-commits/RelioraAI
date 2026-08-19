import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PremiumBackground({ children }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#05020D', '#0B031A', '#12052A', '#070313']}
        locations={[0, 0.35, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View pointerEvents="none" style={[styles.glow, styles.glowTop]} />
      <View pointerEvents="none" style={[styles.glow, styles.glowRight]} />
      <View pointerEvents="none" style={[styles.glow, styles.glowBottom]} />

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
