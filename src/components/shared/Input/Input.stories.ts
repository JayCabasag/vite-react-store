import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta = {
    component: Input,
    argTypes: {
        variant: {
            options: ['primary', 'secondary'],
            control: { type: 'radio' },
        }
    }
}

export default meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {
    args: {
        variant: 'primary',
        placeholder: 'Input'
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        placeholder: 'Input'
    },
};