import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { theme } from "../../Theme/Theme";
import { Button, Input, Text } from 'tamagui';
import { ArrowRight } from '@tamagui/lucide-icons';



export function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


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
                        alert('Criar uma conta.');
                    }} textDecorationLine="underline" >
                        Entrar.
                    </Text>
                </View>
            </View>
        </View>
    )
}