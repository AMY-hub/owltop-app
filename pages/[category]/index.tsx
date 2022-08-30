import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { API } from '../../helpers/api';
import { topLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { WithLayout } from '../../layout/Layout';

const Category = ({ firstCategory }: CategoryProps): JSX.Element => {
    return (
        <div>Раздел: {firstCategory}</div>
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
}