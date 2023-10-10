import { useContext, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { theme } from "../../Theme/Theme";
import { Button, Input, Text } from 'tamagui';
import { ArrowRight } from '@tamagui/lucide-icons';
import { useNavigation } from "@react-navigation/native";
import AuthContext, { baseUrl } from "../../Contexts/auth";


export function ChangePassword() {
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { auth } = useContext(AuthContext)
    const { setAuth } = useContext(AuthContext);
    const handleChangePassword = async () => {
        const requestBody = {
            oldPassword: oldPassword,
            newPassword: newPassword,
        };
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/users/change-password/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Senha alterada com sucesso');
                setAuth({
                    token: '',
                    user: {
                        id: 0,
                        name: '',
                        email: '',
                    },
                });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                const errorResponse = await response.json();
                if (errorResponse.statusCode === 401) {
                    Alert.alert('Erro', errorResponse.message, [
                        { text: 'OK' },
                    ]);
                    setAuth({
                        token: '',
                        user: {
                            id: 0,
                            name: '',
                            email: '',
                        },
                    });
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                    return
                }
                Alert.alert('Erro', errorResponse.message, [
                    { text: 'OK' },
                ]);
                navigation.navigate('Main');
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
                    placeholder="Senha antiga"
                    style={{ fontFamily: theme.fontFamily.Regular }}
                    onChangeText={(text) => { setOldPassword(text) }}
                    value={oldPassword}
                />
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    backgroundColor={"$colorTransparent"}
                    borderRadius={4}
                    selectionColor={theme.color.black}
                    width={"$20"}
                    placeholder="Senha nova"
                    style={{ fontFamily: theme.fontFamily.Regular }}
                    onChangeText={(text) => { setNewPassword(text) }}
                    value={newPassword}
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
                    Alterar senha
                </Button>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    <Text>
                        Manter senha?
                    </Text>
                    <Text onPress={() => {

                        navigation.navigate('Main');
                    }} textDecorationLine="underline" >
                        Voltar
                    </Text>
                </View>
            </View>
        </View>
    )
}