import { DetailedHTMLProps, HTMLProps } from 'react';

export interface ErrorMessageProps extends DetailedHTMLProps<HTMLProps<HTMLParagraphElement>, HTMLParagraphElement> {
    message: string;
}