import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { theme } from "../../Theme/Theme";
import { Button, Input, Text } from 'tamagui';
import { Eye, EyeOff, Aperture, ArrowRight } from '@tamagui/lucide-icons';
import { useNavigation } from "@react-navigation/native";
import AuthContext, { baseUrl } from "../../Contexts/auth";



export function Login() {
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth, auth } = useContext(AuthContext)

    const handleLogin = async () => {
        const requestBody = {
            email: email,
            password: password,
        };
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const parsedData = await response.json()
                if (parsedData.data) {
                    setAuth(parsedData.data)
                }

                navigation.navigate('Main');
            } else {
                const errorResponse = await response.json();
                Alert.alert('Erro', errorResponse.message, [
                    { text: 'OK' },
                ]);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            Alert.alert('Erro', 'Ocorreu um erro ao fazer login, tente novamente.', [
                { text: 'OK' },
            ]);
        }
    };

    useEffect(() => {
        if (auth.token) {
            navigation.navigate('Main');
        }
    }, [auth])

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
            <Button size={"$10"} transparent disabled icon={Aperture} />
            <View style={{
                flexDirection: 'column',
                gap: 12,
                alignContent: 'center',
            }}>
                <Input
                    onChangeText={(text) => { setEmail(text) }}
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    backgroundColor={"$colorTransparent"}
                    borderRadius={4}
                    selectionColor={theme.color.black}
                    width={"$20"}
                    placeholder="E-mail"
                    style={{ fontFamily: theme.fontFamily.Regular }}
                />
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            onChangeText={(text) => { setPassword(text) }}
                            value={password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            backgroundColor={"$colorTransparent"}
                            borderRadius={4}
                            selectionColor={theme.color.black}
                            width="$20"
                            secureTextEntry={!showPassword}
                            placeholder="Senha"
                            maxLength={20}
                            style={{ fontFamily: theme.fontFamily.Regular }}
                        />
                        <Button
                            onPress={() => {
                                setShowPassword(!showPassword);
                            }}
                            position="absolute"
                            right={0}
                            width={"$1"}
                            style={{ backgroundColor: 'transparent', }}
                            icon={showPassword ? Eye : EyeOff}
                        />
                    </View>
                </View>
                <Text onPress={() => {

                    navigation.navigate('ForgotPassword');
                }} textDecorationLine="underline" >
                    Esqueceu sua senha?
                </Text>
                <Button
                    borderRadius={4}
                    width="$20"
                    bg={theme.color.black}
                    color={theme.color.white}
                    pressStyle={{ backgroundColor: "$color.gray3Dark" }}
                    style={{ fontFamily: theme.fontFamily.Bold, fontSize: 16 }}
                    iconAfter={<ArrowRight size={"$1"} />}
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    Entrar
                </Button>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    <Text>
                        Primeira vez?
                    </Text>
                    <Text onPress={() => {

                        navigation.navigate('Register');
                    }} textDecorationLine="underline" >
                        Criar uma conta.
                    </Text>
                </View>
            </View>
        </View>
    )
}