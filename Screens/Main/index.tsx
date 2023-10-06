import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import {
  Button, Sheet, Input
} from 'tamagui';
import { CalendarRange, Contact, ArrowUpCircle, ArrowDownCircle, X, Check } from '@tamagui/lucide-icons';
import { useContext, useState } from 'react';
import { theme } from '../../Theme/Theme';
import AuthContext from '../../Contexts/auth';
import { baseUrl } from '../../url';

export function Main() {
  const [loading, setLoading] = useState(false);
  const userData = {
    name: "João",
    lastName: "Pedro",
    email: "joaopedro@email.com",
    currentBalance: 1000.23,
    accountStatus: "active",
    proAccount: true,
    tracking: 'monthly',
    lastBalance: 500.17,

  }
  const balanceStatus = userData.currentBalance > userData.lastBalance ? 'positive' : 'negative';
  const balanceSurplus = Math.round(Math.abs(userData.currentBalance - userData.lastBalance) * 1e2) / 1e2;
  const newBalancePercentage = Math.round(((balanceSurplus / userData.lastBalance) * 100) * 1e2) / 1e2;
  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(userData.currentBalance);

  const [openExpenseSheet, setOpenExpenseSheet] = useState(false);
  const [openIncomeSheet, setOpenIncomeSheet] = useState(false);
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [expenseValue, setExpenseValue] = useState('0');
  const [incomeValue, setIncomeValue] = useState('0');
  const { auth } = useContext(AuthContext)
  let yourDate = new Date()
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
  const date = yourDate.toISOString().split('T')[0]


  const toggleExpenseSheet = () => {
    setOpenExpenseSheet(!openExpenseSheet);
    setInvoiceDescription('');
    setExpenseValue('0');
  };

  const toggleIncomeSheet = () => {
    setOpenIncomeSheet(!openIncomeSheet);
    setInvoiceDescription('');
    setIncomeValue('0');
  };

  const getBalance = async () => {
    const requestBody = {
      userId: auth.id,
    };
    try {
      const response = await fetch(`${baseUrl}/invoices/balance/2`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const parsedData = await response.json()
        if (parsedData.data) {
          Alert.alert('Sucesso', parsedData.message)
        }
      } else {
        const errorResponse = await response.json();
        Alert.alert('Erro', errorResponse.message, [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const sendInvoice = async (type: string) => {
    const requestBody = {
      description: invoiceDescription,
      value: type === 'expense' ? parseFloat(expenseValue) : parseFloat(incomeValue),
      type: type === 'expense' ? 'LOSS' : 'GAIN',
      actionDate: date,
      userId: auth.id,
    };
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const parsedData = await response.json()
        if (parsedData.data) {
          Alert.alert('Sucesso', parsedData.message)
        }
      } else {
        const errorResponse = await response.json();
        Alert.alert('Erro', errorResponse.message, [
          { text: 'OK' },
        ]);
      }
      getBalance()
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }


  const handleNewBalance = (value: string) => {
    const newValue = parseFloat(value);
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(newValue);
    if (openExpenseSheet) {
      sendInvoice('expense')
      setOpenExpenseSheet(false);
    }
    if (openIncomeSheet) {
      sendInvoice('income')
      setOpenIncomeSheet(false);
    }
  }


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
        style={{ justifyContent: 'space-between', flexDirection: 'row', width: '85%', marginTop: 32 }}
      >
        <Button pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" width="$5" size="$6" icon={<Contact color={theme.color.yellow} size="$4" />} />
        <Text style={{ height: 68, color: theme.color.primary, fontFamily: theme.fontFamily.Thin, fontSize: 28 }}>{auth.name}</Text>
        <Button pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" width="$5" size="$6" icon={<CalendarRange color={theme.color.yellow} size="$4" />} />
      </View>
      <View style={{
        height: '70%',
        justifyContent: 'center',
      }}>
        <View style={{
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}>
          <Text style={{ height: 68, color: theme.color.primary, fontFamily: theme.fontFamily.Thin, fontSize: 56 }}>
            {formattedBalance}
          </Text>
          <View style={{
            backgroundColor: theme.color.gray,
            borderRadius: 10,
            paddingHorizontal: 6,
          }}>
            <Text style={{
              color: theme.color[balanceStatus],
              fontSize: 18,
              fontFamily: theme.fontFamily.Thin,
              textAlign: 'center'
            }}>
              {balanceStatus === 'positive' ? '+ ' : '- '}{balanceSurplus}{` (${newBalancePercentage}%)`}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{ justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginTop: 32 }}
      >
        <Sheet
          modal={true}
          open={openExpenseSheet}
          zIndex={100_000}
          animation="medium"
          snapPointsMode="percent"
          snapPoints={[70, 70]}
        >
          <Sheet.Overlay
            animation="lazy"
          />
          <Sheet.Handle />
          <Sheet.Frame padding="$4" justifyContent="flex-start" alignItems="center" space="$5" backgroundColor={theme.color.negative}>
            <Button size="$6" circular icon={X} onPress={() => {
              toggleExpenseSheet()
            }} />
            <Input width={200} placeholder='Descrição' keyboardType='default' keyboardAppearance='dark' value={invoiceDescription} onChangeText={(text) => setInvoiceDescription(text)} />
            <Input width={200} keyboardType='decimal-pad' keyboardAppearance='dark' value={expenseValue} onChangeText={(text) => setExpenseValue(text)} />
            <Button size="$6" circular icon={Check} onPress={() => {
              handleNewBalance(expenseValue)
            }} />
          </Sheet.Frame>
        </Sheet>
        <Sheet
          dismissOnSnapToBottom
          modal={true}
          open={openIncomeSheet}
          zIndex={100_000}
          animation="medium"
          snapPointsMode='percent'
          snapPoints={[70, 70]}
        >
          <Sheet.Overlay
            animation="lazy"
          />
          <Sheet.Handle />
          <Sheet.Frame padding="$4" justifyContent="flex-start" alignItems="center" space="$5" backgroundColor={theme.color.positive}>
            <Button size="$6" circular icon={X} onPress={() => {
              setOpenIncomeSheet(false)
            }} />
            <Input width={200} placeholder='Descrição' keyboardType='default' keyboardAppearance='dark' value={invoiceDescription} onChangeText={(text) => setInvoiceDescription(text)} />
            <Input width={200} keyboardType='decimal-pad' keyboardAppearance='dark' value={incomeValue} onChangeText={(text) => setIncomeValue(text)} />
            <Button size="$6" circular icon={Check} onPress={() => {
              handleNewBalance(incomeValue)
            }} />
          </Sheet.Frame>
        </Sheet>
        <Button onPress={() => {
          toggleExpenseSheet()
        }} pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" h="$8" w="$13" borderRadius="$10" iconAfter={<ArrowDownCircle color={theme.color.negative} size="$4" />}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
              Despesa
            </Text>
          </View>
        </Button>
        <Button onPress={() => {
          toggleIncomeSheet()
        }} pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" h="$8" w="$13" borderRadius="$10" iconAfter={<ArrowUpCircle color={theme.color.positive} size="$4" />}>
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

