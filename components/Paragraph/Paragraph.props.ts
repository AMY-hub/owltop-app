import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface ParagraphProps extends DetailedHTMLProps<HTMLProps<HTMLParagraphElement>, HTMLParagraphElement> {
    fontSize?: 's' | 'm' | 'l';
    children: ReactNode;
}