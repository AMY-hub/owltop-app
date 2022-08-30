import { DetailedHTMLProps, HTMLProps } from 'react';
import { ProductModel } from '../../interfaces/product.interface';

export interface ProductProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    product: ProductModel;
}