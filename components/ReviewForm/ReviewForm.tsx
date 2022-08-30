import { useState } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import cn from 'classnames';

import { Rating, Input, TextArea, Button } from '../index';
import CloseIcon from './close.svg';
import { API } from '../../helpers/api';

import { ReviewFormProps } from './ReviewForm.props';
import { IReviewForm, SubmitResponse } from './ReviewForm.interface';

import styles from './ReviewForm.module.css';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const {
        register,
        control,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors }
    } = useForm<IReviewForm>();

    const onSubmit: SubmitHandler<IReviewForm> = async (formData) => {
        try {
            const { data } = await axios.post<SubmitResponse>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                setError('');
                reset();
            } else {
                setIsSuccess(false);
                setError('Что-то пошло не так, попробуйте перезагрузить страницу');
            }
        } catch (err) {
            setIsSuccess(false);
            setError('Что-то пошло не так, попробуйте перезагрузить страницу');
        }
    };

    return (
        <form className={cn(styles.form, className)} {...props}
            onSubmit={handleSubmit(onSubmit)}>

            <Input
                tabIndex={isOpened ? 0 : -1}
                placeholder='Имя'
                {...register('name', { required: 'Заполните поле' })}
                error={errors.name}
                aria-invalid={errors.name ? true : false}
            />
            <Input
                tabIndex={isOpened ? 0 : -1}
                placeholder='Заголовок отзыва'
                {...register('title', { required: 'Заполните поле' })}
                error={errors.title}
                aria-invalid={errors.title ? true : false}
            />
            <div className={styles.form__rating}>
                <span>Оценка:</span>
                <Controller
                    control={control}
                    name='rating'
                    rules={{
                        required: 'Выберите рейтинг',
                    }}
                    render={({ field, formState }) => (
                        <Rating
                            error={formState.errors.rating}
                            ref={field.ref}
                            rating={field.value}
                            isEditable
                            setRating={field.onChange}
                            tabIndex={isOpened ? 0 : -1}
                        />
                    )}
                />
            </div>
            <TextArea
                tabIndex={isOpened ? 0 : -1}
                placeholder='Текст отзыва'
                className={styles.form__textarea}
                {...register('description', { required: 'Заполните поле' })}
                error={errors.description}
                aria-label='Текст отзыва'
                aria-invalid={errors.description ? true : false}
            />
            <div className={styles.form__submit}>
                <Button
                    type='submit'
                    styleType='primary'
                    tabIndex={isOpened ? 0 : -1}
                    onClick={() => clearErrors()}
                >Отправить
                </Button>
                <span className={styles.form__info}>
                    * Перед публикацией отзыв пройдет предварительную модерацию и проверку
                </span>
            </div>
            {error &&
                <div className={cn(styles.message, styles.error)} role='alert'>
                    <div className={styles.message__title}>{error}</div>
                    <button
                        className={styles.message__close}
                        onClick={() => { setError('') }}
                        aria-label='Закрыть уведомление'
                    >
                        <CloseIcon />
                    </button>
                </div>
            }
            {
                isSuccess &&
                <div className={cn(styles.message, styles.success)} role='alert'>
                    <div className={styles.message__title}>Ваш отзыв отправлен</div>
                    <p>Спасибо, ваш отзыв будет опубликован после проверки.</p>
                    <button
                        className={styles.message__close}
                        onClick={() => { setIsSuccess(false) }}
                        aria-label='Закрыть уведомление'
                    >
                        <CloseIcon />
                    </button>
                </div>
            }
        </form >
    );
};
