import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { Button, Sheet, Input, Checkbox, CheckboxProps, Label, XStack, YStack, ToggleGroup } from 'tamagui';
import { CalendarRange, ArrowUpCircle, ArrowDownCircle, X, Check, Settings, Apple, Car, Home, BookOpen, Tv, DollarSign, Activity, Check as CheckIcon } from '@tamagui/lucide-icons';
import { useContext, useEffect, useState } from 'react';
import { theme } from '../../Theme/Theme';
import AuthContext, { baseUrl } from "../../Contexts/auth";
import { SettingsMenu, handleLogout } from '../../Components/SettingsMenu';
import { useNavigation } from '@react-navigation/native';
import { CheckboxWithLabel } from '../../Components/CheckboxWithLabel';
import { Invoice, futureInvoiceList } from '../../Components/NextInvoice';

export function Main() {
  const { setAuth, auth } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [openExpenseSheet, setOpenExpenseSheet] = useState(false);
  const [openIncomeSheet, setOpenIncomeSheet] = useState(false);
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [incomeValue, setIncomeValue] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [datedInvoice, setDatedInvoice] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([{}]);
  const [futureInvoice, setFutureInvoice] = useState<any>();
  const navigation = useNavigation<any>()
  let yourDate = new Date()
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
  const date = yourDate.toISOString().split('T')[0]
  const [category, setCategory] = useState('')
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    getCategories()
    getBalance()
  }, [])

  const findNextInvoice = (invoices: Invoice[]) => {
    const currentDate = new Date();
    const futureInvoices = invoices.filter((invoice: Invoice) => {
      const invoiceDate = new Date(invoice.actionDate);
      return invoiceDate > currentDate;
    });
    futureInvoices.sort((a, b) => {
      const dateA = new Date(a.actionDate).getTime();
      const dateB = new Date(b.actionDate).getTime();
      return dateA - dateB;
    });
    return futureInvoices.length > 0 ? futureInvoices[0] : null;
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  }

  const toggleExpenseSheet = () => {
    setOpenExpenseSheet(!openExpenseSheet);
    setInvoiceDescription('');
    setExpenseValue('');
    setCategory('')
    setCategoryName('')
    setCustomDate('')
    setDatedInvoice(false)
  };

  const toggleIncomeSheet = () => {
    setOpenIncomeSheet(!openIncomeSheet);
    setInvoiceDescription('');
    setIncomeValue('');
    setCategory('')
    setCategoryName('')
    setCustomDate('')
    setDatedInvoice(false)
  };

  const getBalance = async () => {
    setLoading(true);
    futureInvoiceList(auth).then((invoices: Invoice[] | null | undefined) => {
      if (invoices) {
        const nextInvoice = findNextInvoice(invoices);
        if (nextInvoice) {
          setFutureInvoice(nextInvoice);
        }
      }
    })
    try {
      const response = await fetch(`${baseUrl}/invoices/balance/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const parsedData = await response.json()
        setCurrentBalance(parsedData.data.balance)
      }
      else if (response.status === 400) {
        const errorResponse = await response.json();
        if (Array.isArray(errorResponse.message)) {
          const errorMessage = `Invalid parameters: ${errorResponse.message.join(', ')}`;
          Alert.alert('Erro', errorMessage, [
            { text: 'OK' },
          ]);
        }
      }
      else {
        const errorResponse = await response.json();
        if (errorResponse.statusCode === 401) {
          Alert.alert('Erro', errorResponse.message, [
            { text: 'OK' },
          ]);
          handleLogout(setAuth, navigation)
          return
        }
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
      actionDate: datedInvoice ? customDate : date,
      userId: auth.user?.id,
      categoryId: category,
    };
    try {
      const response = await fetch(`${baseUrl}/invoices`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const parsedData = await response.json();
        if (parsedData.data) {
          Alert.alert('Sucesso', parsedData.message);
        }
      }
      else if (response.status === 400) {
        const errorResponse = await response.json();
        if (Array.isArray(errorResponse.message)) {
          const errorMessage = `Invalid parameters: ${errorResponse.message.join(', ')}`;
          Alert.alert('Erro', errorMessage, [
            { text: 'OK' },
          ]);
        }
      }
      else {
        const errorResponse = await response.json();
        if (errorResponse.statusCode === 401) {
          Alert.alert('Erro', errorResponse.message, [
            { text: 'OK' },
          ]);
          handleLogout(setAuth, navigation)
          return
        }
        Alert.alert('Erro', errorResponse.message, [
          { text: 'OK' },
        ]);
      }
      getBalance();
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const parsedData = await response.json();
        const tagsData = parsedData.data.categories;
        setCategoriesList(tagsData);
      }
      else if (response.status === 400) {
        const errorResponse = await response.json();
        if (Array.isArray(errorResponse.message)) {
          const errorMessage = `Invalid parameters: ${errorResponse.message.join(', ')}`;
          Alert.alert('Erro', errorMessage, [
            { text: 'OK' },
          ]);
        }
      }
      else {
        const errorResponse = await response.json();
        if (errorResponse.statusCode === 401) {
          Alert.alert('Erro', errorResponse.message, [
            { text: 'OK' },
          ]);
          handleLogout(setAuth, navigation)
          return
        }
        Alert.alert('Erro', errorResponse.message, [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function getIconComponent(iconName: string) {
    switch (iconName) {
      case 'Apple':
        return <Apple />;
      case 'Car':
        return <Car />;
      case 'Home':
        return <Home />;
      case 'BookOpen':
        return <BookOpen />;
      case 'Tv':
        return <Tv />;
      default:
        return null;
    }
  }

  const handleNewBalance = (value: string) => {
    if (datedInvoice && customDate === '') {
      Alert.alert('Erro', 'Data não pode ser vazia em operação agendada');
      return
    }
    if (datedInvoice && category === '') {
      Alert.alert('Erro', 'Categoria não pode ser vazia em operação agendada');
      return
    }
    if (value === '' || value === '0') {
      Alert.alert('Erro', 'Valor não pode ser vazio');
      return
    }
    if (parseFloat(value) < 0) {
      Alert.alert('Erro', 'Valor não pode ser negativo');
      return
    }
    if (openExpenseSheet) {
      sendInvoice('expense')
      setOpenExpenseSheet(false);
    }
    if (openIncomeSheet) {
      sendInvoice('income')
      setOpenIncomeSheet(false);
    }
  }

  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(currentBalance);
  // const balanceStatus = currentBalance > 500 ? 'positive' : 'negative';
  // const balanceSurplus = Math.round(Math.abs(currentBalance - 500) * 1e2) / 1e2;
  // const newBalancePercentage = Math.round(((balanceSurplus / 500) * 100) * 1e2) / 1e2;

  // ! Quando adicionar lastBalance

  function formatRemainingTime() {
    const targetDateStr = futureInvoice?.actionDate
    const targetDate = new Date(targetDateStr);
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();

    if (timeDifference >= 0) {
      const oneDay = 24 * 60 * 60 * 1000;
      const daysRemaining = Math.floor(timeDifference / oneDay);

      if (daysRemaining >= 1) {
        return `em ${daysRemaining} dia${daysRemaining > 1 ? 's' : ''}`;
      } else {
        const hoursRemaining = Math.floor(timeDifference / (60 * 60 * 1000));

        return `em ${hoursRemaining} hora${hoursRemaining > 1 ? 's' : ''}`;
      }
    }
  }
  const remainingTime = formatRemainingTime();

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
        style={{ justifyContent: 'space-between', flexDirection: 'row', width: '85%', height: '15%' }}
      >
        <View
          style={{ justifyContent: 'space-between', flexDirection: 'column', gap: 12 }}
        >
          <Button onPress={
            toggleSettings
          } pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" width="$5" size="$6" icon={<Settings color={theme.color.yellow} size="$4" />} />
          <SettingsMenu visible={settingsVisible} onClose={toggleSettings} />
        </View>
        <Button
          onPress={
            () => navigation.navigate('History')
          }
          pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" width="$5" size="$6" icon={<CalendarRange color={theme.color.yellow} size="$4" />} />
      </View>
      <View style={{
        height: '40%',
        width: '90%',
        marginVertical: 90,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}>
          <Text style={{ height: 68, color: theme.color.primary, fontFamily: theme.fontFamily.Thin, fontSize: 56 }}>
            {formattedBalance}
          </Text>
          {
            futureInvoice &&
            <View style={{
              backgroundColor: theme.color.gray,
              borderRadius: 10,
              paddingHorizontal: 6,
              flexDirection: 'row',
            }}>
              <Text style={{
                color: theme.color.white,
                fontSize: 18,
                fontFamily: theme.fontFamily.Thin,
                textAlign: 'center'
              }}>
                {`${futureInvoice?.description}${remainingTime} `}
              </Text>
              <Text style={{
                color: futureInvoice?.type === 'LOSS' ? theme.color.negative : theme.color.positive,
                fontSize: 18,
                fontFamily: theme.fontFamily.Thin,
                textAlign: 'center'
              }}>
                {`${futureInvoice.type === 'LOSS' ? ' -' : ' +'} R$ ${futureInvoice?.value}`}
              </Text>
            </View>
          }
        </View>
      </View>
      <View
        style={{ justifyContent: 'space-between', flexDirection: 'row', width: '90%', height: '10%', marginTop: 32 }}
      >
        <Sheet
          modal
          open={openExpenseSheet}
          zIndex={100_000}
          animation="medium"
          snapPointsMode="percent"
          onOpenChange={() => {
            setOpenExpenseSheet(false)
          }}
          dismissOnSnapToBottom
          dismissOnOverlayPress
          snapPoints={[80, 80]}
        >
          <Sheet.Overlay
            animation="lazy"
          />
          <Sheet.Handle />
          <Sheet.Frame padding="$4" justifyContent="flex-start" alignItems="center" space="$5" backgroundColor={theme.color.negative}>
            <CheckboxWithLabel datedInvoice={datedInvoice} setDatedInvoice={setDatedInvoice} size="$4" />
            <Button size="$6" circular icon={X} onPress={() => {
              toggleExpenseSheet()
            }} />
            {datedInvoice ?
              <View>
                <Input
                  width={200}
                  value={customDate}
                  onChangeText={(text) => setCustomDate(text)}
                  placeholder="yyyy-mm-dd"
                />
              </View>
              : null
            }
            <Label style={{ fontFamily: theme.fontFamily.Regular, fontSize: 16, color: 'white' }}>
              {categoryName}
            </Label>
            <ToggleGroup
              width={46 * categoriesList.length}
              orientation={'horizontal'}
              type='single'
              disableDeactivation
              backgroundColor={"$colorTransparent"}
            >
              <FlatList
                horizontal
                data={categoriesList}
                renderItem={({ item }) => (
                  <ToggleGroup.Item
                    value={item.name}
                    onPress={() => {
                      setCategory(item.id)
                      setCategoryName(item.name)
                    }}>
                    {getIconComponent(item.icon)}
                  </ToggleGroup.Item>
                )}
              />
            </ToggleGroup>
            <Input width={200} style={{ fontFamily: theme.fontFamily.Regular }} placeholder='Descrição' keyboardType='default' keyboardAppearance='dark' value={invoiceDescription} onChangeText={(text) => setInvoiceDescription(text)} />
            <View style={{ flexDirection: 'row' }}>
              <Input
                placeholder='Valor'
                paddingLeft={40}
                width={200}
                style={{ fontFamily: theme.fontFamily.Regular }}
                keyboardType='decimal-pad'
                keyboardAppearance='dark'
                value={expenseValue}
                onChangeText={(text) => setExpenseValue(text)}
              />
              <Button
                position='absolute'
                left={0}
                disabled
                color={theme.color.black}
                style={{
                  fontFamily: theme.fontFamily.Regular,
                  backgroundColor: 'transparent',
                }}
              >
                R$
              </Button>
            </View>
            <Button size="$6" circular icon={Check} onPress={() => {
              handleNewBalance(expenseValue)
            }} />
          </Sheet.Frame>
        </Sheet>
        <Sheet
          modal
          open={openIncomeSheet}
          zIndex={100_000}
          animation="medium"
          snapPointsMode='percent'
          onOpenChange={() => {
            setOpenIncomeSheet(false)
          }}
          dismissOnSnapToBottom
          dismissOnOverlayPress
          snapPoints={[80, 80]}
        >
          <Sheet.Overlay
            animation="lazy"
          />
          <Sheet.Handle />
          <Sheet.Frame padding="$4" justifyContent="flex-start" alignItems="center" space="$5" backgroundColor={theme.color.positive}>
            <CheckboxWithLabel datedInvoice={datedInvoice} setDatedInvoice={setDatedInvoice} size="$4" />
            <Button size="$6" circular icon={X} onPress={() => {
              toggleIncomeSheet()
            }} />
            {datedInvoice ?
              <View>
                <Input
                  width={200}
                  value={customDate}
                  onChangeText={(text) => setCustomDate(text)}
                  placeholder="yyyy-mm-dd"
                />
              </View>
              : null
            }
            <Label style={{ fontFamily: theme.fontFamily.Regular, fontSize: 16, color: 'white' }}>
              {categoryName}
            </Label>
            <ToggleGroup
              width={46 * categoriesList.length}
              orientation={'horizontal'}
              type='single'
              disableDeactivation
              backgroundColor={"$colorTransparent"}
            >
              <FlatList
                horizontal
                data={categoriesList}
                renderItem={({ item }) => (
                  <ToggleGroup.Item
                    value={item.name}
                    onPress={() => {
                      setCategory(item.id)
                      setCategoryName(item.name)
                    }}>
                    {getIconComponent(item.icon)}
                  </ToggleGroup.Item>
                )}
              />
            </ToggleGroup>
            <Input width={200} style={{ fontFamily: theme.fontFamily.Regular }} placeholder='Descrição' keyboardType='default' keyboardAppearance='dark' value={invoiceDescription} onChangeText={(text) => setInvoiceDescription(text)} />
            <View style={{ flexDirection: 'row' }}>
              <Input
                placeholder='Valor'
                paddingLeft={40}
                width={200}
                style={{
                  fontFamily: theme.fontFamily.Regular
                }}
                keyboardType='decimal-pad'
                keyboardAppearance='dark'
                value={incomeValue} onChangeText={
                  (text) => {
                    setIncomeValue(text)
                  }
                }
              />
              <Button
                position='absolute'
                left={0}
                disabled
                color={theme.color.black}
                style={{
                  fontFamily: theme.fontFamily.Regular,
                  backgroundColor: 'transparent',
                }}
              >
                R$
              </Button>
            </View>
            <Button size="$6" circular icon={Check} onPress={() => {
              handleNewBalance(incomeValue)
            }} />
          </Sheet.Frame>
        </Sheet >
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
      </View >
      <StatusBar style="dark" />
    </View >
  );
}

