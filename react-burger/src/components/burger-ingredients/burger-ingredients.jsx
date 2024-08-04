import { useCallback, useEffect, useRef, useState, ReactNode, FC } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { selectIngredients } from '../../services/slices/burger-ingredients-slice';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

// interface IBurgerIngredientsProps {
//   openModal: (ingredient: any) => void;
// }

const BurgerIngredients = ({ openModal }) => {
  const [current, setCurrent] = useState('one'); // <string>

  // tabs refs
  const pBunsRef = useRef(null); // <HTMLHeadElement | null>
  const pSauceRef = useRef(null);
  const pIngredientsRef = useRef(null);

  const { ref: bunsRef, inView: inViewBuns } = useInView({ threshold: 0.5 });
  const { ref: sauceRef, inView: inViewSauce } = useInView({ threshold: 0.5 });
  const { ref: ingredientsRef, inView: inViewIngredients } = useInView({
    threshold: 0.5,
  });

  const tabSwitch = useCallback(
    (viewBuns, viewSauce, viewIngredients) => {
      // :boolean
      if (viewBuns && current !== 'one') {
        setCurrent('one');
      } else if (viewSauce && current !== 'two') {
        setCurrent('two');
      } else if (viewIngredients && current !== 'three') {
        setCurrent('three');
      }
    },
    [current]
  );

  useEffect(() => {
    tabSwitch(inViewBuns, inViewSauce, inViewIngredients);
  }, [inViewBuns, inViewSauce, inViewIngredients, tabSwitch]);

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
          {ingredients
            .filter((ingredient) => ingredient.type === 'bun')
            .map((ingredient) => (
              <Ingredient
                key={ingredient._id}
                ref={bunsRef}
                ingredient={ingredient}
                onClick={() => openModal(ingredient)}
              />
            ))}
        </article>
        <article className={styles.cards__container}>
          <h2 ref={pSauceRef} className="text text_type_main-medium">
            Соусы
          </h2>
          <br />
          {ingredients
            .filter((ingredient) => ingredient.type === 'sauce')
            .map((ingredient) => (
              <Ingredient
                key={ingredient._id}
                ref={sauceRef}
                ingredient={ingredient}
                onClick={() => openModal(ingredient)}
              />
            ))}
        </article>
        <article className={styles.cards__container}>
          <h2 ref={pIngredientsRef} className="text text_type_main-medium">
            Начинки
          </h2>
          <br />
          {ingredients
            .filter((ingredient) => ingredient.type === 'main')
            .map((ingredient) => (
              <Ingredient
                key={ingredient._id}
                ref={ingredientsRef}
                ingredient={ingredient}
                onClick={() => openModal(ingredient)}
              />
            ))}
        </article>
      </section>
    </div>
  );
};

// BurgerIngredients.propTypes = {
//   openModal: PropTypes.func.isRequired,
// };

export default BurgerIngredients;
