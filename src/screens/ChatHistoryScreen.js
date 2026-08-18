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
import {
  useChatStore,
  startNewChat,
  togglePinCurrentChat,
  toggleArchiveCurrentChat,
  deleteCurrentChat,
} from '../store/chatStore';

export default function ChatHistoryScreen({
  onNavigate,
}) {
  const { title, messages, pinned, archived, updatedAt } =
    useChatStore();

  const chats = messages.length > 0
    ? [{
        id: 'current',
        title,
        preview: messages[messages.length - 1]?.text || '',
        messages,
        pinned,
        archived,
        updatedAt,
      }]
    : [];

  const [query, setQuery] = useState('');

  const filteredChats = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return chats;
    }

    return chats.filter((chat) =>
      `${chat.title} ${chat.preview}`
        .toLowerCase()
        .includes(normalized)
    );
  }, [chats, query]);

  const sortedChats = [...filteredChats].sort(
    (a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }

      return (
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
      );
    }
  );

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
              Chat History
            </Text>

            <Text style={styles.subtitle}>
              Find and manage your conversations
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
            placeholder="Search conversations..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        <Pressable
          style={styles.newButton}
          onPress={() => startNewChat()}
        >
          <Ionicons
            name="add"
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.newText}>
            New Conversation
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>
          Conversations
        </Text>

        {sortedChats.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="chatbubbles-outline"
                size={28}
                color={colors.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No conversations yet
            </Text>

            <Text style={styles.emptyText}>
              Start a conversation with Reliora and
              your chats will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {sortedChats.map((chat) => (
              <ChatRow
                key={chat.id}
                chat={chat}
                onPin={togglePinCurrentChat}
                onArchive={() =>
                  toggleArchive(chat.id)
                }
                onDelete={deleteCurrentChat}
              />
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
}

function ChatRow({
  chat,
  onPin,
  onArchive,
  onDelete,
}) {
  return (
    <View style={styles.chatRow}>
      <View style={styles.chatIcon}>
        <Ionicons
          name="chatbubble-outline"
          size={18}
          color={colors.primary}
        />
      </View>

      <View style={styles.flex}>
        <View style={styles.titleRow}>
          <Text
            style={styles.chatTitle}
            numberOfLines={1}
          >
            {chat.title}
          </Text>

          {chat.pinned && (
            <Ionicons
              name="pin"
              size={12}
              color={colors.primary}
            />
          )}
        </View>

        <Text
          style={styles.preview}
          numberOfLines={1}
        >
          {chat.preview || 'No messages yet'}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={onPin}
        >
          <Ionicons
            name={
              chat.pinned
                ? 'pin'
                : 'pin-outline'
            }
            size={15}
            color={chat.pinned
              ? colors.primary
              : colors.textMuted}
          />
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={onArchive}
        >
          <Ionicons
            name={
              chat.archived
                ? 'archive'
                : 'archive-outline'
            }
            size={15}
            color={colors.textMuted}
          />
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={onDelete}
        >
          <Ionicons
            name="trash-outline"
            size={15}
            color={colors.textMuted}
          />
        </Pressable>
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

  newButton: {
    height: 46,
    marginTop: 9,
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  newText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
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

  chatRow: {
    minHeight: 70,
    padding: 12,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  chatIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  chatTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 9,
    fontWeight: '800',
  },

  preview: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 4,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
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
