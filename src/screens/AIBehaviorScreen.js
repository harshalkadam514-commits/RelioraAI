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
import { useAIBehavior } from '../store/aiBehaviorStore';

const options = {
  empathy: ['Low', 'Medium', 'High'],
  proactivity: ['Low', 'Balanced', 'High'],
  responseLength: ['Concise', 'Balanced', 'Detailed'],
  adviceMode: ['Ask First', 'Balanced', 'Direct'],
};

export default function AIBehaviorScreen({
  onNavigate,
}) {
  const {
    settings,
    updateSetting,
    toggleSetting,
    resetAIBehavior,
  } = useAIBehavior();

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
              AI Behavior
            </Text>

            <Text style={styles.subtitle}>
              Control how Reliora thinks, responds and supports you
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
              name="hardware-chip-outline"
              size={28}
              color={colors.primary}
            />
          </View>

          <Text style={styles.heroTitle}>
            Your AI, Your Rules
          </Text>

          <Text style={styles.heroText}>
            Customize Reliora's conversation behavior
            without changing your personality settings.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Emotional Intelligence
        </Text>

        <Text style={styles.label}>
          Empathy
        </Text>

        <OptionGroup
          items={options.empathy}
          value={settings.empathy}
          onChange={(value) =>
            updateSetting('empathy', value)
          }
        />

        <Text style={styles.label}>
          Proactivity
        </Text>

        <OptionGroup
          items={options.proactivity}
          value={settings.proactivity}
          onChange={(value) =>
            updateSetting('proactivity', value)
          }
        />

        <Text style={styles.sectionTitle}>
          Response Behavior
        </Text>

        <Text style={styles.label}>
          Response Length
        </Text>

        <OptionGroup
          items={options.responseLength}
          value={settings.responseLength}
          onChange={(value) =>
            updateSetting('responseLength', value)
          }
        />

        <Text style={styles.label}>
          Advice Mode
        </Text>

        <OptionGroup
          items={options.adviceMode}
          value={settings.adviceMode}
          onChange={(value) =>
            updateSetting('adviceMode', value)
          }
        />

        <Text style={styles.sectionTitle}>
          Intelligence Controls
        </Text>

        <BehaviorToggle
          icon="layers-outline"
          title="Context Awareness"
          description="Use relevant conversation context when responding."
          value={settings.contextAwareness}
          onPress={() => toggleSetting('contextAwareness')}
        />

        <BehaviorToggle
          icon="chatbubbles-outline"
          title="Smart Follow-ups"
          description="Allow Reliora to ask meaningful follow-up questions."
          value={settings.followUps}
          onPress={() => toggleSetting('followUps')}
        />

        <BehaviorToggle
          icon="heart-outline"
          title="Emotional Support"
          description="Prioritize supportive responses during emotional conversations."
          value={settings.emotionalSupport}
          onPress={() => toggleSetting('emotionalSupport')}
        />

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="sparkles-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.summaryTitle}>
              Current AI Profile
            </Text>

            <Text style={styles.summaryText}>
              {settings.empathy} empathy •{' '}
              {settings.proactivity} proactivity •{' '}
              {settings.responseLength} responses
            </Text>

            <Text style={styles.summaryText}>
              Advice: {settings.adviceMode} • Context:{' '}
              {settings.contextAwareness ? 'On' : 'Off'}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.resetButton}
          onPress={resetAIBehavior}
        >
          <Ionicons
            name="refresh-outline"
            size={17}
            color={colors.primary}
          />

          <Text style={styles.resetText}>
            Reset AI Behavior
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

function BehaviorToggle({
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

  hero: {
    marginTop: 19,
    padding: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(155,123,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.15)',
    alignItems: 'center',
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: 'rgba(155,123,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 9,
  },

  heroText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    textAlign: 'center',
    marginTop: 4,
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
    marginTop: 10,
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

  toggleRow: {
    minHeight: 68,
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

  summaryCard: {
    marginTop: 15,
    padding: 14,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.12)',
    flexDirection: 'row',
    gap: 9,
  },

  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '850',
  },

  summaryText: {
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
