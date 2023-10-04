import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { theme } from "../../Theme/Theme";
import { Button, Input, Text } from 'tamagui';
import { Eye, EyeOff, Aperture } from '@tamagui/lucide-icons';



export function Login() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
                <Input selectionColor={theme.color.black} width={"$20"} placeholder="E-mail" style={{ fontFamily: theme.fontFamily.Regular }} />
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
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
                    alert('Esqueceu sua senha?');
                }} textDecorationLine="underline" >
                    Esqueceu sua senha?
                </Text>
                <Button
                    width="$20"
                    bg={theme.color.black}
                    color={theme.color.white}
                    pressStyle={{ backgroundColor: "$color.gray3Dark" }}
                    style={{ fontFamily: theme.fontFamily.Regular }}
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
                    <Text onPress={() => {
                        alert('Esqueceu sua senha?');
                    }}>
                        Primeira vez?
                    </Text>
                    <Text onPress={() => {
                        alert('Criar uma conta.');
                    }} textDecorationLine="underline" >
                        Criar uma conta.
                    </Text>
                </View>
            </View>
        </View>
    )
}