import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { Button, Sheet, Input, Checkbox, CheckboxProps, Label, XStack, YStack, ToggleGroup } from 'tamagui';
import { CalendarRange, ArrowUpCircle, ArrowDownCircle, X, Check, Settings, Apple, Car, Home, BookOpen, Tv, DollarSign, Activity, Check as CheckIcon, StepBack } from '@tamagui/lucide-icons';
import { useContext, useEffect, useState } from 'react';
import { theme } from '../../Theme/Theme';
import AuthContext, { baseUrl } from "../../Contexts/auth";
import { SettingsMenu, handleLogout } from '../../Components/SettingsMenu';
import { useNavigation } from '@react-navigation/native';
import { CheckboxWithLabel } from '../../Components/CheckboxWithLabel';
import { Invoice, futureInvoiceList } from '../../Components/NextInvoice';

export function History() {
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
    const [invoicesList, setInvoicesList] = useState<any[]>([{}]);
    const navigation = useNavigation<any>()
    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
    const date = yourDate.toISOString().split('T')[0]
    const [category, setCategory] = useState('')
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        futureInvoiceList(auth).then((invoices: Invoice[] | null | undefined) => {
            if (invoices) {
                const futureInvoices = invoices
                setInvoicesList(futureInvoices)
            }
        })
    }, [])

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


    if (loading)
        return (
            <View style={{ backgroundColor: theme.color.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={theme.color.primary} />
            </View>
        );

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.color.yellow,
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
                        () => {
                            navigation.navigate('Main')
                        }
                    } pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" width="$5" size="$6" icon={<StepBack color={theme.color.yellow} size="$4" />} />
                </View>
            </View>
            <View style={{
                height: '73%',
                width: '90%',
                alignItems: 'center',
                gap: 12,
            }}>
                <FlatList
                    data={invoicesList}
                    renderItem={({ item }) => (
                        <Button
                            style={{
                                marginBottom: 12,
                            }}
                            disabled
                            bg="$gray3Dark"
                            h="$8" w={350}
                            borderRadius="$10"
                            iconAfter={
                                item.type === 'LOSS' ?
                                    <ArrowDownCircle color={theme.color.negative} size="$4" />
                                    :
                                    <ArrowUpCircle color={theme.color.positive} size="$4" />
                            }>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
                                    {item.type}
                                </Text>
                            </View>
                        </Button>
                    )}
                />
                {/* <Button onPress={() => {
                }} pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" h="$8" w={350} borderRadius="$10" iconAfter={<ArrowDownCircle color={theme.color.negative} size="$4" />}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
                            Despesa
                        </Text>
                    </View>
                </Button> */}
            </View>
            <StatusBar style="dark" />
        </View >
    );
}

