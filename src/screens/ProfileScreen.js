import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { usePrivacy } from '../store/privacyStore';

const relationshipModes = [
  { id: 'mother', title: 'Mother', subtitle: 'Warm, nurturing & caring', icon: 'flower-outline' },
  { id: 'father', title: 'Father', subtitle: 'Protective & grounded', icon: 'shield-outline' },
  { id: 'brother', title: 'Brother', subtitle: 'Protective & straightforward', icon: 'body-outline' },
  { id: 'sister', title: 'Sister', subtitle: 'Caring & emotionally close', icon: 'sparkles-outline' },
  { id: 'grandfather', title: 'Grandfather', subtitle: 'Wise & calm perspective', icon: 'glasses-outline' },
  { id: 'grandmother', title: 'Grandmother', subtitle: 'Gentle & comforting', icon: 'heart-circle-outline' },
  { id: 'uncle', title: 'Uncle', subtitle: 'Fun, relaxed & supportive', icon: 'happy-outline' },
  { id: 'aunty', title: 'Aunty', subtitle: 'Warm & encouraging', icon: 'flower-outline' },
  { id: 'best_friend', title: 'Best Friend', subtitle: 'Casual, supportive & fun', icon: 'people-outline' },
  { id: 'mentor', title: 'Mentor', subtitle: 'Wise, focused & challenging', icon: 'school-outline' },
];

const settings = [
  {
    id: 'memory',
    title: 'Memory',
    subtitle: 'Manage what Reliora remembers',
    icon: 'albums-outline',
  },
  {
    id: 'mood',
    title: 'Mood & Emotion',
    subtitle: 'Mood tracking and emotional insights',
    icon: 'pulse-outline',
  },
  {
    id: 'voice',
    title: 'Voice',
    subtitle: 'Voice conversation preferences',
    icon: 'mic-outline',
  },
  {
    id: 'personalization',
    title: 'Personalization',
    subtitle: 'Customize your Reliora experience',
    icon: 'person-outline',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    subtitle: 'Data, memory and app security',
    icon: 'shield-checkmark-outline',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Reminders and check-ins',
    icon: 'notifications-outline',
  },
];

