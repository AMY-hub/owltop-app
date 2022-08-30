import { AdvantagesProps } from './Advantages.props';
import MarkIcon from './mark.svg';

import styles from './Advantages.module.css';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {

    const advantagesList = advantages.map(a => {
        return (
            <div className={styles.advantage} key={a._id}>
                <MarkIcon />
                <div className={styles.advantage__title}>{a.title}</div>
                <hr className={styles.vline} />
                <div className={styles.advantage__description}>
                    {a.description}
                </div>
            </div>
        );
    });

    return (
        <div className={styles.advantages}>
            {advantagesList}
        </div>
    );
};
