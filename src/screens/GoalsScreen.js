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
import { useProductivity } from '../store/productivityStore';

export default function GoalsScreen({ onNavigate }) {
  const {
    tasks,
    habits,
    toggleTask,
    addTask,
  } = useProductivity();

  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    const title = newTask.trim();
    if (!title) return;

    addTask(title, 'medium');
    setNewTask('');
  };

  const completed = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? completed / tasks.length : 0;

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
            <Text style={styles.eyebrow}>PERSONAL GROWTH</Text>
            <Text style={styles.title}>Goals</Text>
          </View>

          <Pressable style={styles.iconButton}>
            <Ionicons name="add" size={23} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressLabel}>TODAY'S PROGRESS</Text>
              <Text style={styles.progressValue}>
                {completed}/{tasks.length}
              </Text>
              <Text style={styles.progressSubtitle}>
                tasks completed
              </Text>
            </View>

            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.max(progress * 100, 2)}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's plan</Text>
          <Text style={styles.sectionHint}>Smart plan</Text>
        </View>

        <View style={styles.addTask}>
          <Ionicons name="add-circle-outline" size={22} color={colors.primary} />

          <TextInput
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={handleAddTask}
            placeholder="Add a task..."
            placeholderTextColor={colors.textMuted}
            style={styles.taskInput}
            returnKeyType="done"
          />

          {newTask.trim().length > 0 && (
            <Pressable onPress={handleAddTask}>
              <Ionicons name="arrow-up-circle" size={26} color={colors.primary} />
            </Pressable>
          )}
        </View>

        {tasks.map((task) => (
          <Pressable
            key={task.id}
            style={styles.task}
            onPress={() => toggleTask(task.id)}
          >
            <View
              style={[
                styles.checkbox,
                task.completed && styles.checkboxDone,
              ]}
            >
              {task.completed && (
                <Ionicons name="checkmark" size={15} color="#FFFFFF" />
              )}
            </View>

            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.taskCompleted,
                ]}
              >
                {task.title}
              </Text>

              <Text style={styles.taskType}>{task.priority || 'medium'} priority</Text>
            </View>

            <Ionicons
              name="ellipsis-horizontal"
              size={19}
              color={colors.textMuted}
            />
          </Pressable>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Habit streaks</Text>
          <Text style={styles.sectionHint}>Keep going 🔥</Text>
        </View>

        <View style={styles.habitRow}>
          {habits.map((habit) => (
            <View key={habit.title} style={styles.habitCard}>
              <View style={styles.habitIcon}>
                <Ionicons
                  name={habit.title === 'Exercise' ? 'fitness-outline' : habit.title === 'Journal' ? 'book-outline' : 'water-outline'}
                  size={20}
                  color={colors.primary}
                />
              </View>

              <Text style={styles.habitTitle}>{habit.title}</Text>

              <View style={styles.streak}>
                <Ionicons name="flame" size={13} color={colors.accent} />
                <Text style={styles.streakText}>{habit.streak}</Text>
              </View>

              <Text style={styles.days}>day streak</Text>
            </View>
          ))}
        </View>

        <View style={styles.focusCard}>
          <View style={styles.focusIcon}>
            <Ionicons name="timer-outline" size={23} color="#FFFFFF" />
          </View>

          <View style={styles.focusContent}>
            <Text style={styles.focusLabel}>FOCUS SESSION</Text>
            <Text style={styles.focusTitle}>25 minutes of deep focus</Text>
            <Text style={styles.focusSubtitle}>
              Remove distractions and get things done.
            </Text>
          </View>

          <Pressable style={styles.startButton}>
            <Ionicons name="play" size={16} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.weekCard}>
          <View style={styles.weekHeader}>
            <Text style={styles.weekTitle}>Weekly consistency</Text>
            <Text style={styles.weekScore}>82%</Text>
          </View>

          <View style={styles.weekBars}>
            {[70, 88, 55, 92, 76, 100, 40].map((height, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      { height: `${height}%` },
                    ]}
                  />
                </View>
                <Text style={styles.day}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </Text>
              </View>
            ))}
          </View>
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

  progressCard: {
    marginTop: 28,
    padding: 20,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressLabel: {
    color: colors.textMuted,
    fontSize: 9,
    letterSpacing: 1.4,
    fontWeight: '800',
  },

  progressValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },

  progressSubtitle: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  progressCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(155,123,255,0.12)',
    borderWidth: 6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressPercent: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },

  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.surface2,
    marginTop: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  sectionHeader: {
    marginTop: 29,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },

  sectionHint: {
    color: colors.textMuted,
    fontSize: 10,
  },

  addTask: {
    minHeight: 56,
    borderRadius: 17,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 10,
  },

  taskInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },

  task: {
    minHeight: 68,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  taskContent: {
    flex: 1,
    marginLeft: 12,
  },

  taskTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '650',
  },

  taskCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },

  taskType: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 4,
  },

  habitRow: {
    flexDirection: 'row',
    gap: 9,
  },

  habitCard: {
    flex: 1,
    minHeight: 125,
    padding: 11,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  habitIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  habitTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },

  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
  },

  streakText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },

  days: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 2,
  },

  focusCard: {
    marginTop: 24,
    padding: 15,
    borderRadius: 19,
    backgroundColor: 'rgba(155,123,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.16)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  focusIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  focusContent: {
    flex: 1,
  },

  focusLabel: {
    color: colors.primary,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '800',
  },

  focusTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '750',
    marginTop: 4,
  },

  focusSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 3,
  },

  startButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  weekCard: {
    marginTop: 14,
    padding: 17,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  weekTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '750',
  },

  weekScore: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },

  weekBars: {
    height: 105,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  dayColumn: {
    height: '100%',
    width: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  barTrack: {
    height: 78,
    width: 9,
    borderRadius: 5,
    backgroundColor: colors.surface2,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  bar: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  day: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 8,
  },
});
