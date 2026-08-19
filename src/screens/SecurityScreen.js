import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useSecurity } from '../store/securityStore';

export default function SecurityScreen({
  onNavigate,
}) {
  const {
    security,
    toggleSecurity,
    enableAppLock,
    disableAppLock,
    enableBiometric,
    disableBiometric,
    resetSecurity,
  } = useSecurity();

  const handleAppLock = () => {
    if (security.appLock) {
      disableAppLock();
    } else {
      enableAppLock();
    }
  };

  const handleBiometric = () => {
    if (security.biometric) {
      disableBiometric();
    } else {
      enableBiometric();
    }
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
              Security
            </Text>

            <Text style={styles.subtitle}>
              Protect your account and private data
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

        <View style={styles.securityHero}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={30}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.heroTitle}>
              Security Center
            </Text>

            <Text style={styles.heroText}>
              Manage how Reliora protects access to
              your private information.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Device Protection
        </Text>

        <SecurityToggle
          icon="lock-closed-outline"
          title="App Lock"
          description="Require authentication when opening Reliora."
          value={security.appLock}
          onPress={handleAppLock}
        />

        <SecurityToggle
          icon="finger-print-outline"
          title="Biometric Unlock"
          description="Use your device biometric authentication for faster access."
          value={security.biometric}
          onPress={handleBiometric}
        />

        <Text style={styles.sectionTitle}>
          Data Protection
        </Text>

        <SecurityToggle
          icon="eye-off-outline"
          title="Sensitive Data Protection"
          description="Apply additional protection to sensitive personal information."
          value={security.sensitiveDataProtection}
          onPress={() =>
            toggleSecurity('sensitiveDataProtection')
          }
        />

        <SecurityToggle
          icon="key-outline"
          title="Re-authentication for Export"
          description="Require account verification before exporting private data."
          value={security.requireReauthForExport}
          onPress={() =>
            toggleSecurity('requireReauthForExport')
          }
        />

        <Text style={styles.sectionTitle}>
          Account Sessions
        </Text>

        <View style={styles.sessionCard}>
          <View style={styles.sessionIcon}>
            <Ionicons
              name="phone-portrait-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.sessionTitle}>
              This Device
            </Text>

            <Text style={styles.sessionText}>
              Current active session
            </Text>

            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />

              <Text style={styles.activeText}>
                ACTIVE
              </Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.signOutButton}>
          <Ionicons
            name="log-out-outline"
            size={17}
            color={colors.textMuted}
          />

          <Text style={styles.signOutText}>
            Sign Out Other Devices
          </Text>
        </Pressable>

        <View style={styles.warningCard}>
          <Ionicons
            name="information-circle-outline"
            size={19}
            color={colors.primary}
          />

          <Text style={styles.warningText}>
            Security settings shown here are local
            controls for now. Actual biometric
            verification, account sessions and
            re-authentication will be connected to
            the backend security layer.
          </Text>
        </View>

        <Pressable
          style={styles.resetButton}
          onPress={resetSecurity}
        >
          <Ionicons
            name="refresh-outline"
            size={17}
            color={colors.primary}
          />

          <Text style={styles.resetText}>
            Reset Security Settings
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SecurityToggle({
  icon,
  title,
  description,
  value,
  onPress,
}) {
  return (
    <View style={styles.toggleRow}>
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

  securityHero: {
    marginTop: 19,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(155,123,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
  },

  heroTitle: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
  },

  heroText: {
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
    marginBottom: 9,
  },

  toggleRow: {
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

  rowIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
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

  sessionCard: {
    minHeight: 72,
    padding: 12,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  sessionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sessionTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '850',
  },

  sessionText: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 3,
  },

  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },

  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.success,
  },

  activeText: {
    color: colors.success,
    fontSize: 5,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  signOutButton: {
    height: 45,
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  signOutText: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '800',
  },

  warningCard: {
    marginTop: 15,
    padding: 13,
    borderRadius: 17,
    backgroundColor: 'rgba(155,123,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.11)',
    flexDirection: 'row',
    gap: 8,
  },

  warningText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
  },

  resetButton: {
    height: 46,
    marginTop: 9,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  resetText: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: '800',
  },
});
