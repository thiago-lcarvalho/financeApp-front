import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'; 

import { SourceSansPro_200ExtraLight, SourceSansPro_400Regular, useFonts } from '@expo-google-fonts/source-sans-pro';
import { useState } from 'react';
import { theme } from './Theme/Theme';
import { Main } from './Screens/Main';




export default function App() {

const [loading, setLoading] = useState<boolean>(false)

useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_400Regular,
  });

  if (loading)
		return (
			<View style={{ backgroundColor: theme.color.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size={'large'} color={theme.color.primary} />
			</View>
		);

  return (
    <Main/>
  );
}

