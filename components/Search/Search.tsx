import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Input, Button } from '../index';
import { SearchProps } from './Search.props';
import SearchIcon from './search.svg';

import styles from './Search.module.css';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {

    const [searchText, setSearchText] = useState<string>('');
    const router = useRouter();

    const goToSearch = (): void => {
        router.push({
            pathname: '/search',
            query: {
                q: searchText
            }
        });
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            goToSearch();
        }
    };

    return (
        <form className={cn(styles.search, className)} {...props} role='search'>
            <Input
                className={styles.search__input}
                placeholder='Поиск...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                styleType='primary'
                className={styles.search__btn}
                onClick={goToSearch}
                aria-label='Искать по сайту'
            >
                <SearchIcon />
            </Button>
        </form>

    );
};
