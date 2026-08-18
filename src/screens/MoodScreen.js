import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { emotions, useMoodStore } from '../store/moodStore';

export default function MoodScreen({ onNavigate }) {
  const { entries, average, addMood, deleteMood, clearMoodHistory } =
    useMoodStore();

  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  const submitMood = () => {
    if (!selected) {
      Alert.alert('Choose your mood', 'Select an emotion first.');
      return;
    }

    addMood({
      mood: selected.value,
      emotion: selected.label,
      note: note.trim() || 'No note added.',
    });

    setSelected(null);
    setNote('');

    Alert.alert(
      'Mood saved',
      'Your check-in has been added to your mood history.'
    );
  };

  const clearHistory = () => {
    Alert.alert(
      'Clear mood history?',
      'All locally stored mood entries will be removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearMoodHistory,
        },
      ]
    );
  };

  const moodLabel =
    average >= 4.5
      ? 'Great'
      : average >= 3.5
        ? 'Good'
        : average >= 2.5
          ? 'Okay'
          : average > 0
            ? 'Needs attention'
            : 'No data';

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.iconButton}
            onPress={() => onNavigate?.('settings')}
          >
            <Ionicons name="chevron-back" size={23} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.eyebrow}>RELIORA INSIGHTS</Text>
            <Text style={styles.title}>Mood & Emotion</Text>
          </View>

          <View style={styles.iconButton}>
            <Ionicons name="heart-outline" size={21} color={colors.accent} />
          </View>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.score}>{average || '—'}</Text>
            <Text style={styles.scoreOf}>/ 5</Text>
          </View>

          <View style={styles.scoreMain}>
            <Text style={styles.scoreLabel}>AVERAGE MOOD</Text>
            <Text style={styles.scoreTitle}>{moodLabel}</Text>
            <Text style={styles.scoreText}>
              Based on your saved mood check-ins.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <Text style={styles.sectionSubtitle}>
          A quick check-in helps you understand your emotional patterns.
        </Text>

        <View style={styles.emotionGrid}>
          {emotions.map((emotion) => {
            const active = selected?.id === emotion.id;

            return (
              <Pressable
                key={emotion.id}
                onPress={() => setSelected(emotion)}
                style={[
                  styles.emotionCard,
                  active && styles.emotionActive,
                ]}
              >
                <Text style={styles.emoji}>{emotion.icon}</Text>
                <Text
                  style={[
                    styles.emotionLabel,
                    active && styles.emotionLabelActive,
                  ]}
                >
                  {emotion.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Want to say a little more? (optional)"
          placeholderTextColor={colors.textMuted}
          multiline
          style={styles.noteInput}
        />

        <Pressable style={styles.saveButton} onPress={submitMood}>
          <Ionicons name="checkmark-circle-outline" size={19} color="#FFFFFF" />
          <Text style={styles.saveText}>Save today's mood</Text>
        </Pressable>

        <View style={styles.historyHeader}>
          <View>
            <Text style={styles.sectionTitle}>Mood history</Text>
            <Text style={styles.historyCount}>
              {entries.length} check-ins
            </Text>
          </View>

          {entries.length > 0 && (
            <Pressable onPress={clearHistory}>
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>
          )}
        </View>

        {entries.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons
              name="analytics-outline"
              size={38}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No mood history</Text>
            <Text style={styles.emptyText}>
              Your check-ins will appear here.
            </Text>
          </View>
        ) : (
          entries.map((entry) => (
            <View key={entry.id} style={styles.historyCard}>
              <View style={styles.historyEmoji}>
                <Text style={styles.historyEmojiText}>
                  {emotions.find(
                    (emotion) =>
                      emotion.label.toLowerCase() ===
                      String(entry.emotion).toLowerCase()
                  )?.icon || '🙂'}
                </Text>
              </View>

              <View style={styles.historyMain}>
                <Text style={styles.historyMood}>{entry.emotion}</Text>
                <Text style={styles.historyNote}>{entry.note}</Text>
                <Text style={styles.historyDate}>{entry.date}</Text>
              </View>

              <View style={styles.historyRight}>
                <Text style={styles.historyScore}>{entry.mood}/5</Text>

                <Pressable
                  onPress={() => deleteMood(entry.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons
                    name="trash-outline"
                    size={15}
                    color={colors.danger}
                  />
                </Pressable>
              </View>
            </View>
          ))
        )}

        <View style={styles.reflectionCard}>
          <View style={styles.reflectionIcon}>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          </View>

          <View style={styles.reflectionMain}>
            <Text style={styles.reflectionLabel}>AI REFLECTION</Text>
            <Text style={styles.reflectionTitle}>
              Your mood data can become more useful over time.
            </Text>
            <Text style={styles.reflectionText}>
              Reliora can eventually connect mood patterns with journal
              entries, habits, goals and conversations.
            </Text>
          </View>
        </View>

        <View style={styles.privacy}>
          <Ionicons
            name="lock-closed-outline"
            size={16}
            color={colors.success}
          />
          <Text style={styles.privacyText}>
            Mood entries are treated as private personal data.
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
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 45,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 8,
    letterSpacing: 1.5,
    fontWeight: '800',
  },

  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 3,
  },

  iconButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreCard: {
    marginTop: 24,
    padding: 17,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  scoreCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(155,123,255,0.12)',
    borderWidth: 2,
    borderColor: 'rgba(155,123,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  score: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
  },

  scoreOf: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: -2,
  },

  scoreMain: {
    flex: 1,
  },

  scoreLabel: {
    color: colors.primary,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  scoreTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '850',
    marginTop: 4,
  },

  scoreText: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '850',
    marginTop: 25,
  },

  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
    marginBottom: 12,
  },

  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  emotionCard: {
    width: '23.5%',
    minHeight: 76,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emotionActive: {
    backgroundColor: 'rgba(155,123,255,0.20)',
    borderColor: colors.primary,
  },

  emoji: {
    fontSize: 25,
  },

  emotionLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: '700',
    marginTop: 5,
  },

  emotionLabelActive: {
    color: '#FFFFFF',
  },

  noteInput: {
    minHeight: 72,
    marginTop: 12,
    paddingHorizontal: 13,
    paddingTop: 12,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 11,
    textAlignVertical: 'top',
  },

  saveButton: {
    height: 48,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '850',
  },

  historyHeader: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  historyCount: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 2,
  },

  clearText: {
    color: colors.danger,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },

  historyCard: {
    marginTop: 10,
    padding: 13,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  historyEmoji: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  historyEmojiText: {
    fontSize: 22,
  },

  historyMain: {
    flex: 1,
  },

  historyMood: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },

  historyNote: {
    color: colors.textSecondary,
    fontSize: 9,
    marginTop: 3,
  },

  historyDate: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 5,
  },

  historyRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },

  historyScore: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },

  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: 'rgba(255,107,129,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 45,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 10,
  },

  emptyText: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },

  reflectionCard: {
    marginTop: 22,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(155,123,255,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.16)',
    flexDirection: 'row',
    gap: 11,
  },

  reflectionIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reflectionMain: {
    flex: 1,
  },

  reflectionLabel: {
    color: colors.primary,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  reflectionTitle: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
    marginTop: 4,
  },

  reflectionText: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
  },

  privacy: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  privacyText: {
    color: colors.textMuted,
    fontSize: 8,
  },
});
