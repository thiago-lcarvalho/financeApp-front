import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, Text, View } from 'react-native'; 
import { Button, Sheet } from 'tamagui';
import { CalendarRange, Contact, ArrowUpCircle, ArrowDownCircle, X, Check } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { theme } from '../Theme/Theme';

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
    currency: 'BRL',
  }

  const balanceStatus = userData.currentBalance > userData.lastBalance ? 'positive' : 'negative';
  const balanceSurplus = Math.round(Math.abs(userData.currentBalance - userData.lastBalance) * 1e2) / 1e2;
  const newBalancePercentage = Math.round(((balanceSurplus / userData.lastBalance) * 100) * 1e2) / 1e2;
  const formattedBalance = new Intl.NumberFormat().format(userData.currentBalance);

  const [openExpenseSheet, setOpenExpenseSheet] = useState(false);
  const [openIncomeSheet, setOpenIncomeSheet] = useState(false);
  const [expenseValue, setExpenseValue] = useState(0);
  const [incomeValue, setIncomeValue] = useState(0);

  const handleInputChange = (text: any) => {
    const newValue = parseFloat(text);
    if (isNaN(newValue)) return;
    if (openExpenseSheet) setExpenseValue(newValue);
    if (openIncomeSheet) setIncomeValue(newValue);
  };

  const toggleExpenseSheet = () => {
    setOpenExpenseSheet(!openExpenseSheet);
  };

  const toggleIncomeSheet = () => {
    setOpenIncomeSheet(!openIncomeSheet);
  };

  const handleExpense = () => {
    console.log('expense');
    Alert.alert('Despesa', `Lets go so falta implementar!`);
    toggleExpenseSheet()
  }

  const handleIncome = () => {
    console.log('income');
    Alert.alert('Receita', `Lets go so falta implementar!`);
    toggleIncomeSheet()
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
          style={{justifyContent: 'space-between', flexDirection: 'row', width: '85%', marginTop: 32}}
        >
        <Button pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" width="$5" size="$6" icon={<Contact color="$yellow10Light" size="$4"/>}/>
        <Button pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" width="$5" size="$6" icon={<CalendarRange color="$yellow10Light" size="$4"/>}/>
        </View>
        <View style={{
          height: '70%',
          justifyContent: 'center',
        }}>
           <View style={{
            backgroundColor: theme.color.gray,
            borderRadius: 10,
            paddingHorizontal: 10,
            alignSelf: 'flex-start',
          }}>
              <Text style={{
                color: theme.color.background,
                fontSize: 16,
                fontFamily: theme.fontFamily.Thin,
                textAlign: 'left'
              }}>
                {userData.currency}
              </Text>
          </View>
          <View style={{
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}>
          <Text style={{ color: theme.color.primary ,fontFamily: theme.fontFamily.Thin, fontSize: 80}}>
              {formattedBalance}
          </Text>
          <View style={{
            backgroundColor: theme.color.gray,
            borderRadius: 10,
            paddingHorizontal: 6,
          }}>
              <Text style={{
                color: theme.color[balanceStatus],
                fontSize: 16,
                fontFamily: theme.fontFamily.Thin,
                textAlign: 'center'
              }}>
                {balanceStatus === 'positive' ? '+ ' : '- '}{balanceSurplus}{` (${newBalancePercentage}%)`}
              </Text>
          </View>
          </View>
        </View>
        <View
          style={{justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginTop: 32}}
        >
        <Sheet
        dismissOnSnapToBottom
        modal={true}
        open={openExpenseSheet}
        zIndex={100_000}
        animation="medium"
        snapPointsMode='percent'
        snapPoints={[40, 40]}
        >
          <Sheet.Overlay
            animation="lazy"
          />
          <Sheet.Handle />
            <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$5" backgroundColor={'#EF8354'}>
            <Button size="$6" circular icon={X} onPress={() => {
              toggleExpenseSheet()
              }} />
            {/* <Input width={200} keyboardType='decimal-pad' keyboardAppearance='dark' value={String(expenseValue)} onChangeText={handleInputChange} /> */}
          <Button size="$6" circular icon={Check} onPress={() => {
              handleExpense()
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
        snapPoints={[40, 40]}
        >
          <Sheet.Overlay
            animation="lazy"
          />
          <Sheet.Handle />
            <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$5" backgroundColor={'#B5F500'}>
            <Button size="$6" circular icon={X} onPress={() => {
              toggleIncomeSheet()
              }}/>
            {/* <Input width={200} keyboardType='decimal-pad' keyboardAppearance='dark' value={String(incomeValue)} onChangeText={handleInputChange}/> */}
            <Button size="$6" circular icon={Check} onPress={() => {
              handleIncome()
              toggleIncomeSheet()
              }} />
            </Sheet.Frame>
        </Sheet>
          <Button onPress={() => {
            toggleExpenseSheet()
            }} pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" h="$8" w="$13" borderRadius="$10" iconAfter={<ArrowDownCircle color="$orange10Light" size="$4"/>}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
                Despesa
              </Text>
            </View>
          </Button>
        <Button onPress={() => {
          toggleIncomeSheet()
        }} pressStyle={{backgroundColor: '$gray1Dark'}} bg="$gray3Dark" h="$8" w="$13" borderRadius="$10" iconAfter={<ArrowUpCircle color="$green10Dark" size="$4"/>}>
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