export default function ProfileScreen({ onNavigate }) {
  const [mode, setMode] = useState('friend');
  const [privateMode, setPrivateMode] = useState(false);
  const { privacy, togglePrivacy } = usePrivacy();

  const selectedMode =
    relationshipModes.find((item) => item.id === mode) || relationshipModes[0];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#151126', '#07070A']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.iconButton}
            onPress={() => onNavigate?.('home')}
          >
            <Ionicons name="chevron-back" size={23} color="#FFFFFF" />
          </Pressable>

          <View>
            <Text style={styles.eyebrow}>YOUR SPACE</Text>
            <Text style={styles.title}>Profile</Text>
          </View>

          <Pressable style={styles.iconButton}>
            <Ionicons name="create-outline" size={21} color="#A7A9B4" />
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarOuter}>
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>H</Text>
            </LinearGradient>

            <View style={styles.onlineDot} />
          </View>

          <Text style={styles.name}>Harsh</Text>
          <Text style={styles.handle}>Your Reliora journey</Text>

          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>12</Text>
              <Text style={styles.profileStatLabel}>Day streak</Text>
            </View>

            <View style={styles.profileDivider} />

            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>128</Text>
              <Text style={styles.profileStatLabel}>Chats</Text>
            </View>

            <View style={styles.profileDivider} />

            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>14</Text>
              <Text style={styles.profileStatLabel}>Journals</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Relationship with Reliora</Text>

        <View style={styles.currentMode}>
          <View style={styles.modeIcon}>
            <Ionicons
              name={selectedMode.icon}
              size={21}
              color="#FFFFFF"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.modeLabel}>CURRENT MODE</Text>
            <Text style={styles.modeTitle}>{selectedMode.title}</Text>
            <Text style={styles.modeSubtitle}>{selectedMode.subtitle}</Text>
          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>ACTIVE</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.modes}
        >
          {relationshipModes.map((item) => {
            const active = item.id === mode;

            return (
              <Pressable
                key={item.id}
                onPress={() => setMode(item.id)}
                style={[
                  styles.modeCard,
                  active && styles.modeCardActive,
                ]}
              >
                <View
                  style={[
                    styles.modeCardIcon,
                    active && styles.modeCardIconActive,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={19}
                    color={active ? '#FFFFFF' : colors.textSecondary}
                  />
                </View>

                <Text
                  style={[
                    styles.modeCardTitle,
                    active && styles.modeCardTitleActive,
                  ]}
                >
                  {item.title}
                </Text>

                <Text style={styles.modeCardSubtitle}>
                  {item.subtitle}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Reliora preferences</Text>

        <View style={styles.settingsCard}>
          {settings.map((item, index) => (
            <Pressable
              key={item.id}
              style={[
                styles.settingRow,
                index !== settings.length - 1 && styles.settingBorder,
              ]}
              onPress={() => onNavigate?.(item.id)}
            >
              <View style={styles.settingIcon}>
                <Ionicons
                  name={item.icon}
                  size={19}
                  color={colors.primary}
                />
              </View>

              <View style={styles.settingMain}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.textMuted}
              />
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick controls</Text>

        <View style={styles.quickCard}>
          <View style={styles.quickRow}>
            <View style={styles.quickIcon}>
              <Ionicons name="sparkles-outline" size={19} color={colors.primary} />
            </View>

            <View style={styles.quickMain}>
              <Text style={styles.quickTitle}>Memory</Text>
              <Text style={styles.quickSubtitle}>
                Let Reliora remember useful details
              </Text>
            </View>

            <Switch
              value={privacy.memory}
              onValueChange={() => togglePrivacy('memory')}
              trackColor={{
                false: colors.surface2,
                true: 'rgba(155,123,255,0.45)',
              }}
              thumbColor={privacy.memory ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.quickBorder} />

          <View style={styles.quickRow}>
            <View style={styles.quickIcon}>
              <Ionicons name="lock-closed-outline" size={19} color={colors.success} />
            </View>

            <View style={styles.quickMain}>
              <Text style={styles.quickTitle}>Private mode</Text>
              <Text style={styles.quickSubtitle}>
                Reduce personalization and memory
              </Text>
            </View>

            <Switch
              value={privateMode}
              onValueChange={setPrivateMode}
              trackColor={{
                false: colors.surface2,
                true: 'rgba(88,214,163,0.40)',
              }}
              thumbColor={privateMode ? colors.success : colors.textMuted}
            />
          </View>
        </View>

        <View style={styles.premiumCard}>
          <LinearGradient
            colors={['#261B50', '#151126']}
            style={styles.premiumGradient}
          >
            <View style={styles.premiumIcon}>
              <Ionicons name="diamond" size={20} color="#FFFFFF" />
            </View>

            <View style={styles.premiumMain}>
              <Text style={styles.premiumLabel}>RELIORA PREMIUM</Text>
              <Text style={styles.premiumTitle}>
                Unlock the full companion experience.
              </Text>
              <Text style={styles.premiumSubtitle}>
                Advanced memory, voice, personalization and more.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          </LinearGradient>
        </View>

        <Text style={styles.version}>Reliora AI • Version 1.0.0</Text>
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
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 45,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 9,
    letterSpacing: 1.7,
    fontWeight: '700',
    textAlign: 'center',
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 3,
  },

  profileCard: {
    marginTop: 28,
    padding: 20,
    borderRadius: 23,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },

  avatarOuter: {
    position: 'relative',
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },

  onlineDot: {
    position: 'absolute',
    right: 1,
    bottom: 4,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: colors.success,
    borderWidth: 3,
    borderColor: colors.surface,
  },

  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '850',
    marginTop: 11,
  },

  handle: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 3,
  },

  profileStats: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  profileStat: {
    alignItems: 'center',
  },

  profileStatValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },

  profileStatLabel: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  profileDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 28,
    marginBottom: 13,
  },

  currentMode: {
    padding: 15,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.17)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  modeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  modeLabel: {
    color: colors.primary,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '800',
  },

  modeTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 3,
  },

  modeSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(88,214,163,0.10)',
  },

  activeText: {
    color: colors.success,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  modes: {
    paddingTop: 10,
    paddingBottom: 2,
    gap: 9,
  },

  modeCard: {
    width: 142,
    minHeight: 122,
    padding: 12,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  modeCardActive: {
    borderColor: 'rgba(155,123,255,0.42)',
    backgroundColor: 'rgba(155,123,255,0.08)',
  },

  modeCardIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modeCardIconActive: {
    backgroundColor: colors.primary,
  },

  modeCardTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '750',
    marginTop: 10,
  },

  modeCardTitleActive: {
    color: colors.text,
  },

  modeCardSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 4,
  },

  settingsCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  settingRow: {
    minHeight: 72,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  settingIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  settingMain: {
    flex: 1,
  },

  settingTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },

  settingSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  quickCard: {
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  quickRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },

  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  quickMain: {
    flex: 1,
  },

  quickTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },

  quickSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  quickBorder: {
    height: 1,
    backgroundColor: colors.border,
  },

  premiumCard: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },

  premiumGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.22)',
    borderRadius: 20,
  },

  premiumIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  premiumMain: {
    flex: 1,
  },

  premiumLabel: {
    color: colors.primary,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  premiumTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
    marginTop: 4,
  },

  premiumSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
  },

  version: {
    color: colors.textMuted,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 25,
  },
});
