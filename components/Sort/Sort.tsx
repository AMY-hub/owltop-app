import cn from 'classnames';

import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './sort.svg';

import styles from './Sort.module.css';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
    return (
        <div className={cn(styles.sort, className)} {...props}>
            <div className={styles.sort_name} id='sort'>Сортировка</div>
            <button
                id='rating'
                aria-labelledby='sort rating'
                aria-selected={sort === SortEnum.Rating}
                onClick={() => setSort(SortEnum.Rating)}
                className={cn({
                    [styles.active]: sort === SortEnum.Rating
                })}>
                <SortIcon className={styles.sort__icon} />
                По рейтингу
            </button>
            <button
                id='price'
                aria-labelledby='sort price'
                aria-selected={sort === SortEnum.Price}
                onClick={() => setSort(SortEnum.Price)}
                className={cn({
                    [styles.active]: sort === SortEnum.Price
                })}>
                <SortIcon className={styles.sort__icon} />
                По цене
            </button>
        </div>
    );
};
