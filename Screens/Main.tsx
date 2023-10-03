import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native'; 
import { theme } from '../Theme/Theme';




export function Main() {

  return (
    <View style={{
        flex: 1,
        backgroundColor: theme.color.background,
        alignItems: 'center',
        justifyContent: 'center'
        }}>
        <Text style={{color: theme.color.primary, fontFamily: theme.fontFamily.Thin, fontSize: 72}}>
          R$8.273,53
        </Text>
      <StatusBar style="auto" />
    </View>
  );
}

