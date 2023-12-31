import { Auth, baseUrl } from "../../Contexts/auth";
import { Alert } from "react-native";

export interface Invoice {
    id: number;
    type: string;
    actionDate: string;
    description: string;
    value: number;
}

export const futureInvoiceList = async (auth: Auth) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    try {
        const response = await fetch(`${baseUrl}/invoices?year=${year}&month=${month}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const parsedData = data.data.invoices.map((invoice: Invoice) => {
                return {
                    type: invoice.type,
                    actionDate: invoice.actionDate,
                    description: invoice.description,
                    value: invoice.value,
                };
            });
            const futureInvoices = parsedData;
            return futureInvoices;
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
