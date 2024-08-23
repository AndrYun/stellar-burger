import { FC } from 'react';
import styles from './feed-page.module.css';

export const Feed: FC = () => {
  return (
    <section className="">
      <p className="text text_type_main-large mb-5">Лента заказов</p>
      <div className={styles.feed__wrapp}></div>
    </section>
  );
};
