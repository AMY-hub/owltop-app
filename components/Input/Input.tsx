import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { InputProps } from './Input.props';
import { ErrorMessage } from '../index';

import styles from './Input.module.css';

export const Input = forwardRef(({ error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={cn(styles.input_wrapper, className)}>
            <input className={cn(styles.input, {
                [styles.error]: error
            })}
                {...props}
                ref={ref}
            />
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.error_message}
                    role='alert' />
            }
        </div>

    );
});
