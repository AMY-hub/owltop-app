import { DetailedHTMLProps, HTMLProps } from 'react';
import { ReviewModel } from '../../interfaces/product.interface';

export interface ReviewProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    review: ReviewModel;
}