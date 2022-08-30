import cn from 'classnames';

import Icon from './owl.svg';
import { ErrorPageComponentProps } from './ErrorPageComponent.props';
import styles from './ErrorPageComponent.module.css';

export const ErrorPageComponent = ({ errorName = 'Что-то пошло не так...', errorCode, children, className, ...props }: ErrorPageComponentProps): JSX.Element => {
    return (
        <div className={cn(styles.error_page, className)} {...props}>
            <div className={styles.error_page__header}>
                <Icon />
                <h1 className={styles.error_page__title}
                >{`${errorCode}: ${errorName}`}</h1>
            </div>
            {children}
        </div>
    );
};
