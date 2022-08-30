import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import arrow from './arrow.svg';
import close from './close.svg';
import menu from './menu.svg';

export const Icons = {
    arrow,
    close,
    menu
};

export type IconName = keyof typeof Icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    styleType: 'primary' | 'white';
    icon: IconName;
}