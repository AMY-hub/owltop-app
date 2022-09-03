import Link from 'next/link';

import { Htag, Paragraph } from '../../components';
import styles from './MainPageComponent.module.css';

export const MainPageComponent = (): JSX.Element => {
    return (
        <section className={styles.main}>
            <Htag tag='h1'
                className={styles.main__title}
            >
                <span><b>OWL</b>top </span>- агрегатор рейтингов популярных товаров по множеству категорий.
            </Htag>
            <Paragraph fontSize='l' className={styles.main__text} >
                Мы собрали для вас информацию о популярных товарах и услугах, рейтинг и отзывы покупателей, чтобы сделать ваш выбор максимально комфортным.
            </Paragraph>
            <Paragraph fontSize='m' className={styles.main__text} >
                На данный момент доступен рейтинг обучающих курсов по различным направлениям, с которым вы можете ознакомиться в разделе
                <Link href={'/courses'}>
                    <a className={styles.main__link} > Курсы</a>
                </Link>.
            </Paragraph>
            <Paragraph fontSize='m' className={styles.main__text} >
                В скором времени наш агрегатор будет дополнен информацией о рейтинге сервисов услуг, продуктах различных категорий и книгах.
                Оставайтесь с нами - будьте в курсе лучших предложений на рынке!
            </Paragraph>
        </section>
    );
};
