import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native'; 
import { Button } from 'tamagui';
import { CalendarRange, ScanFace, ArrowUpCircle, ArrowDownCircle } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { theme } from '../Theme/Theme';

export function Main() {
  const [loading, setLoading] = useState(false);
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


  if (loading)
		return (
			<View style={{ backgroundColor: theme.color.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size={'large'} color={theme.color.primary} />
			</View>
		);

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
        <Button pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" width="$5" size="$6" icon={<ScanFace color="$yellow10Light" size="$4"/>}/>
        <Button pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" width="$5" size="$6" icon={<CalendarRange color="$yellow10Light" size="$4"/>}/>
        </View>
        <View style={{
          height: '70%',
          justifyContent: 'center',
        }}>
          <Text style={{ color: theme.color.primary ,fontFamily: theme.fontFamily.Thin, fontSize: 56}}>
              {formattedBalance}
          </Text>
        </View>
        <View
          style={{justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginTop: 32}}
        >
        <Button pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" h="$8" w="$13" borderRadius="$10" iconAfter={<ArrowDownCircle color="$orange10Light" size="$4"/>}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
              Despesa
            </Text>
          </View>
        </Button>
        <Button pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" h="$8" w="$13" borderRadius="$10" iconAfter={<ArrowUpCircle color="$green10Dark" size="$4"/>}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
              Receita
            </Text>
          </View>
        </Button>
        </View>
      <StatusBar style="light" />
    </View>
  );
}

