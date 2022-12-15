import { useRef, useState, forwardRef, ForwardedRef } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { Card, Rating, Tag, Button, Divider, Review, ReviewForm } from '../index';
import Image from 'next/image';
import { declOfNums, formatPriceRU } from '../../helpers/helpers';

import { ProductProps } from './Product.props';
import styles from './Product.module.css';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = (): void => {
        setIsReviewOpen(true);
        console.log(reviewRef.current);

        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        reviewRef.current?.focus();
    };

    const variants = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    };

    const productTags = product.tags
        .map(t => (
            <Tag
                key={t}
                tagSize='s'
                color='ghost'
                className={styles.category}>
                {t}
            </Tag>));

    const characteristics = product.characteristics.map(c => (
        <div className={styles.char} key={c.name}>
            <span className={styles.char_name}>{c.name}</span>
            <span className={styles.char_dots}></span>
            <span className={styles.char_value}>{c.value}</span>
        </div>
    ));

    return (
        <div className={cn(styles.wrapper, className)} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        layout='fixed'
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span><span className="hidden">цена</span>
                        {formatPriceRU(product.price)}
                    </span>
                    {product.oldPrice &&
                        <Tag color='green' className={styles.discount}>
                            <span className="hidden">скидка</span>
                            {formatPriceRU(product.price - product.oldPrice)}
                        </Tag>}
                </div>
                <div className={styles.credit}>
                    <span className="hidden">кредит</span>
                    {formatPriceRU(product.credit)}/<span className={styles.month}>мес</span>
                </div>
                <div className={styles.rating}>
                    <span className="hidden">{'рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating} />
                </div>
                <div className={styles.tags}>{productTags}</div>
                <div className={styles.price_title}
                    aria-hidden={true}>цена</div>
                <div className={styles.credit_title}
                    aria-hidden={true}>в кредит</div>
                <div className={styles.rate_title}>
                    <a href='#ref' onClick={scrollToReview}>
                        {product.reviewCount}
                        {' ' + declOfNums(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </a>
                </div>
                <Divider className={cn(styles.hr, styles.hr2)} />
                <div className={styles.description}>{product.description}</div>
                <div className={styles.features}>{characteristics}</div>
                <div className={styles.adv_block}>
                    {product.advantages &&
                        <div className={styles.advantages}>
                            <div className={styles.adv_block__title}>Преимущества</div>
                            <div>{product.advantages}</div>
                        </div>
                    }
                    {product.disadvantages &&
                        <div className={styles.disadvantages}>
                            <div className={styles.adv_block__title}>Недостатки</div>
                            <div>{product.disadvantages}</div>
                        </div>
                    }
                </div>
                <Divider className={styles.hr} />
                <div className={styles.actions}>
                    <a
                        className={styles.actions__link}
                        href={product.link} target='_blank'>
                        Узнать подробнее
                    </a>
                    <Button
                        styleType='ghost'
                        arrow={isReviewOpen ? 'down' : 'right'}
                        onClick={(): void => setIsReviewOpen(!isReviewOpen)}
                        className={styles.review_btn}>
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            <motion.div
                tabIndex={isReviewOpen ? 0 : -1}
                ref={reviewRef}
                variants={variants}
                initial='hidden'
                animate={isReviewOpen ? 'visible' : 'hidden'}
            >
                {isReviewOpen &&
                    <Card color='blue' className={styles.reviews}>
                        {product.reviews.length !== 0 &&
                            product.reviews.map(r => (
                                <div key={r._id}>
                                    <Review review={r} />
                                    <Divider />
                                </div>
                            ))
                        }
                        <ReviewForm productId={product._id} isOpened={isReviewOpen} />
                    </Card>
                }
            </motion.div>
        </div>
    );
}));
