import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface CardProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    color?: 'white' | 'blue';
    children: ReactNode;
}