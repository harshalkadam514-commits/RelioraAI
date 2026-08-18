import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import RAnimated, {
  Easing as REasing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { colors, typography, spacing, radius, shadow } from '../theme';
import PremiumBackground from '../components/premium/PremiumBackground';
import GlassCard from '../components/premium/GlassCard';
import AnimatedPressable from '../components/premium/AnimatedPressable';

const quickActions = [
  { icon: 'chatbubble-ellipses-outline', label: 'Talk to me' },
  { icon: 'heart-outline', label: 'I need support' },
  { icon: 'calendar-outline', label: 'Plan my day' },
  { icon: 'book-outline', label: 'Study with me' },
];

const moods = [
  { emoji: '😞', label: 'Low' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Great' },
  { emoji: '🤩', label: 'Amazing' },
];

function usePressScale() {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };
  return { scale, onPressIn, onPressOut };
}

function AnimatedCard({ children, style, onPress }) {
  const { scale, onPressIn, onPressOut } = usePressScale();
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}


function FloatingOrb() {
  const float = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 3600,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 3600,
          useNativeDriver: true,
        }),
      ])
    );

    const breatheLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    breatheLoop.start();

    return () => {
      floatLoop.stop();
      breatheLoop.stop();
    };
  }, [float, breathe]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [8, -12],
  });

  const scale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.035],
  });

  return (
    <Animated.View
      style={[
        styles.orbStage,
        {
          transform: [
            { translateY },
            { scale },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={['#BDF7FF', '#00D4FF', '#6C63FF', '#7B3FF2']}
        locations={[0, 0.35, 0.72, 1]}
        start={{ x: 0.08, y: 0.08 }}
        end={{ x: 0.92, y: 0.92 }}
        style={styles.orb}
      >
        <View style={styles.orbHighlight} />
        <View style={styles.orbInner}>
          <Ionicons name="sparkles" size={38} color="#FFFFFF" />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

export default function HomeScreen({ onNavigate }) {
  const pulse = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(24)).current;

  const headerAnim = useRef(new Animated.Value(0)).current;
  const orbAnim = useRef(new Animated.Value(0)).current;
  const modeAnim = useRef(new Animated.Value(0)).current;
  const actionAnims = useRef(
    quickActions.map(() => new Animated.Value(0))
  ).current;
  const moodAnim = useRef(new Animated.Value(0)).current;
  const featureAnims = useRef(
    [0, 1, 2, 3].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 1900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1900,
          useNativeDriver: true,
        }),
      ])
    );

    pulseLoop.start();

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(orbAnim, {
        toValue: 1,
        duration: 650,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(modeAnim, {
        toValue: 1,
        duration: 500,
        delay: 250,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.stagger(
      90,
      actionAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        })
      )
    ).start();

    Animated.timing(moodAnim, {
      toValue: 1,
      duration: 500,
      delay: 650,
      useNativeDriver: true,
    }).start();

    Animated.stagger(
      80,
      featureAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 420,
          delay: 720,
          useNativeDriver: true,
        })
      )
    ).start();

    return () => {
      pulseLoop.stop();
    };
  }, []);

  const entrance = (value, distance = 18) => ({
    opacity: value,
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
      {
        scale: value.interpolate({
          inputRange: [0, 1],
          outputRange: [0.97, 1],
        }),
      },
    ],
  });

  return (
    <PremiumBackground intensity={1}>
      <View style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Animated.View
          style={{ opacity: fade, transform: [{ translateY: rise }] }}
        >
          <Animated.View style={entrance(headerAnim, 12)}>
            <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>YOUR AI COMPANION</Text>
              <Text style={styles.logo}>Reliora AI</Text>
            </View>

            <Pressable
              style={styles.profile}
              onPress={() => onNavigate?.('profile')}
            >
              <LinearGradient
                colors={colors.gradientPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profileGradient}
              >
                <Text style={styles.profileText}>H</Text>
              </LinearGradient>
            </Pressable>
            </View>
          </Animated.View>

          <Animated.View style={entrance(orbAnim, 20)}>
  <View style={styles.orbContainer}>
    <FloatingOrb />
    <Text style={styles.greeting}>Hey, Harsh 👋</Text>
    <Text style={styles.subtitle}>
      I'm here. What's on your mind?
    </Text>
  </View>
</Animated.View>

          <Animated.View style={entrance(modeAnim, 22)}>
            <AnimatedCard
            style={styles.modeCard}
            onPress={() => onNavigate?.('personalization')}
          >
            <GlassCard style={styles.glassFill}>
            <View style={styles.modeIcon}>
              <Ionicons name="people-outline" size={22} color={colors.primary} />
            </View>

            <View style={styles.modeContent}>
              <Text style={styles.modeLabel}>CURRENT RELATIONSHIP</Text>
              <Text style={styles.modeValue}>Best Friend</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
                        </GlassCard>
</AnimatedCard>
          </Animated.View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>How can I help?</Text>
            <Text style={styles.sectionHint}>Quick actions</Text>
          </View>

          <View style={styles.actionGrid}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={action.label}
                style={[styles.actionSlot, entrance(actionAnims[index], 16)]}
              >
                <AnimatedCard
                  style={styles.actionCard}
                  onPress={() => onNavigate?.('chat')}
                >
                  <View style={styles.actionIcon}>
                    <Ionicons
                      name={action.icon}
                      size={22}
                      color={colors.primary}
                    />
                  </View>

                  <Text
                    style={styles.actionText}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {action.label}
                  </Text>
                </AnimatedCard>
              </Animated.View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily check-in</Text>
            <Text style={styles.sectionHint}>Private</Text>
          </View>

          <Animated.View style={entrance(moodAnim, 18)}>
            <GlassCard style={styles.moodCard}>
            <Text style={styles.moodQuestion}>
              How are you feeling today?
            </Text>

            <View style={styles.moodRow}>
              {moods.map((mood) => (
                <Pressable key={mood.label} style={styles.moodButton}>
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </Pressable>
              ))}
            </View>
            </GlassCard>
          </Animated.View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your space</Text>
          </View>

          <View style={styles.featureRow}>
            <Feature
              icon="book-outline"
              title="Journal"
              subtitle="Write & reflect"
              onPress={() => onNavigate?.('journal')}
            />
            <Feature
              icon="checkmark-circle-outline"
              title="Goals"
              subtitle="Stay on track"
              onPress={() => onNavigate?.('goals')}
            />
          </View>

          <View style={styles.featureRow}>
            <Feature
              icon="analytics-outline"
              title="Insights"
              subtitle="Understand yourself"
              onPress={() => onNavigate?.('insights')}
            />
            <Feature
              icon="mic-outline"
              title="Voice"
              subtitle="Talk naturally"
              onPress={() => onNavigate?.('voice')}
            />
          </View>

          <View style={styles.footerSpace} />
        </Animated.View>
      </ScrollView>
      </View>
    </PremiumBackground>
  );
}

