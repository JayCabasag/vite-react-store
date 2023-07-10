import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button", {
    variants: {
        variant: {
            primary: [
                "bg-blue-500",
                "text-white",
                "rounded",
                "capitalize",
                "border-transparent",
                "hover:bg-blue-600",
            ],
            secondary: [
                "bg-white",
                "border",
                "rounded",
                "capitalize",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
            ],
        },
        size: {
            sm: ["text-sm", "py-1", "px-2"],
            md: ["text-md", "py-2", "px-4"],
            lg: ["text-lg", "py-3", "px-5"],
        },
    },
    compoundVariants: [{ variant: "primary", size: "md", class: "uppercase" }],
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> { }

export const Button: React.FC<ButtonProps> = ({
    className,
    variant,
    size,
    children,
    ...props
}) => <button className={button({ variant, size, className })} {...props} >{children}</button>;