import { Checkbox, CheckboxProps, Label, XStack } from "tamagui"
import { theme } from "../../Theme/Theme"
import { Check as CheckIcon } from '@tamagui/lucide-icons';

interface CheckboxWithLabelProps extends CheckboxProps {
    label?: string
    datedInvoice: boolean
    setDatedInvoice: (checked: boolean) => void
}

export function CheckboxWithLabel({
    setDatedInvoice,
    size,
    label = 'Agendar',
    datedInvoice,
    ...checkboxProps
}: CheckboxWithLabelProps) {
    return (
        <XStack width={300} alignItems="center" space="$4">
            <Checkbox
                size={size}
                {...checkboxProps}
                checked={datedInvoice}
                onCheckedChange={(checked: boolean | "indeterminate") => {
                    if (checked === 'indeterminate')
                        return
                    setDatedInvoice(checked)
                }}
            >
                <Checkbox.Indicator>
                    <CheckIcon />
                </Checkbox.Indicator>
            </Checkbox>

            <Label
                size={size}
                style={{
                    fontFamily: theme.fontFamily.Regular,
                    color: theme.color.white,
                }}
            >
                {label}
            </Label>
        </XStack>
    )
}

