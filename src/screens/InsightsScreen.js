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

const moodData = [
  { day: 'M', value: 55, mood: '🙂' },
  { day: 'T', value: 72, mood: '😄' },
  { day: 'W', value: 48, mood: '😐' },
  { day: 'T', value: 82, mood: '🤩' },
  { day: 'F', value: 66, mood: '🙂' },
  { day: 'S', value: 91, mood: '🤩' },
  { day: 'S', value: 76, mood: '😄' },
];

const stats = [
  { icon: 'chatbubble-ellipses-outline', value: '128', label: 'Conversations' },
  { icon: 'time-outline', value: '6h 42m', label: 'AI time' },
  { icon: 'book-outline', value: '14', label: 'Journal entries' },
  { icon: 'flame-outline', value: '12', label: 'Day streak' },
];

const growth = [
  { title: 'Emotional awareness', value: 78, icon: 'heart-outline' },
  { title: 'Consistency', value: 84, icon: 'repeat-outline' },
  { title: 'Productivity', value: 69, icon: 'rocket-outline' },
  { title: 'Self reflection', value: 91, icon: 'sparkles-outline' },
];

export default function InsightsScreen({ onNavigate }) {
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
            style={styles.iconButton}
            onPress={() => onNavigate?.('home')}
          >
            <Ionicons name="chevron-back" size={23} color="#FFFFFF" />
          </Pressable>

          <View>
            <Text style={styles.eyebrow}>PERSONAL GROWTH</Text>
            <Text style={styles.title}>Insights</Text>
          </View>

          <Pressable style={styles.iconButton}>
            <Ionicons name="calendar-outline" size={21} color="#A7A9B4" />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="sparkles" size={22} color="#FFFFFF" />
          </View>

          <Text style={styles.heroLabel}>YOUR WEEK WITH RELIORA</Text>
          <Text style={styles.heroTitle}>
            You're becoming more consistent.
          </Text>
          <Text style={styles.heroSubtitle}>
            Your mood and reflection activity improved compared with last week.
          </Text>

          <View style={styles.improvement}>
            <Ionicons name="trending-up" size={15} color={colors.success} />
            <Text style={styles.improvementText}>+18% overall growth</Text>
          </View>
        </View>

        <Text style={styles.section}>Activity overview</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons
                  name={stat.icon}
                  size={18}
                  color={colors.primary}
                />
              </View>

              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.section}>Mood trends</Text>
          <View style={styles.weekPill}>
            <Text style={styles.weekPillText}>7 days</Text>
            <Ionicons name="chevron-down" size={12} color={colors.textMuted} />
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartTop}>
            <View>
              <Text style={styles.chartLabel}>AVERAGE MOOD</Text>
              <Text style={styles.chartValue}>7.8/10</Text>
            </View>

            <View style={styles.chartChange}>
              <Ionicons name="arrow-up" size={12} color={colors.success} />
              <Text style={styles.chartChangeText}>12%</Text>
            </View>
          </View>

          <View style={styles.chart}>
            {moodData.map((item, index) => (
              <View key={`${item.day}-${index}`} style={styles.chartColumn}>
                <Text style={styles.moodEmoji}>{item.mood}</Text>

                <View style={styles.chartTrack}>
                  <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    style={[
                      styles.chartBar,
                      { height: `${item.value}%` },
                    ]}
                  />
                </View>

                <Text style={styles.day}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.section}>Personal growth</Text>

        <View style={styles.growthCard}>
          {growth.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.growthRow,
                index !== growth.length - 1 && styles.growthBorder,
              ]}
            >
              <View style={styles.growthIcon}>
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={colors.primary}
                />
              </View>

              <View style={styles.growthMain}>
                <View style={styles.growthTop}>
                  <Text style={styles.growthTitle}>{item.title}</Text>
                  <Text style={styles.growthValue}>{item.value}%</Text>
                </View>

                <View style={styles.growthTrack}>
                  <View
                    style={[
                      styles.growthFill,
                      { width: `${item.value}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons name="bulb-outline" size={22} color="#FFFFFF" />
          </View>

          <View style={styles.insightContent}>
            <Text style={styles.insightLabel}>RELiora noticed</Text>
            <Text style={styles.insightTitle}>
              You tend to feel better on days when you journal.
            </Text>
            <Text style={styles.insightText}>
              Your journal activity and positive mood have shown a strong
              correlation this week.
            </Text>
          </View>
        </View>

        <View style={styles.reportCard}>
          <View style={styles.reportIcon}>
            <Ionicons name="document-text-outline" size={20} color={colors.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.reportTitle}>Weekly reflection</Text>
            <Text style={styles.reportSubtitle}>
              Generate a deeper AI-powered personal report.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={19}
            color={colors.textMuted}
          />
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

  iconButton: {
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

  hero: {
    marginTop: 28,
    padding: 20,
    borderRadius: 23,
    backgroundColor: 'rgba(155,123,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.18)',
  },

  heroIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  heroLabel: {
    color: colors.primary,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: '800',
  },

  heroTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '800',
    marginTop: 7,
  },

  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
  },

  improvement: {
    alignSelf: 'flex-start',
    marginTop: 14,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(88,214,163,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  improvementText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: '750',
  },

  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 27,
    marginBottom: 13,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  statCard: {
    width: '48.5%',
    minHeight: 115,
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statValue: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '850',
    marginTop: 10,
  },

  statLabel: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  weekPill: {
    marginTop: 27,
    height: 31,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  weekPillText: {
    color: colors.textSecondary,
    fontSize: 9,
  },

  chartCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  chartTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  chartLabel: {
    color: colors.textMuted,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '800',
  },

  chartValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '850',
    marginTop: 3,
  },

  chartChange: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: 'rgba(88,214,163,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  chartChangeText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: '800',
  },

  chart: {
    height: 190,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },

  chartColumn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  moodEmoji: {
    fontSize: 15,
    marginBottom: 7,
  },

  chartTrack: {
    height: 125,
    width: 13,
    borderRadius: 7,
    backgroundColor: colors.surface2,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  chartBar: {
    width: '100%',
    borderRadius: 7,
  },

  day: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 8,
  },

  growthCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  growthRow: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  growthBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  growthIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  growthMain: {
    flex: 1,
  },

  growthTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  growthTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '650',
  },

  growthValue: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },

  growthTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.surface2,
    overflow: 'hidden',
  },

  growthFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  insightCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },

  insightIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  insightContent: {
    flex: 1,
  },

  insightLabel: {
    color: colors.accent,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '800',
  },

  insightTitle: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '750',
    marginTop: 4,
  },

  insightText: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 5,
  },

  reportCard: {
    marginTop: 10,
    padding: 15,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  reportTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '750',
  },

  reportSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },
});
