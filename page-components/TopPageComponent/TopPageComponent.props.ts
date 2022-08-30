import { DetailedHTMLProps, HTMLProps } from 'react';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export interface TopPageComponentProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}