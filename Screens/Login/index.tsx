import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { theme } from "../../Theme/Theme";
import { Button, Input } from 'tamagui';
import { Eye, EyeOff } from '@tamagui/lucide-icons';



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
            <View style={{
                flexDirection: 'column',
                gap: 12,
                alignContent: 'center',
            }}>
                <Input width={"$20"} placeholder="E-mail" style={{ fontFamily: theme.fontFamily.Regular }} />
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
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
                            style={{ backgroundColor: 'transparent' }}
                            icon={showPassword ? Eye : EyeOff}
                        />
                    </View>
                </View>
                <Button
                    width="$20"
                    bg="#111111"
                    color="#FFFFFF"
                    style={{ fontFamily: theme.fontFamily.Regular }}
                >
                    Entrar
                </Button>
            </View>
        </View>
    )
}