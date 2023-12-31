import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { theme } from './Theme/Theme';
import * as Font from 'expo-font';
import { TamaguiProvider, Spinner } from 'tamagui'
import config from './tamagui.config'
import { Routes } from './Routes';
import "./Config/Reactotron";
import { AuthContextProvider } from './Contexts/auth';

const Regular = require('./Theme/Fonts/SourceSans3-Medium.ttf');
const Thin = require('./Theme/Fonts/SourceSans3-Light.ttf');
const Bold = require('./Theme/Fonts/SourceSans3-Bold.ttf');

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SourceSans3-Medium': Regular,
        'SourceSans3-Light': Thin,
        'SourceSans3-Bold': Bold,
      });

      setLoading(false);
    }

    loadFonts();
  }, []);

  if (loading)
    return (
      <View style={{ backgroundColor: theme.color.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={theme.color.primary} />
      </View>
    );

  return (
    <TamaguiProvider config={config}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </TamaguiProvider>
  );
}
