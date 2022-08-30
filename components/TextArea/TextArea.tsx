import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { ErrorMessage } from '../index';
import { TextAreaProps } from './TextArea.props';

import styles from './TextArea.module.css';

export const TextArea = forwardRef(({ error, rows = 3, className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(styles.textarea_wrapper, className)}>
            <textarea
                className={cn(styles.textarea, {
                    [styles.error]: error
                })}
                {...props}
                rows={rows}
                ref={ref} />
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.error_message}
                    role='alert'
                />
            }
        </div>

    );
});
