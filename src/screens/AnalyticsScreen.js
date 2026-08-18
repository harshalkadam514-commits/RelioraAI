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
import { useAnalytics } from '../store/analyticsStore';

export default function AnalyticsScreen({ onNavigate }) {
  const {
    stats,
    moodData,
    growthScore,
    averageMood,
  } = useAnalytics();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>RELIORA AI</Text>
            <Text style={styles.title}>Your Insights</Text>
            <Text style={styles.subtitle}>
              See how you are growing over time
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

        <View style={styles.growthCard}>
          <View style={styles.growthHeader}>
            <View>
              <Text style={styles.growthLabel}>
                PERSONAL GROWTH
              </Text>

              <Text style={styles.growthTitle}>
                Growth Score
              </Text>
            </View>

            <View style={styles.scoreCircle}>
              <Text style={styles.score}>
                {growthScore}
              </Text>

              <Text style={styles.scoreSmall}>
                /100
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${growthScore}%` },
              ]}
            />
          </View>

          <Text style={styles.growthText}>
            Your consistency, reflection and activity are
            contributing to your personal growth.
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <Metric
            icon="chatbubble-ellipses-outline"
            value={stats.conversations}
            label="Conversations"
          />

          <Metric
            icon="paper-plane-outline"
            value={stats.messages}
            label="Messages"
          />

          <Metric
            icon="time-outline"
            value={`${stats.usageMinutes}m`}
            label="AI Usage"
          />

          <Metric
            icon="book-outline"
            value={stats.journalEntries}
            label="Journal Entries"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Mood Trends
          </Text>

          <Text style={styles.average}>
            Avg {averageMood}%
          </Text>
        </View>

        <View style={styles.moodCard}>
          <View style={styles.chart}>
            {moodData.map((item) => (
              <View
                key={item.day}
                style={styles.chartColumn}
              >
                <Text style={styles.chartValue}>
                  {item.value}
                </Text>

                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${item.value}%`,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.chartDay}>
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Consistency
          </Text>

          <Text style={styles.average}>
            This month
          </Text>
        </View>

        <View style={styles.consistencyCard}>
          <Consistency
            icon="flame-outline"
            title="Current Streak"
            value={`${stats.currentStreak} days`}
            description="Keep going"
          />

          <Consistency
            icon="trophy-outline"
            title="Longest Streak"
            value={`${stats.longestStreak} days`}
            description="Personal best"
          />

          <Consistency
            icon="calendar-outline"
            title="Active Days"
            value={`${stats.activeDays}`}
            description="This month"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Journal Insights
          </Text>

          <Text style={styles.average}>
            {stats.journalEntries} entries
          </Text>
        </View>

        <View style={styles.journalCard}>
          <View style={styles.journalIcon}>
            <Ionicons
              name="book-outline"
              size={21}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.journalTitle}>
              Reflection consistency
            </Text>

            <Text style={styles.journalText}>
              Regular journaling can help you notice
              patterns in your mood, thoughts and goals.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Growth Breakdown
          </Text>
        </View>

        <View style={styles.breakdownCard}>
          <ProgressRow
            label="Consistency"
            value={82}
          />

          <ProgressRow
            label="Reflection"
            value={74}
          />

          <ProgressRow
            label="Goals"
            value={68}
          />

          <ProgressRow
            label="Mood Stability"
            value={79}
          />
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons
              name="sparkles-outline"
              size={20}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.insightTitle}>
              Reliora's Insight
            </Text>

            <Text style={styles.insightText}>
              Your recent consistency is strong. Keep
              protecting your streak and continue using
              your journal to understand your patterns.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Ionicons
            name="lock-closed-outline"
            size={13}
            color={colors.textMuted}
          />

          <Text style={styles.footerText}>
            Your personal analytics stay under your
            privacy controls.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Metric({ icon, value, label }) {
  return (
    <View style={styles.metric}>
      <Ionicons
        name={icon}
        size={18}
        color={colors.primary}
      />

      <Text style={styles.metricValue}>
        {value}
      </Text>

      <Text style={styles.metricLabel}>
        {label}
      </Text>
    </View>
  );
}

function Consistency({
  icon,
  title,
  value,
  description,
}) {
  return (
    <View style={styles.consistencyItem}>
      <View style={styles.consistencyIcon}>
        <Ionicons
          name={icon}
          size={17}
          color={colors.accent}
        />
      </View>

      <Text style={styles.consistencyValue}>
        {value}
      </Text>

      <Text style={styles.consistencyTitle}>
        {title}
      </Text>

      <Text style={styles.consistencyDescription}>
        {description}
      </Text>
    </View>
  );
}

function ProgressRow({ label, value }) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressLabelRow}>
        <Text style={styles.progressLabel}>
          {label}
        </Text>

        <Text style={styles.progressValue}>
          {value}%
        </Text>
      </View>

      <View style={styles.progressTrackSmall}>
        <View
          style={[
            styles.progressFillSmall,
            { width: `${value}%` },
          ]}
        />
      </View>
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

  growthCard: {
    marginTop: 19,
    padding: 17,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  growthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  growthLabel: {
    color: colors.primary,
    fontSize: 7,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  growthTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 4,
  },

  scoreCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  score: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },

  scoreSmall: {
    color: colors.textMuted,
    fontSize: 6,
    marginTop: -2,
  },

  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.surface2,
    overflow: 'hidden',
    marginTop: 15,
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  growthText: {
    color: colors.textMuted,
    fontSize: 8,
    lineHeight: 13,
    marginTop: 10,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },

  metric: {
    width: '48.5%',
    minHeight: 82,
    padding: 12,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  metricValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },

  metricLabel: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 2,
  },

  sectionHeader: {
    marginTop: 23,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '850',
  },

  average: {
    color: colors.textMuted,
    fontSize: 8,
  },

  moodCard: {
    height: 205,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  chartColumn: {
    height: '100%',
    width: 34,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  chartValue: {
    color: colors.textMuted,
    fontSize: 6,
    marginBottom: 5,
  },

  barTrack: {
    width: 15,
    height: 125,
    borderRadius: 8,
    backgroundColor: colors.surface2,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  bar: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: colors.primary,
  },

  chartDay: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 7,
  },

  consistencyCard: {
    padding: 13,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 6,
  },

  consistencyItem: {
    flex: 1,
    alignItems: 'center',
  },

  consistencyIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: 'rgba(255,111,181,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  consistencyValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 6,
  },

  consistencyTitle: {
    color: colors.textSecondary,
    fontSize: 7,
    textAlign: 'center',
    marginTop: 2,
  },

  consistencyDescription: {
    color: colors.textMuted,
    fontSize: 6,
    marginTop: 2,
  },

  journalCard: {
    padding: 14,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 10,
  },

  journalIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  journalTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
  },

  journalText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 4,
  },

  breakdownCard: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  progressRow: {
    marginBottom: 13,
  },

  progressRowLast: {
    marginBottom: 0,
  },

  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  progressLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: '700',
  },

  progressValue: {
    color: colors.textMuted,
    fontSize: 7,
  },

  progressTrackSmall: {
    height: 6,
    borderRadius: 4,
    backgroundColor: colors.surface2,
    overflow: 'hidden',
  },

  progressFillSmall: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  insightCard: {
    marginTop: 10,
    padding: 14,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.13)',
    flexDirection: 'row',
    gap: 10,
  },

  insightIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  insightTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '850',
  },

  insightText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 4,
  },

  footer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  footerText: {
    color: colors.textMuted,
    fontSize: 7,
  },
});
