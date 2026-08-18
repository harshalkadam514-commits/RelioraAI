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
import { useMemoryStore } from '../store/memoryStore';

const categories = [
  { id: 'personal', label: 'Personal', icon: 'person-outline' },
  { id: 'preference', label: 'Preferences', icon: 'heart-outline' },
  { id: 'goal', label: 'Goals', icon: 'flag-outline' },
  { id: 'conversation', label: 'Conversation', icon: 'chatbubble-outline' },
];

export default function MemoryScreen({ onNavigate }) {
  const {
    memories,
    addMemory,
    deleteMemory,
    clearAllMemories,
  } = useMemoryStore();

  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveMemory = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Missing information', 'Please enter both a title and memory.');
      return;
    }

    addMemory({
      type: selectedCategory,
      title: title.trim(),
      content: content.trim(),
    });

    setTitle('');
    setContent('');
    setAdding(false);
  };

  const forget = (id) => {
    Alert.alert(
      'Forget this memory?',
      'Reliora will remove this memory from the current memory system.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Forget',
          style: 'destructive',
          onPress: () => deleteMemory(id),
        },
      ]
    );
  };

  const clearMemories = () => {
    Alert.alert(
      'Delete all memories?',
      'This will remove every memory from the current local memory system.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: clearAllMemories,
        },
      ]
    );
  };

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
            <Text style={styles.eyebrow}>RELIORA MEMORY</Text>
            <Text style={styles.title}>Memory</Text>
          </View>

          <Pressable
            style={styles.iconButton}
            onPress={() => setAdding(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="sparkles" size={22} color={colors.primary} />
          </View>

          <View style={styles.statusMain}>
            <Text style={styles.statusTitle}>Memory is active</Text>
            <Text style={styles.statusText}>
              Reliora can use saved information to make conversations more relevant.
            </Text>
          </View>

          <View style={styles.activeDot} />
        </View>

        <Text style={styles.sectionTitle}>Memory categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((category) => {
            const active = selectedCategory === category.id;

            return (
              <Pressable
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={[
                  styles.category,
                  active && styles.categoryActive,
                ]}
              >
                <Ionicons
                  name={category.icon}
                  size={16}
                  color={active ? '#FFFFFF' : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {adding && (
          <View style={styles.addCard}>
            <View style={styles.addHeader}>
              <Text style={styles.addTitle}>Add memory</Text>

              <Pressable onPress={() => setAdding(false)}>
                <Ionicons
                  name="close"
                  size={21}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Memory title"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
            />

            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="What should Reliora remember?"
              placeholderTextColor={colors.textMuted}
              multiline
              style={[styles.input, styles.textArea]}
            />

            <Pressable style={styles.saveButton} onPress={saveMemory}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              <Text style={styles.saveText}>Save memory</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.memoryHeader}>
          <View>
            <Text style={styles.sectionTitle}>Saved memories</Text>
            <Text style={styles.countText}>
              {memories.length} memories stored
            </Text>
          </View>

          {memories.length > 0 && (
            <Pressable onPress={clearMemories}>
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
          )}
        </View>

        {memories.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons
              name="sparkles-outline"
              size={38}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No memories yet</Text>
            <Text style={styles.emptyText}>
              Add something important and Reliora can remember it.
            </Text>
          </View>
        ) : (
          memories.map((memory) => (
            <View key={memory.id} style={styles.memoryCard}>
              <View style={styles.memoryIcon}>
                <Ionicons
                  name={
                    categories.find((item) => item.id === memory.type)?.icon ||
                    'sparkles-outline'
                  }
                  size={19}
                  color={colors.primary}
                />
              </View>

              <View style={styles.memoryMain}>
                <View style={styles.memoryTitleRow}>
                  <Text style={styles.memoryTitle}>{memory.title}</Text>

                  {memory.private && (
                    <Ionicons
                      name="lock-closed-outline"
                      size={13}
                      color={colors.textMuted}
                    />
                  )}
                </View>

                <Text style={styles.memoryContent}>
                  {memory.content}
                </Text>

                <Text style={styles.memoryDate}>
                  {memory.createdAt}
                </Text>
              </View>

              <Pressable
                style={styles.forgetButton}
                onPress={() => forget(memory.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={17}
                  color={colors.danger}
                />
              </Pressable>
            </View>
          ))
        )}

        <View style={styles.privacyNote}>
          <Ionicons
            name="shield-checkmark-outline"
            size={19}
            color={colors.success}
          />
          <Text style={styles.privacyText}>
            You control what Reliora remembers. You can delete memories whenever you want.
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
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 8,
    letterSpacing: 1.5,
    fontWeight: '800',
  },

  title: {
    color: colors.text,
    fontSize: 24,
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

  statusCard: {
    marginTop: 24,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(155,123,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  statusMain: {
    flex: 1,
  },

  statusTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },

  statusText: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 3,
  },

  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginLeft: 8,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '850',
    marginTop: 25,
    marginBottom: 10,
  },

  categories: {
    gap: 8,
    paddingRight: 20,
  },

  category: {
    height: 39,
    paddingHorizontal: 13,
    borderRadius: 13,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  categoryActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },

  categoryTextActive: {
    color: '#FFFFFF',
  },

  addCard: {
    marginTop: 18,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.25)',
  },

  addHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  addTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },

  input: {
    minHeight: 48,
    borderRadius: 13,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 13,
    color: colors.text,
    fontSize: 12,
    marginTop: 8,
  },

  textArea: {
    height: 90,
    paddingTop: 13,
    textAlignVertical: 'top',
  },

  saveButton: {
    height: 47,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
    marginTop: 10,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  memoryHeader: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  countText: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: -6,
  },

  clearText: {
    color: colors.danger,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 11,
  },

  memoryCard: {
    marginTop: 10,
    padding: 13,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  memoryIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  memoryMain: {
    flex: 1,
  },

  memoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  memoryTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },

  memoryContent: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },

  memoryDate: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 6,
  },

  forgetButton: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: 'rgba(255,107,129,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 55,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 12,
  },

  emptyText: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 5,
  },

  privacyNote: {
    marginTop: 22,
    padding: 13,
    borderRadius: 16,
    backgroundColor: 'rgba(88,214,163,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(88,214,163,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  privacyText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 14,
  },
});
