import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import cn from 'classnames';

import { Rating } from '../index';
import { ReviewProps } from './Review.props';
import UserIcon from './user.svg';

import styles from './Review.module.css';

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
    const { name, title, description, createdAt, rating } = review;

    return (
        <div className={cn(styles.review, className)} {...props}>
            <UserIcon className={styles.user_icon} />
            <div className={styles.review__title}>
                <span className={styles.review__user}>{name}:</span>&nbsp;&nbsp;
                <span>{title}</span>
            </div>
            <div className={styles.review__date}>
                {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
            </div>
            <div className={styles.review__rating}>
                <Rating rating={rating} />
            </div>
            <div className={styles.review__text}>{description}</div>
        </div>
    );
};
