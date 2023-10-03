import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native'; 
import { theme } from '../Theme/Theme';




export function Main() {

  const userData = {
    name: "João",
    lastName: "Pedro",
    email: "joaopedro@email.com",
    currentBalance: 8273.53,
    accountStatus: "active",
    proAccount: true,
  }

  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(userData.currentBalance);

  return (
    <View style={{
        flex: 1,
        backgroundColor: theme.color.background,
        alignItems: 'center',
        justifyContent: 'center'
        }}>
        <Text style={{color: theme.color.primary, fontFamily: theme.fontFamily.Regular, fontSize: 72}}>
            {formattedBalance}
        </Text>
      <StatusBar style="auto" />
    </View>
  );
}

