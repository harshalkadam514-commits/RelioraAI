import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const prompts = [
  'What made you smile today?',
  'What is on your mind right now?',
  'What are you grateful for?',
  'What do you want to improve tomorrow?',
];

export default function JournalScreen({ onNavigate }) {
  const [entry, setEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('🙂');

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
          <Pressable style={styles.iconButton} onPress={() => onNavigate?.('home')}>
            <Ionicons name="chevron-back" size={23} color="#FFFFFF" />
          </Pressable>

          <View>
            <Text style={styles.eyebrow}>PRIVATE SPACE</Text>
            <Text style={styles.title}>Journal</Text>
          </View>

          <Pressable style={styles.iconButton}>
            <Ionicons name="calendar-outline" size={21} color="#A7A9B4" />
          </Pressable>
        </View>

        <View style={styles.dateCard}>
          <View>
            <Text style={styles.dateLabel}>TODAY</Text>
            <Text style={styles.date}>Sunday, August 16</Text>
          </View>

          <View style={styles.lock}>
            <Ionicons name="lock-closed-outline" size={17} color={colors.success} />
          </View>
        </View>

        <Text style={styles.section}>How are you feeling?</Text>

        <View style={styles.moodCard}>
          {['😞', '😐', '🙂', '😄', '🤩'].map((mood) => (
            <Pressable
              key={mood}
              onPress={() => setSelectedMood(mood)}
              style={[
                styles.mood,
                selectedMood === mood && styles.moodSelected,
              ]}
            >
              <Text style={styles.moodEmoji}>{mood}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.section}>Write freely</Text>

        <View style={styles.editor}>
          <TextInput
            value={entry}
            onChangeText={setEntry}
            placeholder="Write whatever is on your mind..."
            placeholderTextColor={colors.textMuted}
            multiline
            textAlignVertical="top"
            style={styles.textInput}
          />

          <View style={styles.editorFooter}>
            <Text style={styles.privateText}>
              <Ionicons name="lock-closed-outline" size={12} /> Private
            </Text>

            <Text style={styles.count}>{entry.length}/5000</Text>
          </View>
        </View>

        <Text style={styles.section}>Reflection prompts</Text>

        {prompts.map((prompt, index) => (
          <Pressable
            key={prompt}
            style={styles.prompt}
            onPress={() => setEntry((prev) => `${prev}${prev ? '\n\n' : ''}${prompt}\n`)}
          >
            <View style={styles.promptNumber}>
              <Text style={styles.promptNumberText}>0{index + 1}</Text>
            </View>

            <Text style={styles.promptText}>{prompt}</Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.textMuted}
            />
          </Pressable>
        ))}

        <Pressable style={styles.saveButton}>
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            style={styles.saveGradient}
          >
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            <Text style={styles.saveText}>Save Journal Entry</Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.aiCard}>
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>AI Reflection</Text>
            <Text style={styles.aiSubtitle}>
              Reliora can help you discover patterns in your journal.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={19} color={colors.textMuted} />
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
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 40,
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
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 9,
    letterSpacing: 1.7,
    fontWeight: '700',
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 3,
  },

  dateCard: {
    marginTop: 28,
    padding: 17,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateLabel: {
    color: colors.primary,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: '800',
  },

  date: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5,
  },

  lock: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(88,214,163,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 28,
    marginBottom: 13,
  },

  moodCard: {
    padding: 15,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mood: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  moodSelected: {
    backgroundColor: 'rgba(155,123,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.35)',
  },

  moodEmoji: {
    fontSize: 26,
  },

  editor: {
    minHeight: 230,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },

  textInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    minHeight: 180,
  },

  editorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  privateText: {
    color: colors.success,
    fontSize: 10,
  },

  count: {
    color: colors.textMuted,
    fontSize: 10,
  },

  prompt: {
    minHeight: 64,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  promptNumber: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  promptNumberText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },

  promptText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  saveButton: {
    height: 56,
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 15,
  },

  saveGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  aiCard: {
    marginTop: 20,
    padding: 15,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  aiTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '750',
  },

  aiSubtitle: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
  },
});
