import React, { useState } from 'react';
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
import { voiceOptions } from '../store/voiceStore';

export default function VoiceScreen({ onNavigate }) {
  const [selectedVoice, setSelectedVoice] = useState(
    voiceOptions[0]?.id || 'Warm'
  );
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const selected = voiceOptions.find(
    (voice) => voice.id === selectedVoice
  );

  const previewVoice = () => {
    Alert.alert(
      'Voice Preview',
      `${selected?.label || 'Reliora'} voice preview will play when the audio engine is connected.`
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
            <Text style={styles.title}>Voice</Text>
            <Text style={styles.subtitle}>
              Give Reliora a voice that feels right for you
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

        <View style={styles.voiceHero}>
          <View style={styles.voiceOrb}>
            <Ionicons
              name="mic"
              size={30}
              color={colors.primary}
            />
          </View>

          <Text style={styles.heroTitle}>
            Voice Companion
          </Text>

          <Text style={styles.heroText}>
            Choose how Reliora sounds when speaking with you.
          </Text>

          <Pressable
            style={styles.previewButton}
            onPress={previewVoice}
          >
            <Ionicons
              name="play"
              size={13}
              color="#FFFFFF"
            />

            <Text style={styles.previewText}>
              Preview Voice
            </Text>
          </Pressable>
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Ionicons
              name="volume-high-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.settingTitle}>
              Voice Responses
            </Text>

            <Text style={styles.settingDescription}>
              Allow Reliora to respond using voice.
            </Text>
          </View>

          <Pressable
            style={[
              styles.toggle,
              voiceEnabled && styles.toggleActive,
            ]}
            onPress={() => setVoiceEnabled(!voiceEnabled)}
          >
            <View
              style={[
                styles.toggleKnob,
                voiceEnabled && styles.toggleKnobActive,
              ]}
            />
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>
          Choose a Voice
        </Text>

        <View style={styles.voiceList}>
          {voiceOptions.map((voice) => {
            const active = selectedVoice === voice.id;

            return (
              <Pressable
                key={voice.id}
                style={[
                  styles.voiceCard,
                  active && styles.voiceCardActive,
                ]}
                onPress={() => setSelectedVoice(voice.id)}
              >
                <View style={styles.voiceIcon}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={
                      active
                        ? colors.primary
                        : colors.textMuted
                    }
                  />
                </View>

                <View style={styles.flex}>
                  <Text style={styles.voiceName}>
                    {voice.label}
                  </Text>

                  <Text style={styles.voiceDescription}>
                    {voice.description}
                  </Text>
                </View>

                <Ionicons
                  name={
                    active
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={20}
                  color={
                    active
                      ? colors.primary
                      : colors.textMuted
                  }
                />
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>
          Voice Preferences
        </Text>

        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Ionicons
              name="play-circle-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.settingTitle}>
              Auto Play
            </Text>

            <Text style={styles.settingDescription}>
              Automatically play voice responses.
            </Text>
          </View>

          <Pressable
            style={[
              styles.toggle,
              autoPlay && styles.toggleActive,
            ]}
            onPress={() => setAutoPlay(!autoPlay)}
          >
            <View
              style={[
                styles.toggleKnob,
                autoPlay && styles.toggleKnobActive,
              ]}
            />
          </Pressable>
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Ionicons
              name="speedometer-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.settingTitle}>
              Speaking Style
            </Text>

            <Text style={styles.settingDescription}>
              Natural, calm and conversational.
            </Text>
          </View>

          <View style={styles.valuePill}>
            <Text style={styles.valueText}>
              Natural
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="information-circle-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.infoTitle}>
              Voice engine
            </Text>

            <Text style={styles.infoText}>
              The voice interface is ready. The actual
              speech engine will be connected during the
              AI/backend integration phase.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Ionicons
            name="mic-outline"
            size={13}
            color={colors.textMuted}
          />

          <Text style={styles.footerText}>
            Voice preferences are stored locally for now.
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
    fontSize: 27,
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

  voiceHero: {
    marginTop: 19,
    padding: 22,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.18)',
    alignItems: 'center',
  },

  voiceOrb: {
    width: 68,
    height: 68,
    borderRadius: 34,
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
    marginTop: 6,
  },

  previewButton: {
    marginTop: 14,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  previewText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },

  settingRow: {
    minHeight: 68,
    marginTop: 9,
    padding: 12,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  settingIcon: {
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

  settingTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '800',
  },

  settingDescription: {
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

  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '850',
    marginTop: 23,
    marginBottom: 10,
  },

  voiceList: {
    gap: 8,
  },

  voiceCard: {
    minHeight: 65,
    padding: 11,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  voiceCardActive: {
    borderColor: 'rgba(155,123,255,0.4)',
    backgroundColor: 'rgba(155,123,255,0.05)',
  },

  voiceIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  voiceName: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '850',
  },

  voiceDescription: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 3,
  },

  valuePill: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: colors.surface2,
  },

  valueText: {
    color: colors.textSecondary,
    fontSize: 7,
    fontWeight: '700',
  },

  infoCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.13)',
    flexDirection: 'row',
    gap: 9,
  },

  infoIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '800',
  },

  infoText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 3,
  },

  footer: {
    marginTop: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  footerText: {
    color: colors.textMuted,
    fontSize: 6,
  },
});
