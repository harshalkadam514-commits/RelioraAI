import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useProductivity } from '../store/productivityStore';

export default function ProductivityScreen({ onNavigate }) {
  const {
    tasks,
    habits,
    toggleTask,
    addTask,
    deleteTask,
    toggleHabit,
    addHabit,
  } = useProductivity();

  const [taskText, setTaskText] = useState('');
  const [habitText, setHabitText] = useState('');
  const [focusMinutes, setFocusMinutes] = useState(25);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const completedHabits = habits.filter(
    (habit) => habit.completedToday
  ).length;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>RELIORA AI</Text>
            <Text style={styles.title}>Productivity</Text>
            <Text style={styles.subtitle}>
              Organize your day and build momentum
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

        <View style={styles.statsRow}>
          <Stat
            icon="checkmark-circle-outline"
            value={`${completedTasks}/${tasks.length}`}
            label="Tasks"
          />

          <Stat
            icon="flame-outline"
            value={`${habits.reduce(
              (sum, habit) => sum + habit.streak,
              0
            )}`}
            label="Streak"
          />

          <Stat
            icon="leaf-outline"
            value={`${completedHabits}/${habits.length}`}
            label="Habits"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.sectionCount}>
            {completedTasks} completed
          </Text>
        </View>

        <View style={styles.addRow}>
          <TextInput
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Add a task..."
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />

          <Pressable
            style={styles.addButton}
            onPress={() => {
              addTask(taskText);
              setTaskText('');
            }}
          >
            <Ionicons
              name="add"
              size={22}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        {tasks.map((task) => (
          <Pressable
            key={task.id}
            style={styles.taskCard}
            onPress={() => toggleTask(task.id)}
          >
            <View
              style={[
                styles.check,
                task.completed && styles.checkDone,
              ]}
            >
              {task.completed && (
                <Ionicons
                  name="checkmark"
                  size={15}
                  color="#FFFFFF"
                />
              )}
            </View>

            <View style={styles.flex}>
              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.completedText,
                ]}
              >
                {task.title}
              </Text>

              <Text style={styles.priority}>
                {task.priority.toUpperCase()} PRIORITY
              </Text>
            </View>

            <Pressable
              onPress={() => deleteTask(task.id)}
              hitSlop={10}
            >
              <Ionicons
                name="trash-outline"
                size={17}
                color={colors.textMuted}
              />
            </Pressable>
          </Pressable>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Habits</Text>
          <Text style={styles.sectionCount}>
            {completedHabits} today
          </Text>
        </View>

        <View style={styles.addRow}>
          <TextInput
            value={habitText}
            onChangeText={setHabitText}
            placeholder="Add a habit..."
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />

          <Pressable
            style={styles.addButton}
            onPress={() => {
              addHabit(habitText);
              setHabitText('');
            }}
          >
            <Ionicons
              name="add"
              size={22}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        {habits.map((habit) => (
          <Pressable
            key={habit.id}
            style={styles.habitCard}
            onPress={() => toggleHabit(habit.id)}
          >
            <View style={styles.habitIcon}>
              <Ionicons
                name="flame-outline"
                size={19}
                color={colors.accent}
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.habitTitle}>
                {habit.title}
              </Text>

              <Text style={styles.habitStreak}>
                {habit.streak} day streak
              </Text>
            </View>

            <View
              style={[
                styles.habitCheck,
                habit.completedToday &&
                  styles.habitCheckDone,
              ]}
            >
              {habit.completedToday && (
                <Ionicons
                  name="checkmark"
                  size={16}
                  color="#FFFFFF"
                />
              )}
            </View>
          </Pressable>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Focus Session</Text>
          <Text style={styles.sectionCount}>Deep work</Text>
        </View>

        <View style={styles.focusCard}>
          <View style={styles.focusOrb}>
            <Ionicons
              name="timer-outline"
              size={30}
              color={colors.primary}
            />
          </View>

          <Text style={styles.focusTime}>
            {focusMinutes}:00
          </Text>

          <Text style={styles.focusSubtitle}>
            Focus without distractions
          </Text>

          <View style={styles.focusOptions}>
            {[15, 25, 45, 60].map((minutes) => (
              <Pressable
                key={minutes}
                onPress={() => setFocusMinutes(minutes)}
                style={[
                  styles.minuteButton,
                  focusMinutes === minutes &&
                    styles.minuteButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.minuteText,
                    focusMinutes === minutes &&
                      styles.minuteTextActive,
                  ]}
                >
                  {minutes}m
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.startFocus}>
            <Ionicons
              name="play"
              size={17}
              color="#FFFFFF"
            />
            <Text style={styles.startFocusText}>
              Start Focus
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          <Text style={styles.sectionCount}>AI planned</Text>
        </View>

        <View style={styles.planCard}>
          <PlanItem
            time="08:00"
            title="Morning routine"
            icon="sunny-outline"
          />

          <PlanItem
            time="10:00"
            title="Deep study session"
            icon="school-outline"
          />

          <PlanItem
            time="13:00"
            title="Break & lunch"
            icon="restaurant-outline"
          />

          <PlanItem
            time="15:00"
            title="Important tasks"
            icon="flash-outline"
          />

          <PlanItem
            time="19:00"
            title="Review & journal"
            icon="book-outline"
          />
        </View>

        <View style={styles.smartCard}>
          <View style={styles.smartIcon}>
            <Ionicons
              name="sparkles-outline"
              size={21}
              color={colors.primary}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.smartTitle}>
              Smart Scheduling
            </Text>

            <Text style={styles.smartText}>
              Let Reliora organize tasks around your
              goals, habits and available time.
            </Text>
          </View>

          <Pressable style={styles.smallButton}>
            <Text style={styles.smallButtonText}>
              Plan
            </Text>
          </Pressable>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakIcon}>
            <Ionicons
              name="flame"
              size={22}
              color={colors.accent}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.streakTitle}>
              Keep your momentum
            </Text>

            <Text style={styles.streakText}>
              Complete today's habits to increase
              your personal growth streak.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ icon, value, label }) {
  return (
    <View style={styles.stat}>
      <Ionicons
        name={icon}
        size={18}
        color={colors.primary}
      />

      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function PlanItem({ time, title, icon }) {
  return (
    <View style={styles.planItem}>
      <Text style={styles.planTime}>
        {time}
      </Text>

      <View style={styles.planLine} />

      <View style={styles.planIcon}>
        <Ionicons
          name={icon}
          size={16}
          color={colors.primary}
        />
      </View>

      <Text style={styles.planTitle}>
        {title}
      </Text>
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

  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },

  stat: {
    flex: 1,
    minHeight: 82,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },

  statValue: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 7,
  },

  statLabel: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 23,
    marginBottom: 10,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '850',
  },

  sectionCount: {
    color: colors.textMuted,
    fontSize: 8,
  },

  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 9,
  },

  input: {
    flex: 1,
    height: 45,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 13,
    color: colors.text,
    fontSize: 10,
  },

  addButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  taskCard: {
    minHeight: 67,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 7,
  },

  check: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  flex: {
    flex: 1,
  },

  taskTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
  },

  completedText: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },

  priority: {
    color: colors.textMuted,
    fontSize: 6,
    letterSpacing: 0.7,
    marginTop: 4,
  },

  habitCard: {
    minHeight: 67,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 7,
  },

  habitIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: 'rgba(255,111,181,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  habitTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '750',
  },

  habitStreak: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 4,
  },

  habitCheck: {
    width: 27,
    height: 27,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  habitCheckDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  focusCard: {
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
  },

  focusOrb: {
    width: 67,
    height: 67,
    borderRadius: 34,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  focusTime: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 10,
  },

  focusSubtitle: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 2,
  },

  focusOptions: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 15,
  },

  minuteButton: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  minuteButtonActive: {
    backgroundColor: colors.primary,
  },

  minuteText: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '700',
  },

  minuteTextActive: {
    color: '#FFFFFF',
  },

  startFocus: {
    height: 43,
    width: '100%',
    marginTop: 14,
    borderRadius: 13,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  startFocusText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '850',
  },

  planCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },

  planItem: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },

  planTime: {
    width: 39,
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '700',
  },

  planLine: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
    marginRight: 10,
  },

  planIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  planTitle: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '650',
  },

  smartCard: {
    marginTop: 10,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.13)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  smartIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  smartTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
  },

  smartText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 3,
  },

  smallButton: {
    paddingHorizontal: 12,
    height: 31,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallButtonText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },

  streakCard: {
    marginTop: 10,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  streakIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(255,111,181,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  streakTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
  },

  streakText: {
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    marginTop: 3,
  },
});
