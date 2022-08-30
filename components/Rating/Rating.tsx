import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { ErrorMessage } from '../index';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';

import styles from './Rating.module.css';

export const Rating = forwardRef(({ isEditable = false, error, rating, setRating, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        createRatingView(rating);
    }, [rating, tabIndex]);


    const createRatingView = (currentRating: number): void => {
        const ratingView = ratingArray.map((el: JSX.Element, idx: number) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: idx < currentRating,
                        [styles.editable]: isEditable,
                        [styles.error]: error
                    })}
                    onMouseEnter={(): void => changeRatingView(idx + 1)}
                    onClick={(): void => handleClick(idx + 1)}
                    tabIndex={computeFocus(rating, idx)}
                    onKeyDown={handleKeyDown}
                    ref={r => ratingArrayRef.current?.push(r)}
                    role={isEditable ? 'slider' : ''}
                    aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
                    aria-valuenow={rating}
                    aria-valuemin={1}
                    aria-valuemax={5}
                    aria-invalid={error ? true : false}
                >
                    <StarIcon />
                </span >
            );
        });

        setRatingArray(ratingView);
    };

    const computeFocus = (r: number, i: number): number => {
        if (!isEditable) {
            return -1;
        }
        if (!r && i === 0) {
            return tabIndex ?? 0;
        }
        if (r === i + 1) {
            return tabIndex ?? 0;
        }
        return -1;
    };

    const changeRatingView = (n: number): void => {
        if (!isEditable) {
            return;
        }
        createRatingView(n);
    };

    const handleClick = (n: number): void => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(n);
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
        if (!isEditable || !setRating) {
            return;
        }

        if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            e.preventDefault();
            if (!rating) {
                setRating(1);
            } else {
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    };

    return (
        <div
            className={cn(styles.rating_wrapper, {
                [styles.error]: error
            })}
            ref={ref}
            onMouseLeave={(): void => changeRatingView(rating)}
            {...props}
        >
            {ratingArray.map((el, idx) => <span key={idx}>{el}</span>)}
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.error_message}
                    role='alert' />
            }
        </div>
    );
});
