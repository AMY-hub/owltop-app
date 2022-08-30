import { Card } from '../index';
import { formatPriceRU } from '../../helpers/helpers';
import { HhDataProps } from './HhData.props';
import StarIcon from './star.svg';

import styles from './HhData.module.css';

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.hh__total}>
                <div className={styles.hh__title}>Всего вакансий:</div>
                <div className={styles.hh__count}>{count}</div>
            </Card>
            <Card className={styles.hh__salary}>
                <div>
                    <div className={styles.hh__title}>Начальный</div>
                    <div className={styles.hh__value}>
                        {formatPriceRU(juniorSalary)}
                    </div>
                    <div className={styles.hh__rate}>
                        <StarIcon className={styles.filled} />
                        <StarIcon />
                        <StarIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.hh__title}>Средний</div>
                    <div className={styles.hh__value}>
                        {formatPriceRU(middleSalary)}
                    </div>
                    <div className={styles.hh__rate}>
                        <StarIcon className={styles.filled} />
                        <StarIcon className={styles.filled} />
                        <StarIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.hh__title}>Профессионал</div>
                    <div className={styles.hh__value}>
                        {formatPriceRU(seniorSalary)}
                    </div>
                    <div className={styles.hh__rate}>
                        <StarIcon className={styles.filled} />
                        <StarIcon className={styles.filled} />
                        <StarIcon className={styles.filled} />
                    </div>
                </div>
            </Card>
        </div>
    );
};
