import { useMemo } from 'react';
import * as Select from '@radix-ui/react-select';

export default ({ options, value, onSelectOption, disabled = false }: { options: Record<string, string>, value: string, onSelectOption: (option: string) => void, disabled?: boolean }) => {
    const selectOptions = useMemo(() =>
        Object.entries(options).map(([key, value]) => ({
            key,
            value,
        })),
        [options]);

    return (
        <Select.Root value={value} onValueChange={onSelectOption} disabled={disabled}>
            <Select.Trigger className='bg-white border p-2 px-4 rounded-md w-full flex justify-between'>
                <Select.Value aria-label={value} placeholder={'Province'}>
                    {value === '' ? 'Select' : options[value]}
                </Select.Value>
                <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className='bg-white border rounded-md'>
                    <Select.Viewport>
                        {selectOptions.map(({ key, value }) => (
                            <Select.Item
                                value={value}
                                className='cursor-pointer hover:bg-gray-200 px-4 p-2'
                                key={key}
                            >
                                <Select.ItemText className='truncate'>{value}</Select.ItemText>
                                <Select.ItemIndicator>…</Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};