import { useEffect, useState } from 'react';

export const useScrollY = (): number => {
    const isBrowser = typeof window !== 'undefined';

    const [scrollY, setScrollY] = useState<number>(0);

    const handleScroll = (): void => {
        const currentScrollY = isBrowser ? window.scrollY : 0;
        setScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);

        return () => window.removeEventListener('click', handleScroll);
    }, []);

    return scrollY;
};