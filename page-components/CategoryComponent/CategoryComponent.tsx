import cn from 'classnames';

import { CategoryComponentProps } from './CategoryComponent.props';
import styles from './CategoryComponent.module.css';
import { Card, Htag } from '../../components';
import Link from 'next/link';

export const CategoryComponent = ({ menu, route, className, ...props }: CategoryComponentProps): JSX.Element => {
    return (
        <section className={cn(styles.category, className)} {...props}>
            <Htag tag={'h1'}>
                Мы собрали информацию об обучающих программах по множеству специальностей, чтобы вы могли сделать лучший вклад в свое будущее!
            </Htag>
            <ul className={styles.category__subcategories}>
                {menu.map(m => {
                    return (<li>
                        <Card className={styles.category__subcategory}>
                            <Htag tag='h2'
                                className={styles.subcategory__title} >
                                <span>Специальность: </span>{m._id.secondCategory}
                            </Htag>
                            <ul className={styles.category__links}>
                                {m.pages.map(p => (
                                    <li>
                                        <Link href={`/${route}/${p.alias}`}>
                                            <a className={styles.category__link}>{p.category}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </li>);
                })}
            </ul>
        </section>
    );
};
