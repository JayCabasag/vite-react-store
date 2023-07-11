import React, { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'


const input = cva("p-2 normal-case", {
    compoundVariants: [{ variant: "primary", class: "uppercase" }],
    variants: {
        variant: {
            primary: [
                "border border-blue-500",
                "rounded"
            ],
            secondary: [
                "border border-gray-500",
                "rounded"
            ]
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
})

export interface InputProps extends ComponentProps<'input'>, VariantProps<typeof input> { }

export const Input: React.FC<InputProps> = ({
    className,
    variant,
    placeholder,
    ...props
}) => <input className={input({ variant, className })} {...props} placeholder={placeholder} />
