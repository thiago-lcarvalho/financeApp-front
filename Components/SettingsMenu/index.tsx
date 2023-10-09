import { useNavigation } from "@react-navigation/native";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { Button, Separator, YGroup } from "tamagui";
import { theme } from "../../Theme/Theme";
import { LogOut, PersonStanding, Star } from "@tamagui/lucide-icons";
import { useContext } from "react";
import AuthContext from "../../Contexts/auth";

export const SettingsMenu: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
    const navigation = useNavigation<any>()
    const { setAuth } = useContext(AuthContext);
    const handleLogout = () => {
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
        onClose();
    };

    return (
        <Modal transparent visible={visible} animationType='fade' >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '85%' }}>
                    <View style={{ backgroundColor: 'transparent', borderRadius: 10, paddingTop: 30 }}>
                        <YGroup separator={<Separator />} alignSelf="center" bordered width={240} size="$6">
                            <YGroup.Item>
                                <Button onPress={() => {
                                    navigation.navigate('ChangePassword');
                                    onClose();
                                }} pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" borderRadius="$10" iconAfter={<PersonStanding color={theme.color.yellow} />}>
                                    <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
                                        Alterar senha
                                    </Text>
                                </Button>
                            </YGroup.Item>
                            <YGroup.Item>
                                <Button onPress={() => {
                                }} pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$blue6Dark" borderRadius="$10" iconAfter={<Star color='#53A9FF' />}>
                                    <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
                                        Pro +
                                    </Text>
                                </Button>
                            </YGroup.Item>
                            <YGroup.Item>
                                <Button onPress={() => {
                                    handleLogout()
                                }} pressStyle={{ backgroundColor: '$gray1Dark' }} bg="$gray3Dark" borderRadius="$10" iconAfter={<LogOut color={theme.color.yellow} />}>
                                    <Text style={{ fontSize: 16, fontFamily: theme.fontFamily.Regular, color: 'white' }}>
                                        Sair
                                    </Text>
                                </Button>
                            </YGroup.Item>
                        </YGroup>
                    </View>
                </View>
                <View style={{
                    height: '40%',
                    width: '90%',
                    marginVertical: 90,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} />
            </TouchableOpacity>
        </Modal>

    );
};