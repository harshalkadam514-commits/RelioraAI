import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

export default function AnimatedPressable({
  children,
  style,
  onPress,
  disabled = false,
  scaleTo = 0.96,
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableBase
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(scaleTo, {
          damping: 14,
          stiffness: 300,
          mass: 0.55,
        });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, {
          damping: 12,
          stiffness: 260,
          mass: 0.5,
        });
      }}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressableBase>
  );
}
