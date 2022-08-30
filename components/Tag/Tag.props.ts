import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    tagSize?: 's' | 'm';
    color?: 'ghost' | 'red' | 'green' | 'gray' | 'primary';
    href?: string;
    children: ReactNode;
}