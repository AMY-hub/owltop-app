import { DetailedHTMLProps, HTMLProps } from 'react';

export interface ReviewFormProps extends DetailedHTMLProps<HTMLProps<HTMLFormElement>, HTMLFormElement> {
    productId: string;
    isOpened: boolean;
}