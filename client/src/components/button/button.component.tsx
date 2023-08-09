import { FC, ButtonHTMLAttributes } from "react";

import {
    BaseButton,
    InvertedButton
} from './button.styles'

export enum BUTTON_TYPE_CLASSES {
    base= "base",
    inverted= "inverted"
}


export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button:FC<ButtonProps> = ({children, buttonType, ...otherProps}) => {
    // const CustomButton = getButton(buttonType)

    return (
        <BaseButton {...otherProps}>
            {children}
        </BaseButton>
    )
}

export default Button