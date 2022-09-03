import cn from 'classnames';

import { InWorkStatusProps } from './InWorkStatus.props';
import InWorkIcon from './setting.svg';
import { Htag } from '../Htag/Htag';

import styles from './InWorkStatus.module.css';

export const InWorkStatus = ({ className, ...props }: InWorkStatusProps): JSX.Element => {
    return (
        <div className={cn(styles.in_work, className)}
            {...props}>
            <InWorkIcon />
            <Htag tag='h1' className={styles.in_work__title}>
                Извините, этот раздел сайта находится в разработке и недоступен на данный момент.
            </Htag>
        </div>
    );
};
