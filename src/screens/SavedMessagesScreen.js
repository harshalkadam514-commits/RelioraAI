import React, { useMemo, useState } from 'react';
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
import { useSavedMessages } from '../store/savedMessagesStore';

export default function SavedMessagesScreen({
  onNavigate,
}) {
  const {
    savedMessages,
    removeSavedMessage,
    clearSavedMessages,
  } = useSavedMessages();

  const [query, setQuery] = useState('');

  const filteredMessages = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return savedMessages;
    }

    return savedMessages.filter((message) =>
      message.text
        .toLowerCase()
        .includes(normalized)
    );
  }, [savedMessages, query]);

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
              Saved Messages
            </Text>

            <Text style={styles.subtitle}>
              Keep important conversations close
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

        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={17}
            color={colors.textMuted}
          />

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search saved messages..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        {savedMessages.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={clearSavedMessages}
          >
            <Ionicons
              name="trash-outline"
              size={15}
              color={colors.textMuted}
            />

            <Text style={styles.clearText}>
              Clear All
            </Text>
          </Pressable>
        )}

        <Text style={styles.sectionTitle}>
          Saved
        </Text>

        {filteredMessages.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="bookmark-outline"
                size={28}
                color={colors.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No saved messages
            </Text>

            <Text style={styles.emptyText}>
              Save useful or meaningful AI responses
              from your conversations and they will
              appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredMessages.map((message) => (
              <SavedMessage
                key={message.id}
                message={message}
                onRemove={() =>
                  removeSavedMessage(message.id)
                }
              />
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
}

function SavedMessage({
  message,
  onRemove,
}) {
  return (
    <View style={styles.messageCard}>
      <View style={styles.messageHeader}>
        <View style={styles.savedBadge}>
          <Ionicons
            name="bookmark"
            size={12}
            color={colors.primary}
          />

          <Text style={styles.savedBadgeText}>
            SAVED
          </Text>
        </View>

        <Pressable
          style={styles.removeButton}
          onPress={onRemove}
        >
          <Ionicons
            name="trash-outline"
            size={15}
            color={colors.textMuted}
          />
        </Pressable>
      </View>

      <Text style={styles.messageText}>
        {message.text}
      </Text>

      <View style={styles.messageFooter}>
        <Text style={styles.roleText}>
          {message.role === 'assistant'
            ? 'Reliora'
            : 'You'}
        </Text>

        <Text style={styles.dateText}>
          {new Date(
            message.savedAt
          ).toLocaleDateString()}
        </Text>
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

  searchBox: {
    height: 46,
    marginTop: 19,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 8,
    paddingVertical: 0,
  },

  clearButton: {
    height: 38,
    marginTop: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    gap: 6,
  },

  clearText: {
    color: colors.textMuted,
    fontSize: 7,
    fontWeight: '800',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '850',
    marginTop: 19,
    marginBottom: 10,
  },

  list: {
    gap: 8,
  },

  messageCard: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  savedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(155,123,255,0.08)',
  },

  savedBadgeText: {
    color: colors.primary,
    fontSize: 5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  removeButton: {
    width: 29,
    height: 29,
    borderRadius: 9,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageText: {
    color: colors.text,
    fontSize: 8,
    lineHeight: 13,
    marginTop: 11,
  },

  messageFooter: {
    marginTop: 12,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  roleText: {
    color: colors.primary,
    fontSize: 6,
    fontWeight: '800',
  },

  dateText: {
    color: colors.textMuted,
    fontSize: 6,
  },

  emptyCard: {
    minHeight: 210,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '850',
    marginTop: 12,
  },

  emptyText: {
    maxWidth: 260,
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 11,
    textAlign: 'center',
    marginTop: 5,
  },
});
