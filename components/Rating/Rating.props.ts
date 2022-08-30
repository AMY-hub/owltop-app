import { DetailedHTMLProps, HTMLProps } from 'react';
import { FieldError } from 'react-hook-form';

export interface RatingProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    isEditable?: boolean;
    rating: number;
    error?: FieldError;
    setRating?: (rating: number) => void;
}