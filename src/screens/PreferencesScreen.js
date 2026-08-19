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
import { usePreferences } from '../store/preferencesStore';

const themeOptions = [
  'Dark',
  'Light',
  'System',
];

const languageOptions = [
  'English',
  'Marathi',
  'Hindi',
];

export default function PreferencesScreen({
  onNavigate,
}) {
  const {
    preferences,
    updatePreference,
    togglePreference,
    resetPreferences,
  } = usePreferences();

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
              Preferences
            </Text>

            <Text style={styles.subtitle}>
              Adjust your app experience
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

        <Text style={styles.sectionTitle}>
          Appearance
        </Text>

        <Text style={styles.label}>
          Theme
        </Text>

        <OptionGroup
          items={themeOptions}
          value={preferences.theme}
          onChange={(value) =>
            updatePreference('theme', value)
          }
        />

        <Text style={styles.sectionTitle}>
          Language
        </Text>

        <OptionGroup
          items={languageOptions}
          value={preferences.language}
          onChange={(value) =>
            updatePreference('language', value)
          }
        />

        <Text style={styles.sectionTitle}>
          Experience
        </Text>

        <PreferenceToggle
          icon="phone-portrait-outline"
          title="Haptic Feedback"
          description="Use subtle vibration feedback for interactions."
          value={preferences.haptics}
          onPress={() =>
            togglePreference('haptics')
          }
        />

        <PreferenceToggle
          icon="sparkles-outline"
          title="Animations"
          description="Enable smooth interface animations."
          value={preferences.animations}
          onPress={() =>
            togglePreference('animations')
          }
        />

        <PreferenceToggle
          icon="volume-high-outline"
          title="Interface Sounds"
          description="Play subtle sounds during interactions."
          value={preferences.sounds}
          onPress={() =>
            togglePreference('sounds')
          }
        />

        <PreferenceToggle
          icon="resize-outline"
          title="Compact Mode"
          description="Use a denser layout to show more content."
          value={preferences.compactMode}
          onPress={() =>
            togglePreference('compactMode')
          }
        />

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={colors.success}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.statusTitle}>
              Preferences Saved Locally
            </Text>

            <Text style={styles.statusText}>
              These settings are currently stored in the
              app state and will be connected to persistent
              storage during the final data layer phase.
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.resetButton}
          onPress={resetPreferences}
        >
          <Ionicons
            name="refresh-outline"
            size={17}
            color={colors.primary}
          />

          <Text style={styles.resetText}>
            Reset Preferences
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function OptionGroup({
  items,
  value,
  onChange,
}) {
  return (
    <View style={styles.optionGroup}>
      {items.map((item) => {
        const active = value === item;

        return (
          <Pressable
            key={item}
            style={[
              styles.option,
              active && styles.optionActive,
            ]}
            onPress={() => onChange(item)}
          >
            <Text
              style={[
                styles.optionText,
                active && styles.optionTextActive,
              ]}
            >
              {item}
            </Text>

            {active && (
              <Ionicons
                name="checkmark-circle"
                size={15}
                color={colors.primary}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

function PreferenceToggle({
  icon,
  title,
  description,
  value,
  onPress,
}) {
  return (
    <View style={styles.preferenceRow}>
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

  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '850',
    marginTop: 23,
    marginBottom: 9,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: '750',
    marginTop: 4,
    marginBottom: 7,
  },

  optionGroup: {
    gap: 7,
  },

  option: {
    minHeight: 43,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionActive: {
    backgroundColor: 'rgba(155,123,255,0.06)',
    borderColor: 'rgba(155,123,255,0.35)',
  },

  optionText: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '700',
  },

  optionTextActive: {
    color: colors.text,
    fontWeight: '850',
  },

  preferenceRow: {
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

  statusCard: {
    marginTop: 15,
    padding: 14,
    borderRadius: 19,
    backgroundColor: 'rgba(88,214,163,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(88,214,163,0.12)',
    flexDirection: 'row',
    gap: 9,
  },

  statusIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(88,214,163,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '850',
  },

  statusText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 3,
  },

  resetButton: {
    height: 46,
    marginTop: 10,
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
