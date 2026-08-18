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

const tools = [
  ['search', 'Web Search', 'globe-outline'],
  ['document', 'Documents', 'document-text-outline'],
  ['image', 'Image Understanding', 'image-outline'],
  ['calculator', 'Calculator', 'calculator-outline'],
  ['translate', 'Translation', 'language-outline'],
  ['writing', 'Writing Assistant', 'create-outline'],
  ['brainstorm', 'Brainstorm', 'bulb-outline'],
];

export default function KnowledgeScreen({ onNavigate }) {
  const [active, setActive] = useState('search');
  const [query, setQuery] = useState('');
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');
  const [text, setText] = useState('');

  const calculate = () => {
    try {
      const safe = calc.replace(/[^0-9+\-*/().% ]/g, '');
      const value = Function(
        '"use strict"; return (' + safe + ')'
      )();

      setResult(String(value));
    } catch {
      setResult('Invalid expression');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>RELIORA AI</Text>
            <Text style={styles.title}>Knowledge</Text>
            <Text style={styles.subtitle}>
              AI tools for learning and creating
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.toolRow}
        >
          {tools.map(([id, title, icon]) => (
            <Pressable
              key={id}
              onPress={() => setActive(id)}
              style={[
                styles.tool,
                active === id && styles.toolActive,
              ]}
            >
              <Ionicons
                name={icon}
                size={17}
                color={
                  active === id
                    ? '#FFFFFF'
                    : colors.textSecondary
                }
              />

              <Text
                style={[
                  styles.toolText,
                  active === id && styles.toolTextActive,
                ]}
              >
                {title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {active === 'search' && (
          <Card
            icon="globe-outline"
            title="Web Search"
            description="Search and discover information."
          >
            <View style={styles.inputRow}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="What do you want to know?"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />

              <Pressable style={styles.action}>
                <Ionicons
                  name="search"
                  size={20}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>
          </Card>
        )}

        {active === 'document' && (
          <Card
            icon="document-text-outline"
            title="Document Analysis"
            description="Analyze documents with AI."
          >
            <Pressable style={styles.button}>
              <Ionicons
                name="add-circle-outline"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                Add Document
              </Text>
            </Pressable>
          </Card>
        )}

        {active === 'image' && (
          <Card
            icon="image-outline"
            title="Image Understanding"
            description="Understand and analyze images."
          >
            <Pressable style={styles.button}>
              <Ionicons
                name="image-outline"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                Choose Image
              </Text>
            </Pressable>
          </Card>
        )}

        {active === 'calculator' && (
          <Card
            icon="calculator-outline"
            title="Calculator"
            description="Quick calculations."
          >
            <TextInput
              value={calc}
              onChangeText={setCalc}
              placeholder="Example: (25 * 4) + 10"
              placeholderTextColor={colors.textMuted}
              style={styles.inputFull}
              keyboardType="numbers-and-punctuation"
            />

            <Pressable
              style={styles.button}
              onPress={calculate}
            >
              <Text style={styles.buttonText}>
                Calculate
              </Text>
            </Pressable>

            {!!result && (
              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>
                  RESULT
                </Text>

                <Text style={styles.result}>
                  {result}
                </Text>
              </View>
            )}
          </Card>
        )}

        {active === 'translate' && (
          <Card
            icon="language-outline"
            title="Translation"
            description="Translate text between languages."
          >
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Enter text..."
              placeholderTextColor={colors.textMuted}
              style={styles.textArea}
              multiline
            />

            <Pressable style={styles.button}>
              <Ionicons
                name="language-outline"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                Translate
              </Text>
            </Pressable>
          </Card>
        )}

        {active === 'writing' && (
          <Card
            icon="create-outline"
            title="Writing Assistant"
            description="Improve, rewrite and create content."
          >
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="What do you want to write?"
              placeholderTextColor={colors.textMuted}
              style={styles.textArea}
              multiline
            />

            <Pressable style={styles.button}>
              <Ionicons
                name="sparkles-outline"
                size={17}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                Improve with AI
              </Text>
            </Pressable>
          </Card>
        )}

        {active === 'brainstorm' && (
          <Card
            icon="bulb-outline"
            title="Brainstorm"
            description="Capture and develop new ideas."
          >
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="What's your idea?"
              placeholderTextColor={colors.textMuted}
              style={styles.textArea}
              multiline
            />

            <Pressable
              style={styles.button}
              onPress={() => setText('')}
            >
              <Ionicons
                name="bulb-outline"
                size={17}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                Start Brainstorming
              </Text>
            </Pressable>
          </Card>
        )}

        <View style={styles.note}>
          <Ionicons
            name="sparkles"
            size={17}
            color={colors.primary}
          />

          <Text style={styles.noteText}>
            Knowledge tools are ready for the real AI
            integrations that will be connected later.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Card({ icon, title, description, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Ionicons
            name={icon}
            size={20}
            color={colors.primary}
          />
        </View>

        <View style={styles.flex}>
          <Text style={styles.cardTitle}>
            {title}
          </Text>

          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        {children}
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
    paddingBottom: 45,
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

  toolRow: {
    gap: 8,
    paddingVertical: 18,
  },

  tool: {
    minHeight: 43,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  toolActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  toolText: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: '700',
  },

  toolTextActive: {
    color: '#FFFFFF',
  },

  card: {
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  cardHeader: {
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: 'rgba(155,123,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '850',
  },

  description: {
    color: colors.textMuted,
    fontSize: 8,
    lineHeight: 13,
    marginTop: 3,
  },

  cardBody: {
    paddingHorizontal: 17,
    paddingBottom: 17,
  },

  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },

  input: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 13,
    color: colors.text,
    fontSize: 10,
  },

  action: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputFull: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 13,
    color: colors.text,
    fontSize: 11,
  },

  textArea: {
    minHeight: 120,
    borderRadius: 15,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 13,
    color: colors.text,
    fontSize: 10,
    textAlignVertical: 'top',
  },

  button: {
    minHeight: 45,
    marginTop: 9,
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '850',
  },

  resultBox: {
    marginTop: 12,
    padding: 13,
    borderRadius: 15,
    backgroundColor: 'rgba(88,214,163,0.07)',
  },

  resultLabel: {
    color: colors.success,
    fontSize: 7,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  result: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 5,
  },

  note: {
    marginTop: 17,
    padding: 13,
    borderRadius: 15,
    backgroundColor: 'rgba(155,123,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.12)',
    flexDirection: 'row',
    gap: 8,
  },

  noteText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 8,
    lineHeight: 13,
  },
});
