import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native'; 
import { theme } from '../Theme/Theme';
import { Button } from 'tamagui';
import { CalendarRange, ScanFace, ArrowUpCircle, ArrowDownCircle } from '@tamagui/lucide-icons';

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
        justifyContent: 'center',
    }}>
        <View
          style={{justifyContent: 'space-between', flexDirection: 'row', width: '85%', marginTop: 32}}
        >
        <Button bg="$gray2Dark" width="$5" size="$6" icon={<ScanFace color="$yellow10Light" size="$4"/>}/>
        <Button bg="$gray2Dark" width="$5" size="$6" icon={<CalendarRange color="$yellow10Light" size="$4"/>}/>
        </View>
        <View style={{
          height: '70%',
          justifyContent: 'center',
        }}>
          <Text style={{ color: theme.color.yellow ,fontFamily: theme.fontFamily.Regular, fontSize: 56}}>
              {formattedBalance}
          </Text>
        </View>
        <View
          style={{justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginTop: 32}}
        >
        <Button bg="$gray2Dark" size="$7" borderRadius="$10">
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: theme.fontFamily.Regular, color: 'white' }}>
              Despesa
            </Text>
            <ArrowDownCircle color="$orange10Light" size="$4"/>
          </View>
        </Button>
        <Button bg="$gray2Dark" size="$7" borderRadius="$10">
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: theme.fontFamily.Regular, color: 'white' }}>
              Receita
            </Text>
            <ArrowUpCircle color="$green10Dark" size="$4"/>
          </View>
        </Button>
        </View>
      <StatusBar style="light" />
    </View>
  );
}

