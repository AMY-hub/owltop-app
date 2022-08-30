import { useEffect, useReducer } from 'react';
import { useReducedMotion } from 'framer-motion';

import { HhData, Htag, Tag, Sort, Product, Advantages } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { TopPageComponentProps } from './TopPageComponent.props';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';

import styles from './TopPageComponent.module.css';

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {

    const [{ products: sortedProducts, sort }, dispath] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        dispath({ type: 'update', newProductData: products });
    }, [products]);

    const setSort = (sort: SortEnum): void => {
        dispath({ type: sort });
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Htag tag='h1'>{page.title}</Htag>
                {products.length &&
                    <Tag
                        tagSize='m' color='gray'
                        aria-label={`количество: ${products.length}`}>
                        {products.length}
                    </Tag>}
                <Sort sort={sort} setSort={setSort} />
            </header>
            <section className={styles.products} role='list'>
                {sortedProducts.length &&
                    sortedProducts.map(p => (
                        <Product
                            role='listitem'
                            layout={shouldReduceMotion ? false : true}
                            key={p._id}
                            product={p} />))}
            </section>
            {firstCategory == TopLevelCategory.Courses && page.hh &&
                <section className={styles.hh}>
                    <div className={styles.hh_title}>
                        <Tag tagSize='m' color='red'>hh.ru</Tag>
                        <Htag tag='h2'>Вакансии - {page.category}</Htag>
                    </div>
                    <HhData {...page.hh} />
                </section>
            }
            {page.advantages &&
                (page.advantages?.length > 0 && page.advantages[0].title) ?
                <section>
                    <Htag tag='h2'>Преимущества</Htag>
                    <Advantages advantages={page.advantages} />
                </section>
                : <></>
            }
            {page.seoText &&
                <div className={styles.seo}
                    dangerouslySetInnerHTML={{ __html: page.seoText }}
                />
            }
            <section>
                <Htag tag='h2'>Получаемые навыки</Htag>
                {page.tags.map(t => <Tag key={t} tagSize='s' color='primary'>{t}</Tag>)}
            </section>
        </div>
    );
};
