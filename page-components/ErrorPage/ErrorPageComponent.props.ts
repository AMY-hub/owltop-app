import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface ErrorPageComponentProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    errorCode: number;
    errorName?: string;
    children: ReactNode;
}