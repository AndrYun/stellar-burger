import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ingredientType } from '../utils/types';
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
            (ingredient) =>
              ingredient.type === 'bun' && (
                <Ingredient
                  ingredient={ingredient}
                  onClick={() => openModal(ingredient)}
                  key={uuidv4()}
                />
              )
          )}
        </article>
        <article className={styles.cards__container}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <br />
          {ingredients.map(
            (ingredient) =>
              ingredient.type === 'sauce' && (
                <Ingredient
                  ingredient={ingredient}
                  onClick={() => openModal(ingredient)}
                  key={uuidv4()}
                />
              )
          )}
        </article>
        <article className={styles.cards__container}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <br />
          {ingredients.map(
            (ingredient) =>
              ingredient.type === 'main' && (
                <Ingredient
                  ingredient={ingredient}
                  onClick={() => openModal(ingredient)}
                  key={uuidv4()}
                />
              )
          )}
        </article>
      </section>
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
