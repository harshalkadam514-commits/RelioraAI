import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { usePremium } from '../store/premiumStore';

export default function PremiumScreen({ onNavigate }) {
  const {
    plans,
    currentPlan,
    isPremium,
    upgrade,
    restorePurchase,
  } = usePremium();

  const handleUpgrade = (planId) => {
    if (planId === 'free') {
      upgrade('free');
      return;
    }

    Alert.alert(
      'Reliora Premium',
      'Subscription checkout will be connected when the payment system is integrated.',
      [
        {
          text: 'Continue',
          onPress: () => upgrade(planId),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleRestore = () => {
    const restored = restorePurchase();

    Alert.alert(
      'Restore Purchase',
      restored
        ? 'Your premium access has been restored.'
        : 'No previous premium purchase was found.'
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>RELIORA AI</Text>
            <Text style={styles.title}>Premium</Text>
            <Text style={styles.subtitle}>
              Unlock the complete companion experience
            </Text>
          </View>

          <Pressable
            style={styles.home}
            onPress={() => onNavigate?.('home')}
          >
            <Ionicons
              name="home-outline"
              size={20}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="diamond"
              size={30}
              color={colors.primary}
            />
          </View>

          <Text style={styles.heroTitle}>
            Go deeper with Reliora
          </Text>

          <Text style={styles.heroText}>
            More memory, smarter conversations, richer
            personalization and advanced AI experiences.
          </Text>

          <View style={styles.badge}>
            <Ionicons
              name="sparkles"
              size={12}
              color={colors.primary}
            />
            <Text style={styles.badgeText}>
              PREMIUM EXPERIENCE
            </Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons
              name={
                isPremium
                  ? 'checkmark-circle'
                  : 'person-circle-outline'
              }
              size={21}
              color={
                isPremium
                  ? colors.success
                  : colors.primary
              }
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.statusTitle}>
              Current Plan
            </Text>

            <Text style={styles.statusPlan}>
              {currentPlan === 'free'
                ? 'Reliora Free'
                : plans.find(
                    (plan) => plan.id === currentPlan
                  )?.name}
            </Text>
          </View>

          <View
            style={[
              styles.statusPill,
              isPremium && styles.statusPillPremium,
            ]}
          >
            <Text
              style={[
                styles.statusPillText,
                isPremium &&
                  styles.statusPillTextPremium,
              ]}
            >
              {isPremium ? 'ACTIVE' : 'FREE'}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Choose your plan
        </Text>

        {plans.map((plan) => {
          const selected = currentPlan === plan.id;
          const recommended = plan.id === 'pro';

          return (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                selected && styles.planCardSelected,
              ]}
            >
              {recommended && (
                <View style={styles.recommended}>
                  <Ionicons
                    name="sparkles"
                    size={11}
                    color="#FFFFFF"
                  />
                  <Text style={styles.recommendedText}>
                    MOST POPULAR
                  </Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <View style={styles.planIcon}>
                  <Ionicons
                    name={
                      plan.id === 'free'
                        ? 'person-outline'
                        : plan.id === 'pro'
                        ? 'diamond-outline'
                        : 'infinite-outline'
                    }
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.flex}>
                  <Text style={styles.planName}>
                    {plan.name}
                  </Text>

                  <Text style={styles.planDescription}>
                    {plan.description}
                  </Text>
                </View>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.price}>
                  {plan.price}
                </Text>

                <Text style={styles.period}>
                  /{plan.period}
                </Text>
              </View>

              <View style={styles.featureList}>
                {plan.features.map((feature) => (
                  <View
                    key={feature}
                    style={styles.featureRow}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={15}
                      color={colors.success}
                    />

                    <Text style={styles.featureText}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              <Pressable
                style={[
                  styles.planButton,
                  selected && styles.planButtonSelected,
                  plan.id === 'free' && styles.freeButton,
                ]}
                onPress={() => handleUpgrade(plan.id)}
              >
                <Text
                  style={[
                    styles.planButtonText,
                    plan.id === 'free' && styles.freeButtonText,
                  ]}
                >
                  {selected
                    ? 'Current Plan'
                    : plan.id === 'free'
                    ? 'Stay Free'
                    : 'Choose Plan'}
                </Text>
              </Pressable>
            </View>
          );
        })}

        <View style={styles.restoreCard}>
          <View style={styles.restoreIcon}>
            <Ionicons
              name="refresh-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.restoreTitle}>
              Already subscribed?
            </Text>

            <Text style={styles.restoreText}>
              Restore your previous purchase on this device.
            </Text>
          </View>

          <Pressable
            style={styles.restoreButton}
            onPress={handleRestore}
          >
            <Text style={styles.restoreButtonText}>
              Restore
            </Text>
          </Pressable>
        </View>

        <View style={styles.legal}>
          <Ionicons
            name="shield-checkmark-outline"
            size={13}
            color={colors.textMuted}
          />

          <Text style={styles.legalText}>
            Subscription billing, cancellation and payment
            processing will be handled by the platform
            payment provider.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 8,
    letterSpacing: 1.5,
    fontWeight: '800',
  },

  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 3,
  },

  subtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 4,
  },

  home: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hero: {
    marginTop: 19,
    padding: 22,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.18)',
    alignItems: 'center',
  },

  heroIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: 'rgba(155,123,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 12,
  },

  heroText: {
    color: colors.textMuted,
    fontSize: 8,
    lineHeight: 13,
    textAlign: 'center',
    marginTop: 7,
  },

  badge: {
    marginTop: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(155,123,255,0.09)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  badgeText: {
    color: colors.primary,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  statusCard: {
    marginTop: 10,
    padding: 13,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusTitle: {
    color: colors.textMuted,
    fontSize: 7,
  },

  statusPlan: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 3,
  },

  statusPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: colors.surface2,
  },

  statusPillPremium: {
    backgroundColor: 'rgba(88,214,163,0.1)',
  },

  statusPillText: {
    color: colors.textMuted,
    fontSize: 6,
    fontWeight: '900',
  },

  statusPillTextPremium: {
    color: colors.success,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '850',
    marginTop: 23,
    marginBottom: 10,
  },

  planCard: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 21,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  planCardSelected: {
    borderColor: 'rgba(155,123,255,0.35)',
  },

  recommended: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },

  recommendedText: {
    color: '#FFFFFF',
    fontSize: 6,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  planIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
  },

  planName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },

  planDescription: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 3,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 14,
  },

  price: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
  },

  period: {
    color: colors.textMuted,
    fontSize: 8,
    marginLeft: 4,
  },

  featureList: {
    marginTop: 12,
    gap: 8,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  featureText: {
    color: colors.textSecondary,
    fontSize: 8,
  },

  planButton: {
    height: 43,
    marginTop: 16,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  planButtonSelected: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },

  freeButton: {
    backgroundColor: colors.surface2,
  },

  planButtonText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },

  freeButtonText: {
    color: colors.textSecondary,
  },

  restoreCard: {
    padding: 13,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  restoreIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  restoreTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '800',
  },

  restoreText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 10,
    marginTop: 3,
  },

  restoreButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.surface2,
  },

  restoreButtonText: {
    color: colors.primary,
    fontSize: 7,
    fontWeight: '800',
  },

  legal: {
    marginTop: 17,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 6,
  },

  legalText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 6,
    lineHeight: 10,
    textAlign: 'center',
  },
});
