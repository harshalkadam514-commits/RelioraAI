import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useAuth } from '../store/authStore';

export default function AuthScreen({ onNavigate }) {
  const { login, signup } = useAuth();

  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      return;
    }

    if (isLogin) {
      login(email.trim());
    } else {
      signup(name.trim(), email.trim());
    }

    onNavigate?.('home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoWrap}>
          <View style={styles.logoIcon}>
            <Ionicons
              name="sparkles"
              size={29}
              color={colors.primary}
            />
          </View>

          <Text style={styles.logo}>
            RELIORA
          </Text>

          <Text style={styles.tagline}>
            Your personal AI companion
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            {isLogin
              ? 'Welcome back'
              : 'Create your account'}
          </Text>

          <Text style={styles.subtitle}>
            {isLogin
              ? 'Continue your journey with Reliora.'
              : 'Start building a more personal AI experience.'}
          </Text>

          {!isLogin && (
            <>
              <Text style={styles.label}>
                Name
              </Text>

              <View style={styles.inputWrap}>
                <Ionicons
                  name="person-outline"
                  size={17}
                  color={colors.textMuted}
                />

                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name"
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>
            </>
          )}

          <Text style={styles.label}>
            Email
          </Text>

          <View style={styles.inputWrap}>
            <Ionicons
              name="mail-outline"
              size={17}
              color={colors.textMuted}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.label}>
            Password
          </Text>

          <View style={styles.inputWrap}>
            <Ionicons
              name="lock-closed-outline"
              size={17}
              color={colors.textMuted}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={handleSubmit}
          >
            <Text style={styles.primaryText}>
              {isLogin
                ? 'Sign In'
                : 'Create Account'}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={17}
              color="#FFFFFF"
            />
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>
              OR
            </Text>
            <View style={styles.line} />
          </View>

          <Pressable style={styles.secondaryButton}>
            <Ionicons
              name="logo-google"
              size={17}
              color={colors.text}
            />

            <Text style={styles.secondaryText}>
              Continue with Google
            </Text>
          </Pressable>

          <Pressable
            style={styles.modeButton}
            onPress={() =>
              setMode(isLogin ? 'signup' : 'login')
            }
          >
            <Text style={styles.modeText}>
              {isLogin
                ? "Don't have an account?"
                : 'Already have an account?'}
            </Text>

            <Text style={styles.modeAction}>
              {isLogin
                ? ' Create one'
                : ' Sign in'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.security}>
          <Ionicons
            name="shield-checkmark-outline"
            size={14}
            color={colors.textMuted}
          />

          <Text style={styles.securityText}>
            Your account data will be protected by the
            secure authentication layer during backend
            integration.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 35,
    justifyContent: 'center',
  },

  logoWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logoIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: 'rgba(155,123,255,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(155,123,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 10,
  },

  tagline: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 5,
  },

  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
  },

  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 16,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },

  inputWrap: {
    height: 46,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 0,
  },

  primaryButton: {
    height: 48,
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginVertical: 16,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },

  secondaryButton: {
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  secondaryText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },

  modeButton: {
    marginTop: 17,
    alignItems: 'center',
  },

  modeText: {
    color: colors.textMuted,
    fontSize: 13,
  },

  modeAction: {
    color: colors.primary,
    fontWeight: '800',
  },

  security: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5,
    marginTop: 16,
    paddingHorizontal: 12,
  },

  securityText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
});
