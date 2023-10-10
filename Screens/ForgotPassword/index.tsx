import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { theme } from "../../Theme/Theme";
import { Button, Input, Text } from 'tamagui';
import { ArrowRight } from '@tamagui/lucide-icons';
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../../Contexts/auth";


export function ForgotPassword() {
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleChangePassword = async () => {
        const requestBody = {
            email: email,
        };
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/users/recovery-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok || response.status === 404) {
                Alert.alert('Ok!', 'E-mail enviado.', [
                    { text: 'OK' },
                ]);
                setLoading(false);
                navigation.navigate('Login');
            }
            else if (response.status === 400) {
                const errorResponse = await response.json();
                if (Array.isArray(errorResponse.message)) {
                    const errorMessage = `Invalid parameters: ${errorResponse.message.join(', ')}`;
                    Alert.alert('Erro', errorMessage, [
                        { text: 'OK' },
                    ]);
                } else {
                    Alert.alert('Erro', 'An error occurred.', [
                        { text: 'OK' },
                    ]);
                }
                setLoading(false);
            }
        } catch (error) {
            console.error('Network Error:', error);
            setLoading(false);
            Alert.alert('Erro', 'Ocorreu um erro ao fazer login, tente novamente.', [
                { text: 'OK' },
            ]);
        } finally {
            setLoading(false);
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
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                flexDirection: 'column',
                gap: 12,
                alignContent: 'center',
            }}>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    backgroundColor={"$colorTransparent"}
                    borderRadius={4}
                    selectionColor={theme.color.black}
                    width={"$20"}
                    placeholder="E-mail"
                    style={{ fontFamily: theme.fontFamily.Regular }}
                    onChangeText={(text) => { setEmail(text) }}
                    value={email}
                />
                <Button
                    borderRadius={4}
                    width="$20"
                    bg={theme.color.black}
                    color={theme.color.white}
                    pressStyle={{ backgroundColor: "$color.gray3Dark" }}
                    style={{ fontFamily: theme.fontFamily.Regular, fontSize: 16 }}
                    iconAfter={<ArrowRight size={"$1"} />}
                    onPress={handleChangePassword}
                >
                    Recuperar senha
                </Button>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    <Text>
                        Já tem uma conta?
                    </Text>
                    <Text onPress={() => {

                        navigation.navigate('Login');
                    }} textDecorationLine="underline" >
                        Entrar.
                    </Text>
                </View>
            </View>
        </View>
    )
}