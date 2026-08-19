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
import { usePersonalization } from '../store/personalizationStore';

const options = {
  relationship: [
    'Mother',
    'Father',
    'Brother',
    'Sister',
    'Grandfather',
    'Grandmother',
    'Uncle',
    'Aunty',
    'Best Friend',
    'Mentor',
  ],

  responseStyle: [
    'Balanced',
    'Casual',
    'Thoughtful',
    'Direct',
  ],

  humor: [
    'Low',
    'Moderate',
    'High',
  ],

  emotionalDepth: [
    'Low',
    'Medium',
    'High',
  ],

  language: [
    'English',
    'Marathi',
    'Hindi',
  ],
};

export default function PersonalizationScreen({
  onNavigate,
}) {
  const {
    settings,
    updateSetting,
    resetPersonalization,
  } = usePersonalization();

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
              Personalization
            </Text>

            <Text style={styles.subtitle}>
              Shape Reliora around the way you want to interact
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

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons
              name="sparkles"
              size={25}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.profileTitle}>
              Your Reliora
            </Text>

            <Text style={styles.profileText}>
              {settings.companionName} •{' '}
              {settings.relationship}
            </Text>
          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>
              PERSONALIZED
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Relationship
        </Text>

        <OptionGroup
          options={options.relationship}
          value={settings.relationship}
          onChange={(value) =>
            updateSetting('relationship', value)
          }
        />

        <Text style={styles.sectionTitle}>
          Conversation Style
        </Text>

        <Text style={styles.label}>
          Response Style
        </Text>

        <OptionGroup
          options={options.responseStyle}
          value={settings.responseStyle}
          onChange={(value) =>
            updateSetting('responseStyle', value)
          }
        />

        <Text style={styles.label}>
          Humor
        </Text>

        <OptionGroup
          options={options.humor}
          value={settings.humor}
          onChange={(value) =>
            updateSetting('humor', value)
          }
        />

        <Text style={styles.label}>
          Emotional Depth
        </Text>

        <OptionGroup
          options={options.emotionalDepth}
          value={settings.emotionalDepth}
          onChange={(value) =>
            updateSetting('emotionalDepth', value)
          }
        />

        <Text style={styles.sectionTitle}>
          Language
        </Text>

        <OptionGroup
          options={options.language}
          value={settings.language}
          onChange={(value) =>
            updateSetting('language', value)
          }
        />

        <View style={styles.previewCard}>
          <View style={styles.previewIcon}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.previewTitle}>
              Conversation Preview
            </Text>

            <Text style={styles.previewText}>
              Reliora will use a {settings.responseStyle.toLowerCase()}
              style with {settings.emotionalDepth.toLowerCase()}
              emotional depth and {settings.humor.toLowerCase()}
              humor.
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.resetButton}
          onPress={resetPersonalization}
        >
          <Ionicons
            name="refresh-outline"
            size={17}
            color={colors.primary}
          />

          <Text style={styles.resetText}>
            Reset Personalization
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function OptionGroup({
  options: items,
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
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '800',
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 3,
  },

  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 6,
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

  profileCard: {
    marginTop: 19,
    padding: 15,
    borderRadius: 21,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: 'rgba(155,123,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
  },

  profileTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },

  profileText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },

  activeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(88,214,163,0.08)',
  },

  activeText: {
    color: colors.success,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.4,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 23,
    marginBottom: 10,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
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
    fontSize: 14,
    fontWeight: '700',
  },

  optionTextActive: {
    color: colors.text,
    fontWeight: '850',
  },

  previewCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.12)',
    flexDirection: 'row',
    gap: 9,
  },

  previewIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },

  previewText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
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
    fontSize: 14,
    fontWeight: '800',
  },
});
