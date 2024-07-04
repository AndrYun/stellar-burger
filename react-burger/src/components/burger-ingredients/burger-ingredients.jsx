import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { selectIngredients } from '../../services/slices/burger-ingredients-slice';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ingredientType } from '../utils/types';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ openModal }) => {
  const [current, setCurrent] = useState('Булки');

  // tabs refs
  const pBunsRef = useRef(null);
  const pSauceRef = useRef(null);
  const pIngredientsRef = useRef(null);

  const { ref: bunsRef, inView: inViewBuns } = useInView();
  const { ref: sauceRef, inView: inViewSauce } = useInView();
  const { ref: ingredientsRef, inView: inViewIngredients } = useInView();

  const tabSwitch = (viewBuns, viewSauce, viewIngredients) => {
    if (viewBuns) {
      return setCurrent('one');
    }
    if (viewSauce) {
      return setCurrent('two');
    }
    if (viewIngredients) {
      return setCurrent('three');
    }
  };

  useEffect(() => {
    tabSwitch(inViewBuns, inViewSauce, inViewIngredients);
  }, [inViewBuns, inViewSauce, inViewIngredients]);

  // подписка на состояния из ingredientsSlice
  const ingredients = useSelector(selectIngredients);
  return (
    <div className={styles.burgeringredients__wrapp}>
      <h1 className="text text_type_main-large pb-4">Соберите бургер</h1>
      <section className={styles.burgeringredients__section_tabs}>
        <Tab
          value="one"
          active={current === 'one'}
          onClick={() =>
            pBunsRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === 'two'}
          onClick={() =>
            pSauceRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === 'three'}
          onClick={() =>
            pIngredientsRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Начинки
        </Tab>
      </section>
      <section className={`${styles.cards__wrapper} custom-scroll`}>
        <article className={styles.cards__container}>
          <h2 ref={pBunsRef} className="text text_type_main-medium">
            Булки
          </h2>
          <br />
          {ingredients.map(
            (ingredient) =>
              ingredient.type === 'bun' && (
                <Ingredient
                  ref={bunsRef}
                  ingredient={ingredient}
                  onClick={() => openModal(ingredient)}
                  key={uuidv4()}
                />
              )
          )}
        </article>
        <article className={styles.cards__container}>
          <h2 ref={pSauceRef} className="text text_type_main-medium">
            Соусы
          </h2>
          <br />
          {ingredients.map(
            (ingredient) =>
              ingredient.type === 'sauce' && (
                <Ingredient
                  ref={sauceRef}
                  ingredient={ingredient}
                  onClick={() => openModal(ingredient)}
                  key={uuidv4()}
                />
              )
          )}
        </article>
        <article className={styles.cards__container}>
          <h2 ref={pIngredientsRef} className="text text_type_main-medium">
            Начинки
          </h2>
          <br />
          {ingredients.map(
            (ingredient) =>
              ingredient.type === 'main' && (
                <Ingredient
                  ref={ingredientsRef}
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
  // ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
