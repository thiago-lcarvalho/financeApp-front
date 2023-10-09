import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { theme } from "../../Theme/Theme";
import { Button, Input, Text } from 'tamagui';
import { ArrowRight } from '@tamagui/lucide-icons';
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../../url";



export function ForgotPassword() {
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleChangePassword = async () => {
        const name = firstName + " " + lastName;
        const requestBody = {
            email: email,
        };
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/users/recovery-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                navigation.navigate('Login');
            } else {
                const errorResponse = await response.json();
                Alert.alert('Erro', errorResponse.message, [
                    { text: 'OK' },
                ]);
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error("Error:", error);
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
                <Input
                    autoCorrect={false}
                    backgroundColor={"$colorTransparent"}
                    borderRadius={4}
                    selectionColor={theme.color.black}
                    width="$20"
                    placeholder="Primeiro Nome"
                    style={{ fontFamily: theme.fontFamily.Regular }}
                    onChangeText={(text) => { setFirstName(text) }}
                    value={firstName}
                />
                <Input
                    autoCorrect={false}
                    backgroundColor={"$colorTransparent"}
                    borderRadius={4}
                    selectionColor={theme.color.black}
                    width="$20"
                    placeholder="Sobrenome"
                    style={{ fontFamily: theme.fontFamily.Regular }}
                    onChangeText={(text) => { setLastName(text) }}
                    value={lastName}
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