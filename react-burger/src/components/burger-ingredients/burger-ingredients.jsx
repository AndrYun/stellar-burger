import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import data_bun from '../utils/data';
import CardBun from '../card-bun/card-bun';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

CardBun.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number.isRequired,
};

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('Булки');
  return (
    <main className={styles.main__wrapp}>
      <h1 className="text text_type_main-large pb-4">Соберите бургер</h1>
      <section className={styles.main__section_tabs}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </section>
      <section className={`${styles.cards__wrapper} custom-scroll`}>
        <>
          <h2 className="text text_type_main-medium">Булки</h2>
          <article className={styles.cards__container}>
            {data_bun.map(
              (card) =>
                card.type === 'bun' && <CardBun {...card} key={card._id} />
            )}
          </article>
        </>
        <>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <article className={styles.cards__container}>
            {data_bun.map(
              (card) =>
                card.type === 'sauce' && <CardBun {...card} key={card._id} />
            )}
          </article>
        </>
        <>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <article className={styles.cards__container}>
            {data_bun.map(
              (card) =>
                card.type === 'main' && <CardBun {...card} key={card._id} />
            )}
          </article>
        </>
      </section>
    </main>
  );
};

export default BurgerIngredients;