function Feature({ icon, title, subtitle, onPress }) {
  return (
    <AnimatedCard style={styles.featureCard} onPress={onPress}>
<GlassCard style={styles.glassFill}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>

      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    
</GlassCard>
</AnimatedCard>
  );
}

const styles = StyleSheet.create({
  glassFill: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 48,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  eyebrow: {
    color: colors.textMuted,
    ...typography.eyebrow,
  },

  logo: {
    color: colors.text,
    ...typography.display,
    marginTop: 5,
  },

  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    ...shadow.glow,
  },

  profileGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  orbContainer: {
    alignItems: 'center',
    marginTop: 46,
  },

  orbGlow: {
    position: 'absolute',
    top: -10,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary,
    opacity: 0.18,
  },

  orbStage: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  orbHighlight: {
    position: 'absolute',
    top: 13,
    left: 18,
    width: 62,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.24)',
    transform: [{ rotate: '-28deg' }],
  },

  orb: {
    width: 132,
    height: 132,
    borderRadius: 66,
    padding: 4,
  },

  orbInner: {
    flex: 1,
    borderRadius: 62,
    backgroundColor: 'rgba(20,17,32,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  greeting: {
    color: colors.text,
    ...typography.display,
    marginTop: 26,
  },

  subtitle: {
    color: colors.textSecondary,
    ...typography.body,
    marginTop: 8,
  },

  modeCard: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow.card,
  },

  modeIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: 'rgba(166,131,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  modeContent: {
    flex: 1,
  },

  modeLabel: {
    color: colors.textMuted,
    ...typography.micro,
    letterSpacing: 1.3,
  },

  modeValue: {
    color: colors.text,
    ...typography.subheading,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: colors.text,
    ...typography.heading,
  },

  sectionHint: {
    color: colors.textMuted,
    ...typography.caption,
  },

  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },

  actionSlot: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  actionCard: {
    width: '100%',
    height: 116,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },

  actionIcon: {
    width: 42,
    height: 42,
    flexShrink: 0,
    borderRadius: radius.md,
    backgroundColor: 'rgba(166,131,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  actionText: {
    color: colors.text,
    ...typography.body,
    fontWeight: '700',
    lineHeight: 20,
    width: '100%',
    flexShrink: 1,
    includeFontPadding: false,
  },

  moodCard: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  moodQuestion: {
    color: colors.text,
    ...typography.subheading,
  },

  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },

  moodButton: {
    alignItems: 'center',
  },

  moodEmoji: {
    fontSize: 26,
  },

  moodLabel: {
    color: colors.textMuted,
    ...typography.micro,
    marginTop: 6,
  },

  featureRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  featureCard: {
    flex: 1,
    padding: spacing.md,
    minHeight: 128,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(166,131,255,0.18)',
    ...shadow.card,
  },

  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: 'rgba(166,131,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  featureTitle: {
    color: colors.text,
    ...typography.body,
  },

  featureSubtitle: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: 3,
  },

  footerSpace: {
    height: 20,
  },
});
