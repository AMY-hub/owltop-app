import { useContext, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { InWorkStatus } from '../../components';
import { AppContext } from '../../context/AppContext';
import { API } from '../../helpers/api';
import { topLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { WithLayout } from '../../layout/Layout';
import { CategoryComponent } from '../../page-components';

const Category = ({ firstCategory, firstCategoryRoute, firstCaregoryName, menu }: CategoryProps): JSX.Element => {

    const { setMenu } = useContext(AppContext);

    useEffect(() => {
        setMenu && setMenu(menu);
    }, [menu, setMenu]);

    if (firstCategory === TopLevelCategory.Books ||
        firstCategory === TopLevelCategory.Services ||
        firstCategory === TopLevelCategory.Products) {
        return (
            <>
                <Head>
                    <title>{firstCaregoryName}</title>
                </Head>
                <InWorkStatus />;
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{firstCaregoryName}</title>
            </Head>
            <CategoryComponent menu={menu} route={firstCategoryRoute} />
        </>

    );
};

export default WithLayout(Category);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: topLevelMenu.map(m => '/' + m.route),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    }

    try {
        const firstLevelCategoryItem = topLevelMenu.find(m => m.route === params.category);

        if (!firstLevelCategoryItem) {
            return {
                notFound: true
            };
        }
        const { data: menu } = await axios.post<MenuItem[]>(API.toppage.find, {
            firstCategory: firstLevelCategoryItem.id
        });

        return {
            props: {
                menu,
                firstCategory: firstLevelCategoryItem.id,
                firstCategoryRoute: firstLevelCategoryItem.route,
                firstCaregoryName: firstLevelCategoryItem.name
            }
        };
    } catch {
        return {
            notFound: true
        };
    }

};

interface CategoryProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
    firstCategoryRoute: string;
    firstCaregoryName: string;
}