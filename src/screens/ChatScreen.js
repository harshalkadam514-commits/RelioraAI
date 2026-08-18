import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { usePersonalization } from '../store/personalizationStore';
import { usePrivacy } from '../store/privacyStore';
import {
  useChatStore,
  addMessage,
} from '../store/chatStore';
import {
  useSavedMessages,
  saveMessage,
  removeSavedMessage,
} from '../store/savedMessagesStore';

const suggestions = [
  'How can you help me today?',
  'I need someone to talk to',
  'Help me plan my day',
  'Help me study',
];

export default function ChatScreen({ onNavigate }) {
  const [text, setText] = useState('');
  const { messages } = useChatStore();
  const { settings } = usePersonalization();
  const { privacy } = usePrivacy();
  const { savedMessages } = useSavedMessages();

  const sendMessage = (value = text) => {
    const clean = value.trim();
    if (!clean) return;

    addMessage({
      type: 'user',
      text: clean,
    });

    addMessage({
      type: 'ai',
      text: "I'm listening. Tell me a little more and we'll figure it out together.",
    });

    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#151126', '#07070A']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => onNavigate?.('home')}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerCenter}>
          <View style={styles.statusOrb}>
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          </View>

          <View>
            <Text style={styles.headerTitle}>{settings.companionName}</Text>
            <Text style={styles.online}>● Online</Text>
          </View>
        </View>

        <Pressable style={styles.headerButton}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#A7A9B4" />
        </Pressable>
      </View>

      <View style={styles.modeBar}>
        <Ionicons name="people-outline" size={17} color={colors.primary} />
        <Text style={styles.modeText}>{settings.relationship} mode</Text>
        <View style={styles.modeDot} />
        <Text style={styles.memoryText}>Memory {privacy.memory ? "on" : "off"}</Text>
      </View>

      <ScrollView
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.type === 'user' && styles.userRow,
            ]}
          >
            {message.type === 'ai' && (
              <View style={styles.aiMiniOrb}>
                <Ionicons name="sparkles" size={13} color="#FFFFFF" />
              </View>
            )}

            <View>
              <View
                style={[
                  styles.bubble,
                  message.type === 'user'
                    ? styles.userBubble
                    : styles.aiBubble,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>

              {message.type === 'ai' && (
                <Pressable
                  style={styles.saveMessageButton}
                  onPress={() => {
                    const saved = savedMessages.find(
                      (item) => item.text === message.text
                    );

                    if (saved) {
                      removeSavedMessage(saved.id);
                    } else {
                      saveMessage({
                        chatId: 'default-chat',
                        text: message.text,
                        role: 'assistant',
                      });
                    }
                  }}
                >
                  <Ionicons
                    name={
                      savedMessages.some(
                        (item) => item.text === message.text
                      )
                        ? 'bookmark'
                        : 'bookmark-outline'
                    }
                    size={15}
                    color={colors.primary}
                  />
                </Pressable>
              )}
            </View>
          </View>
        ))}

        <View style={styles.thinking}>
          <View style={styles.thinkingOrb}>
            <Ionicons name="sparkles" size={12} color={colors.primary} />
          </View>
          <Text style={styles.thinkingText}>Reliora is ready</Text>
        </View>

        <Text style={styles.suggestionTitle}>Try asking</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestions}
        >
          {suggestions.map((suggestion) => (
            <Pressable
              key={suggestion}
              style={styles.suggestion}
              onPress={() => sendMessage(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.inputArea}>
        <Pressable style={styles.attach}>
          <Ionicons name="add" size={23} color="#A7A9B4" />
        </Pressable>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Message Reliora..."
          placeholderTextColor="#686B78"
          style={styles.input}
          multiline
          maxLength={4000}
        />

        <Pressable style={styles.voice}>
          <Ionicons name="mic-outline" size={21} color="#A7A9B4" />
        </Pressable>

        <Pressable style={styles.send} onPress={() => sendMessage()}>
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            style={styles.sendGradient}
          >
            <Ionicons name="arrow-up" size={21} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  back: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  statusOrb: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },

  online: {
    color: colors.success,
    fontSize: 10,
    marginTop: 2,
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modeBar: {
    marginHorizontal: 18,
    marginTop: 13,
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 13,
    backgroundColor: 'rgba(155,123,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.13)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  modeText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 7,
  },

  modeDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
    marginHorizontal: 9,
  },

  memoryText: {
    color: colors.textMuted,
    fontSize: 10,
  },

  messages: {
    flex: 1,
  },

  messagesContent: {
    padding: 18,
    paddingBottom: 20,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
    gap: 8,
  },

  userRow: {
    justifyContent: 'flex-end',
  },

  aiMiniOrb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
  },

  aiBubble: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },

  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 5,
  },

  messageText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
  },

  thinking: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 25,
    gap: 8,
  },

  thinkingOrb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(155,123,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  thinkingText: {
    color: colors.textMuted,
    fontSize: 11,
  },

  suggestionTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 10,
  },

  suggestions: {
    gap: 8,
    paddingBottom: 8,
  },

  suggestion: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  suggestionText: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  saveMessageButton: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 4,
    padding: 5,
  },

  inputArea: {
    marginHorizontal: 14,
    marginBottom: 14,
    minHeight: 58,
    borderRadius: 20,
    paddingHorizontal: 7,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  attach: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    maxHeight: 100,
    paddingHorizontal: 4,
    paddingVertical: 10,
  },

  voice: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  send: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },

  sendGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
