import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CardIngredient from '../card-ingredient/card-ingredient';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ ingredients, openModal }) => {
  const [current, setCurrent] = useState('Булки');

  return (
    <div className={styles.burgeringredients__wrapp}>
      <h1 className="text text_type_main-large pb-4">Соберите бургер</h1>
      <section className={styles.burgeringredients__section_tabs}>
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
        <article className={styles.cards__container}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <br />
          {ingredients.map(
            (card) =>
              card.type === 'bun' && (
                <CardIngredient
                  {...card}
                  onClick={() => openModal(card)}
                  key={card._id}
                />
              )
          )}
        </article>
        <article className={styles.cards__container}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <br />
          {ingredients.map(
            (card) =>
              card.type === 'sauce' && (
                <CardIngredient
                  {...card}
                  onClick={() => openModal(card)}
                  key={card._id}
                />
              )
          )}
        </article>
        <article className={styles.cards__container}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <br />
          {ingredients.map(
            (card) =>
              card.type === 'main' && (
                <CardIngredient
                  {...card}
                  onClick={() => openModal(card)}
                  key={card._id}
                />
              )
          )}
        </article>
      </section>
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      calories: PropTypes.number,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
