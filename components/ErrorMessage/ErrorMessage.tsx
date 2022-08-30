import cn from 'classnames';

import { ErrorMessageProps } from './ErrorMessage.props';

import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ message, className, ...props }: ErrorMessageProps): JSX.Element => {
    return (
        <p className={cn(styles.error, className)}
            {...props}>
            {message}
        </p>
    );
};
