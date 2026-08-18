import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AuthScreen from './src/screens/AuthScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import JournalScreen from './src/screens/JournalScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import KnowledgeScreen from './src/screens/KnowledgeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MemoryScreen from './src/screens/MemoryScreen';
import MoodScreen from './src/screens/MoodScreen';
import VoiceScreen from './src/screens/VoiceScreen';
import PersonalizationScreen from './src/screens/PersonalizationScreen';
import ProductivityScreen from './src/screens/ProductivityScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import PremiumScreen from './src/screens/PremiumScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import ChatHistoryScreen from './src/screens/ChatHistoryScreen';
import SavedMessagesScreen from './src/screens/SavedMessagesScreen';
import SecurityScreen from './src/screens/SecurityScreen';

const mainScreens = {
  home: HomeScreen,
  chat: ChatScreen,
  journal: JournalScreen,
  goals: GoalsScreen,
  insights: InsightsScreen,
  profile: ProfileScreen,
  knowledge: KnowledgeScreen,
  settings: SettingsScreen,
  memory: MemoryScreen,
  mood: MoodScreen,
  voice: VoiceScreen,
  personalization: PersonalizationScreen,
  productivity: ProductivityScreen,
  notifications: NotificationsScreen,
  analytics: AnalyticsScreen,
  premium: PremiumScreen,
  privacy: PrivacyScreen,
  chatHistory: ChatHistoryScreen,
  savedMessages: SavedMessagesScreen,
  security: SecurityScreen,
};

export default function App() {
  const [stage, setStage] = useState('auth');
  const [currentScreen, setCurrentScreen] = useState('home');

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
    if (mainScreens[screen]) {
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

  const Screen = mainScreens[currentScreen] || HomeScreen;

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
