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


function FloatingOrb({ pulse, floatAnim, breathAnim, glowAnim }) {
  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const breathScale = breathAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.035],
  });

  const pulseScale = pulse.interpolate({
    inputRange: [1, 1.08],
    outputRange: [1, 1.012],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.30],
  });

  return (
    <Animated.View
      style={[
        styles.orbAnimated,
        {
          transform: [
            { translateY: floatY },
            { scale: Animated.multiply(breathScale, pulseScale) },
          ],
        },
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.orbGlowAnimated,
          {
            opacity: glowOpacity,
          },
        ]}
      />

      <LinearGradient
        colors={['#E9DEFF', colors.primary, colors.accentSoft]}
        start={{ x: 0.05, y: 0.05 }}
        end={{ x: 0.95, y: 0.95 }}
        style={styles.orb}
      >
        <View style={styles.orbHalo} />
        <View style={styles.orbInner}>
          <Ionicons name="sparkles" size={34} color="#FFFFFF" />
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
  const orbFloat = useRef(new Animated.Value(0)).current;
  const orbBreath = useRef(new Animated.Value(0)).current;
  const orbGlow = useRef(new Animated.Value(0)).current;
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

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbFloat, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(orbFloat, {
          toValue: 0,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    );

    const breathLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbBreath, {
          toValue: 1,
          duration: 2100,
          useNativeDriver: true,
        }),
        Animated.timing(orbBreath, {
          toValue: 0,
          duration: 2100,
          useNativeDriver: true,
        }),
      ])
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbGlow, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(orbGlow, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    breathLoop.start();
    glowLoop.start();

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
      floatLoop.stop();
      breathLoop.stop();
      glowLoop.stop();
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
    <FloatingOrb pulse={pulse} floatAnim={orbFloat} breathAnim={orbBreath} glowAnim={orbGlow} />
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
            <Text style={styles.featureSectionTitle}>Your space</Text>
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
    ...typography.title,
    fontSize: 29,
    marginTop: 5,
    letterSpacing: -0.8,
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

  orbGlowAnimated: {
    position: 'absolute',
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.45,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },

  orbAnimated: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },

  orb: {
    width: 136,
    height: 136,
    borderRadius: 68,
    padding: 4,
    ...shadow.glow,
  },

  orbHalo: {
    position: 'absolute',
    width: 122,
    height: 122,
    borderRadius: 61,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },

  orbInner: {
    flex: 1,
    borderRadius: 64,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  greeting: {
    color: colors.text,
    ...typography.hero,
    fontSize: 25,
    lineHeight: 31,
    marginTop: 18,
    textAlign: 'center',
    textShadowColor: 'rgba(168,85,247,0.55)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 18,
  },

  subtitle: {
    color: colors.textSecondary,
    ...typography.body,
    fontSize: 15,
    marginTop: 7,
    textAlign: 'center',
    letterSpacing: 0.2,
  },

  modeCard: {
    marginTop: 22,
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
    height: 110,
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

  featureSectionTitle: {
    color: colors.text,
    ...typography.subheading,
  },

  featureRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  featureCard: {
    flex: 1,
    padding: spacing.sm,
    minHeight: 96,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(166,131,255,0.18)',
    ...shadow.card,
  },

  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: 'rgba(166,131,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },

  featureTitle: {
    color: colors.text,
    ...typography.body,
  },

  featureSubtitle: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: 2,
  },

  footerSpace: {
    height: 20,
  },
});
