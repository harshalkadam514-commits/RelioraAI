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
import { useNotifications } from '../store/notificationStore';

export default function NotificationsScreen({ onNavigate }) {
  const {
    notifications,
    toggleNotification,
    enableAll,
    disableAll,
  } = useNotifications();

  const notificationItems = [
    {
      key: 'dailyCheckIn',
      icon: 'sunny-outline',
      title: 'Daily Check-in',
      description: 'A gentle reminder to check in with Reliora.',
    },
    {
      key: 'journalReminder',
      icon: 'book-outline',
      title: 'Journal Reminder',
      description: 'Remind me to write in my journal.',
    },
    {
      key: 'goalReminder',
      icon: 'flag-outline',
      title: 'Goal Reminder',
      description: 'Keep me on track with my goals.',
    },
    {
      key: 'moodReminder',
      icon: 'heart-outline',
      title: 'Mood Reminder',
      description: 'Remind me to record how I feel.',
    },
    {
      key: 'weeklyInsights',
      icon: 'analytics-outline',
      title: 'Weekly Insights',
      description: 'Receive a summary of my weekly progress.',
    },
    {
      key: 'productUpdates',
      icon: 'megaphone-outline',
      title: 'Product Updates',
      description: 'News about new Reliora features and updates.',
    },
  ];

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
              Notifications
            </Text>

            <Text style={styles.subtitle}>
              Choose what you want Reliora to remind you about
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
              name="notifications"
              size={27}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.heroTitle}>
              Stay in sync
            </Text>

            <Text style={styles.heroText}>
              Reliora can send gentle reminders to help
              you build consistent habits.
            </Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Pressable
            style={styles.quickButton}
            onPress={enableAll}
          >
            <Ionicons
              name="checkmark-done-outline"
              size={15}
              color={colors.primary}
            />

            <Text style={styles.quickText}>
              Enable All
            </Text>
          </Pressable>

          <Pressable
            style={styles.quickButton}
            onPress={disableAll}
          >
            <Ionicons
              name="notifications-off-outline"
              size={15}
              color={colors.textMuted}
            />

            <Text style={styles.quickTextMuted}>
              Disable All
            </Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>
          Reminder Preferences
        </Text>

        <View style={styles.list}>
          {notificationItems.map((item) => {
            const enabled = notifications[item.key];

            return (
              <NotificationRow
                key={item.key}
                {...item}
                enabled={enabled}
                onPress={() =>
                  toggleNotification(item.key)
                }
              />
            );
          })}
        </View>

        <View style={styles.scheduleCard}>
          <View style={styles.scheduleIcon}>
            <Ionicons
              name="time-outline"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.scheduleTitle}>
              Quiet Hours
            </Text>

            <Text style={styles.scheduleText}>
              Notification scheduling will be connected
              to the device notification service.
            </Text>
          </View>

          <View style={styles.timePill}>
            <Text style={styles.timeText}>
              10 PM — 7 AM
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={colors.primary}
          />

          <Text style={styles.infoText}>
            These settings currently control Reliora's
            notification preferences. Native push
            notifications will be connected during the
            backend/device integration phase.
          </Text>
        </View>

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={13}
            color={colors.textMuted}
          />

          <Text style={styles.footerText}>
            You can change these preferences anytime.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function NotificationRow({
  icon,
  title,
  description,
  enabled,
  onPress,
}) {
  return (
    <View style={styles.notificationRow}>
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
          enabled && styles.toggleActive,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.toggleKnob,
            enabled && styles.toggleKnobActive,
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

  hero: {
    marginTop: 19,
    padding: 16,
    borderRadius: 21,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '850',
  },

  heroText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 4,
  },

  flex: {
    flex: 1,
  },

  quickActions: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },

  quickButton: {
    flex: 1,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  quickText: {
    color: colors.primary,
    fontSize: 7,
    fontWeight: '800',
  },

  quickTextMuted: {
    color: colors.textMuted,
    fontSize: 7,
    fontWeight: '800',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '850',
    marginTop: 23,
    marginBottom: 10,
  },

  list: {
    gap: 7,
  },

  notificationRow: {
    minHeight: 70,
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

  scheduleCard: {
    marginTop: 12,
    padding: 13,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  scheduleIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scheduleTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '800',
  },

  scheduleText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 10,
    marginTop: 3,
  },

  timePill: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: colors.surface2,
  },

  timeText: {
    color: colors.textSecondary,
    fontSize: 6,
    fontWeight: '800',
  },

  infoCard: {
    marginTop: 12,
    padding: 13,
    borderRadius: 17,
    backgroundColor: 'rgba(155,123,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.12)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  infoText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
  },

  footer: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  footerText: {
    color: colors.textMuted,
    fontSize: 6,
  },
});
