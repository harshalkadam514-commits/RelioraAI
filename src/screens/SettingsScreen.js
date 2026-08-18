import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const groups = [
  {
    title: 'AI & Relationship',
    items: [
      {
        id: 'memory',
        title: 'Memory',
        subtitle: 'What Reliora remembers about you',
        icon: 'sparkles-outline',
      },
      {
        id: 'mood',
        title: 'Mood & Emotion',
        subtitle: 'Track moods and emotional patterns',
        icon: 'heart-outline',
      },
      {
        id: 'voice',
        title: 'Voice',
        subtitle: 'Voice conversations and preferences',
        icon: 'mic-outline',
      },
      {
        id: 'personalization',
        title: 'Personalization',
        subtitle: 'Make Reliora feel more like you',
        icon: 'person-outline',
      },
    ],
  },
  {
    title: 'Productivity',
    items: [
      {
        id: 'goals',
        title: 'Goals & Habits',
        subtitle: 'Tasks, goals, streaks and focus',
        icon: 'checkmark-circle-outline',
      },
      {
        id: 'insights',
        title: 'Insights',
        subtitle: 'Your personal growth dashboard',
        icon: 'analytics-outline',
      },
      {
        id: 'journal',
        title: 'Journal',
        subtitle: 'Private reflections and AI analysis',
        icon: 'book-outline',
      },
    ],
  },
  {
    title: 'Account & Privacy',
    items: [
      {
        id: 'security',
        title: 'Security',
        description: 'App lock and data protection',
        icon: 'shield-checkmark-outline',
      },
      {
        id: 'chatHistory',
        title: 'Chat History',
        description: 'Manage your conversations',
        icon: 'chatbubbles-outline',
      },
      {
        id: 'savedMessages',
        title: 'Saved Messages',
        description: 'Access your saved AI responses',
        icon: 'bookmark-outline',
      },
      {
        id: 'privacy',
        title: 'Privacy & Security',
        subtitle: 'Data controls and app protection',
        icon: 'shield-checkmark-outline',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        subtitle: 'Reminders and daily check-ins',
        icon: 'notifications-outline',
      },
      {
        id: 'premium',
        title: 'Reliora Premium',
        subtitle: 'Advanced AI and companion features',
        icon: 'diamond-outline',
      },
    ],
  },
];

export default function SettingsScreen({ onNavigate }) {
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
            style={styles.back}
            onPress={() => onNavigate?.('home')}
          >
            <Ionicons name="chevron-back" size={23} color="#FFFFFF" />
          </Pressable>

          <View>
            <Text style={styles.eyebrow}>RELIORA AI</Text>
            <Text style={styles.title}>Settings</Text>
          </View>

          <View style={styles.back} />
        </View>

        <View style={styles.accountCard}>
          <LinearGradient
            colors={['#211742', '#151126']}
            style={styles.accountGradient}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>H</Text>
            </View>

            <View style={styles.accountMain}>
              <Text style={styles.accountName}>Harsh</Text>
              <Text style={styles.accountSubtitle}>
                Reliora is learning how to support you better.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </LinearGradient>
        </View>

        {groups.map((group) => (
          <View key={group.title}>
            <Text style={styles.groupTitle}>{group.title}</Text>

            <View style={styles.groupCard}>
              {group.items.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() => onNavigate?.(item.id)}
                  style={[
                    styles.row,
                    index !== group.items.length - 1 && styles.rowBorder,
                  ]}
                >
                  <View style={styles.rowIcon}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.rowMain}>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                    <Text style={styles.rowSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.textMuted}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.aiCard}>
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          </View>

          <View style={styles.aiMain}>
            <Text style={styles.aiLabel}>RELIORA INTELLIGENCE</Text>
            <Text style={styles.aiTitle}>
              Your companion adapts to your preferences.
            </Text>
            <Text style={styles.aiText}>
              You control memory, personalization and privacy at any time.
            </Text>
          </View>
        </View>

        <Text style={styles.version}>
          Reliora AI • v1.0.0
        </Text>
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

  back: {
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

  accountCard: {
    marginTop: 27,
    borderRadius: 21,
    overflow: 'hidden',
  },

  accountGradient: {
    minHeight: 90,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.20)',
    borderRadius: 21,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },

  accountMain: {
    flex: 1,
  },

  accountName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },

  accountSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
  },

  groupTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 28,
    marginBottom: 12,
  },

  groupCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  row: {
    minHeight: 73,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  rowMain: {
    flex: 1,
  },

  rowTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },

  rowSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  aiCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(155,123,255,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.16)',
    flexDirection: 'row',
    gap: 12,
  },

  aiIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  aiMain: {
    flex: 1,
  },

  aiLabel: {
    color: colors.primary,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  aiTitle: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '750',
    marginTop: 4,
  },

  aiText: {
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
