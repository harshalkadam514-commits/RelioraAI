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
import { usePrivacy } from '../store/privacyStore';

export default function PrivacyScreen({ onNavigate }) {
  const {
    privacy,
    togglePrivacy,
    enablePrivacy,
  } = usePrivacy();

  const confirmReset = () => {
    Alert.alert(
      'Reset Privacy Settings',
      'Restore the default privacy configuration?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: enablePrivacy,
        },
      ]
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
            <Text style={styles.eyebrow}>
              RELIORA AI
            </Text>

            <Text style={styles.title}>
              Privacy & Security
            </Text>

            <Text style={styles.subtitle}>
              You control what Reliora remembers and uses
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

        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Ionicons
              name="shield-checkmark"
              size={27}
              color={colors.success}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.securityTitle}>
              Your privacy is in your hands
            </Text>

            <Text style={styles.securityText}>
              Manage memory, personalization, analytics,
              voice data and AI improvement preferences.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Data & Personalization
        </Text>

        <PrivacyRow
          icon="sparkles-outline"
          title="Personalization"
          description="Use your preferences to personalize Reliora."
          value={privacy.personalization}
          onPress={() => togglePrivacy('personalization')}
        />

        <PrivacyRow
          icon="albums-outline"
          title="Memory"
          description="Allow Reliora to remember useful conversation details."
          value={privacy.memory}
          onPress={() => togglePrivacy('memory')}
        />

        <PrivacyRow
          icon="analytics-outline"
          title="Analytics"
          description="Use anonymous usage patterns to improve the experience."
          value={privacy.analytics}
          onPress={() => togglePrivacy('analytics')}
        />

        <PrivacyRow
          icon="notifications-outline"
          title="Notifications"
          description="Allow Reliora to send reminders and check-ins."
          value={privacy.notifications}
          onPress={() => togglePrivacy('notifications')}
        />

        <PrivacyRow
          icon="mic-outline"
          title="Voice Data"
          description="Allow voice-related data to be stored for personalization."
          value={privacy.voiceData}
          onPress={() => togglePrivacy('voiceData')}
        />

        <PrivacyRow
          icon="hardware-chip-outline"
          title="AI Improvement"
          description="Allow anonymized data to help improve AI responses."
          value={privacy.aiImprovement}
          onPress={() => togglePrivacy('aiImprovement')}
        />

        <Text style={styles.sectionTitle}>
          Security
        </Text>

        <View style={styles.securityRow}>
          <View style={styles.rowIcon}>
            <Ionicons
              name="lock-closed-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.rowTitle}>
              App Security
            </Text>

            <Text style={styles.rowDescription}>
              Your privacy settings are protected on this device.
            </Text>
          </View>

          <View style={styles.secureBadge}>
            <Ionicons
              name="checkmark-circle"
              size={13}
              color={colors.success}
            />

            <Text style={styles.secureText}>
              Protected
            </Text>
          </View>
        </View>

        <View style={styles.securityRow}>
          <View style={styles.rowIcon}>
            <Ionicons
              name="key-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.rowTitle}>
              Data Control
            </Text>

            <Text style={styles.rowDescription}>
              Review and manage the information Reliora uses.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Privacy Actions
        </Text>

        <Pressable
          style={styles.actionButton}
          onPress={confirmReset}
        >
          <Ionicons
            name="refresh-outline"
            size={18}
            color={colors.primary}
          />

          <Text style={styles.actionText}>
            Reset Privacy Settings
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() =>
            Alert.alert(
              'Data Export',
              'Data export will be connected to the secure storage system.'
            )
          }
        >
          <Ionicons
            name="download-outline"
            size={18}
            color={colors.primary}
          />

          <Text style={styles.actionText}>
            Request My Data
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={14}
            color={colors.textMuted}
          />

          <Text style={styles.footerText}>
            Reliora privacy controls are designed to keep
            you in control of your personal experience.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function PrivacyRow({
  icon,
  title,
  description,
  value,
  onPress,
}) {
  return (
    <View style={styles.privacyRow}>
      <View style={styles.rowIcon}>
        <Ionicons
          name={icon}
          size={19}
          color={colors.primary}
        />
      </View>

      <View style={styles.flex}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowDescription}>
          {description}
        </Text>
      </View>

      <Pressable
        style={[
          styles.toggle,
          value && styles.toggleActive,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.toggleKnob,
            value && styles.toggleKnobActive,
          ]}
        />
      </Pressable>
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
    fontSize: 25,
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

  securityCard: {
    marginTop: 19,
    padding: 16,
    borderRadius: 21,
    backgroundColor: 'rgba(88,214,163,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(88,214,163,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: 'rgba(88,214,163,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  securityTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '850',
  },

  securityText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 4,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '850',
    marginTop: 23,
    marginBottom: 10,
  },

  privacyRow: {
    minHeight: 70,
    marginBottom: 7,
    padding: 12,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  securityRow: {
    minHeight: 66,
    marginBottom: 7,
    padding: 12,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  rowIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
  },

  rowTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '800',
  },

  rowDescription: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 10,
    marginTop: 3,
  },

  toggle: {
    width: 42,
    height: 24,
    borderRadius: 13,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 2,
    justifyContent: 'center',
  },

  toggleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  toggleKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.textMuted,
  },

  toggleKnobActive: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
  },

  secureBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: 'rgba(88,214,163,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  secureText: {
    color: colors.success,
    fontSize: 6,
    fontWeight: '800',
  },

  actionButton: {
    height: 48,
    marginBottom: 8,
    paddingHorizontal: 14,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  actionText: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: '750',
  },

  footer: {
    marginTop: 18,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 6,
  },

  footerText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 6,
    lineHeight: 10,
    textAlign: 'center',
  },
});
