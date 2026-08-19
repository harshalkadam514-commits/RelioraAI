import React, { useEffect, useState } from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './src/screens/AuthScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const screenLoaders = {
  home: () => require('./src/screens/HomeScreen').default,
  chat: () => require('./src/screens/ChatScreen').default,
  journal: () => require('./src/screens/JournalScreen').default,
  goals: () => require('./src/screens/GoalsScreen').default,
  insights: () => require('./src/screens/InsightsScreen').default,
  profile: () => require('./src/screens/ProfileScreen').default,
  knowledge: () => require('./src/screens/KnowledgeScreen').default,
  settings: () => require('./src/screens/SettingsScreen').default,
  memory: () => require('./src/screens/MemoryScreen').default,
  mood: () => require('./src/screens/MoodScreen').default,
  voice: () => require('./src/screens/VoiceScreen').default,
  personalization: () => require('./src/screens/PersonalizationScreen').default,
  productivity: () => require('./src/screens/ProductivityScreen').default,
  notifications: () => require('./src/screens/NotificationsScreen').default,
  analytics: () => require('./src/screens/AnalyticsScreen').default,
  premium: () => require('./src/screens/PremiumScreen').default,
  privacy: () => require('./src/screens/PrivacyScreen').default,
  chatHistory: () => require('./src/screens/ChatHistoryScreen').default,
  savedMessages: () => require('./src/screens/SavedMessagesScreen').default,
  security: () => require('./src/screens/SecurityScreen').default,
};

export default function App() {
  const [stage, setStage] = useState('auth');
  const [currentScreen, setCurrentScreen] = useState('home');

  useEffect(() => {
    if (stage !== 'main') {
      return;
    }

    const handleBackPress = () => {
      if (currentScreen !== 'home') {
        setCurrentScreen('home');
        return true;
      }

      return false;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => subscription.remove();
  }, [stage, currentScreen]);

  const handleAuthDone = () => {
    setStage('onboarding');
  };

  const handleOnboardingDone = () => {
    setStage('main');
  };

  const navigate = (screen) => {
    if (screen === 'logout') {
      setStage('auth');
      return;
    }

    if (screenLoaders[screen]) {
      setCurrentScreen(screen);
    }
  };

  if (stage === 'auth') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <AuthScreen onNavigate={handleAuthDone} />
      </View>
    );
  }

  if (stage === 'onboarding') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <OnboardingScreen onNavigate={handleOnboardingDone} />
      </View>
    );
  }

  const loadScreen = screenLoaders[currentScreen];
  const Screen = loadScreen ? loadScreen() : screenLoaders.home();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Screen onNavigate={navigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07070A',
  },
});
