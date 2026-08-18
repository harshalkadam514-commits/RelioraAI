import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const relationships = [
  { id: 'mother', label: 'Mother', icon: 'flower-outline' },
  { id: 'father', label: 'Father', icon: 'shield-outline' },
  { id: 'brother', label: 'Brother', icon: 'body-outline' },
  { id: 'sister', label: 'Sister', icon: 'sparkles-outline' },
  { id: 'grandfather', label: 'Grandfather', icon: 'glasses-outline' },
  { id: 'grandmother', label: 'Grandmother', icon: 'heart-circle-outline' },
  { id: 'uncle', label: 'Uncle', icon: 'happy-outline' },
  { id: 'aunty', label: 'Aunty', icon: 'flower-outline' },
  { id: 'best_friend', label: 'Best Friend', icon: 'people-outline' },
  { id: 'mentor', label: 'Mentor', icon: 'school-outline' },
];

const personalities = [
  { id: 'warm', label: 'Warm & Caring', icon: 'heart-outline' },
  { id: 'playful', label: 'Playful & Fun', icon: 'happy-outline' },
  { id: 'calm', label: 'Calm & Thoughtful', icon: 'leaf-outline' },
  { id: 'direct', label: 'Direct & Honest', icon: 'flash-outline' },
  { id: 'motivating', label: 'Motivating', icon: 'trending-up-outline' },
];

const STEPS = ['welcome', 'relationship', 'companion', 'personality', 'profile', 'intro'];

export default function OnboardingScreen({ onNavigate }) {
  const [step, setStep] = useState(0);
  const [relationship, setRelationship] = useState(null);
  const [companionName, setCompanionName] = useState('');
  const [personality, setPersonality] = useState(null);
  const [userName, setUserName] = useState('');

  const stepId = STEPS[step];

  const canContinue = () => {
    if (stepId === 'relationship') return !!relationship;
    if (stepId === 'companion') return companionName.trim().length > 0;
    if (stepId === 'personality') return !!personality;
    if (stepId === 'profile') return userName.trim().length > 0;
    return true;
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onNavigate?.('home');
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const skip = () => {
    onNavigate?.('home');
  };

  const selectedRelationshipLabel =
    relationships.find((r) => r.id === relationship)?.label || '';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topBar}>
        <View style={styles.progressRow}>
          {STEPS.map((s, i) => (
            <View
              key={s}
              style={[
                styles.progressDot,
                i <= step && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        {stepId !== 'welcome' && stepId !== 'intro' && (
          <Pressable onPress={skip} hitSlop={10}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {stepId === 'welcome' && (
          <View style={styles.centerBlock}>
            <View style={styles.logoCircle}>
              <Ionicons name="sparkles" size={34} color={colors.primary} />
            </View>
            <Text style={styles.eyebrow}>RELIORA AI</Text>
            <Text style={styles.bigTitle}>Welcome to Reliora</Text>
            <Text style={styles.bigText}>
              A companion that remembers you, understands you, and grows
              with every conversation.
            </Text>
          </View>
        )}

        {stepId === 'relationship' && (
          <View>
            <Text style={styles.stepTitle}>Choose your relationship</Text>
            <Text style={styles.stepSubtitle}>
              How should your companion relate to you?
            </Text>

            <View style={styles.grid}>
              {relationships.map((r) => (
                <Pressable
                  key={r.id}
                  onPress={() => setRelationship(r.id)}
                  style={[
                    styles.gridItem,
                    relationship === r.id && styles.gridItemActive,
                  ]}
                >
                  <Ionicons
                    name={r.icon}
                    size={22}
                    color={
                      relationship === r.id ? '#FFFFFF' : colors.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.gridLabel,
                      relationship === r.id && styles.gridLabelActive,
                    ]}
                  >
                    {r.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {stepId === 'companion' && (
          <View>
            <Text style={styles.stepTitle}>Name your companion</Text>
            <Text style={styles.stepSubtitle}>
              What would you like to call your {selectedRelationshipLabel || 'companion'}?
            </Text>

            <TextInput
              value={companionName}
              onChangeText={setCompanionName}
              placeholder="Enter a name"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
            />
          </View>
        )}

        {stepId === 'personality' && (
          <View>
            <Text style={styles.stepTitle}>Choose a personality</Text>
            <Text style={styles.stepSubtitle}>
              How should {companionName || 'they'} feel in conversation?
            </Text>

            <View style={styles.listCol}>
              {personalities.map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => setPersonality(p.id)}
                  style={[
                    styles.listItem,
                    personality === p.id && styles.listItemActive,
                  ]}
                >
                  <View style={styles.listIconBox}>
                    <Ionicons
                      name={p.icon}
                      size={19}
                      color={
                        personality === p.id ? '#FFFFFF' : colors.primary
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.listLabel,
                      personality === p.id && styles.listLabelActive,
                    ]}
                  >
                    {p.label}
                  </Text>
                  {personality === p.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {stepId === 'profile' && (
          <View>
            <Text style={styles.stepTitle}>What should we call you?</Text>
            <Text style={styles.stepSubtitle}>
              This helps {companionName || 'your companion'} speak to you
              personally.
            </Text>

            <TextInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Your name"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
            />
          </View>
        )}

        {stepId === 'intro' && (
          <View style={styles.centerBlock}>
            <View style={styles.logoCircle}>
              <Ionicons name="heart" size={30} color={colors.accent} />
            </View>
            <Text style={styles.eyebrow}>READY</Text>
            <Text style={styles.bigTitle}>
              Meet {companionName || 'your companion'}
            </Text>
            <Text style={styles.bigText}>
              {userName ? `Hi ${userName}, ` : ''}
              {companionName || 'Your companion'} is here as your{' '}
              {selectedRelationshipLabel.toLowerCase() || 'companion'}, ready
              to listen and remember what matters to you.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        {step > 0 && stepId !== 'intro' && (
          <Pressable style={styles.backBtn} onPress={back}>
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </Pressable>
        )}

        <Pressable
          style={[
            styles.continueBtn,
            !canContinue() && styles.continueBtnDisabled,
          ]}
          onPress={next}
          disabled={!canContinue()}
        >
          <Text style={styles.continueText}>
            {stepId === 'intro'
              ? 'Start Talking'
              : stepId === 'welcome'
              ? 'Get Started'
              : 'Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 52,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  progressRow: {
    flexDirection: 'row',
    gap: 6,
  },

  progressDot: {
    width: 22,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface2,
  },

  progressDotActive: {
    backgroundColor: colors.primary,
  },

  skipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  centerBlock: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 40,
  },

  logoCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '800',
    marginBottom: 8,
  },

  bigTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },

  bigText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 10,
  },

  stepTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },

  stepSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 24,
    lineHeight: 19,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  gridItem: {
    width: '47%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 8,
  },

  gridItemActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },

  gridLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },

  gridLabelActive: {
    color: '#FFFFFF',
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 15,
  },

  listCol: {
    gap: 10,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  listItemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surface2,
  },

  listIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listLabel: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },

  listLabelActive: {
    color: colors.text,
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 12,
  },

  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
  },

  continueBtnDisabled: {
    opacity: 0.4,
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
