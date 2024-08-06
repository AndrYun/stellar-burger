import { useCallback, useEffect, useRef, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { selectIngredients } from '../../services/slices/burger-ingredients-slice';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import styles from './burger-ingredients.module.css';
import { IIngredient } from '../utils/types';

interface IBurgerIngredientsProps {
  openModal: (ingredient: IIngredient) => void;
}

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ openModal }) => {
  const [current, setCurrent] = useState<string>('one');

  // tabs refs
  const pBunsRef = useRef<HTMLHeadingElement | null>(null);
  const pSauceRef = useRef<HTMLHeadingElement | null>(null);
  const pIngredientsRef = useRef<HTMLHeadingElement | null>(null);

  const { ref: bunsRef, inView: inViewBuns } = useInView({ threshold: 0.5 });
  const { ref: sauceRef, inView: inViewSauce } = useInView({ threshold: 0.5 });
  const { ref: ingredientsRef, inView: inViewIngredients } = useInView({
    threshold: 0.5,
  });

  const tabSwitch = useCallback(
    (viewBuns: boolean, viewSauce: boolean, viewIngredients: boolean): void => {
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
          onClick={(): void =>
            pBunsRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === 'two'}
          onClick={(): void =>
            pSauceRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === 'three'}
          onClick={(): void =>
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
            .filter((ingredient: IIngredient) => ingredient.type === 'bun')
            .map((ingredient: IIngredient) => (
              <Ingredient
                key={ingredient._id}
                ref={bunsRef}
                ingredient={ingredient}
                onClick={(): void => openModal(ingredient)}
              />
            ))}
        </article>
        <article className={styles.cards__container}>
          <h2 ref={pSauceRef} className="text text_type_main-medium">
            Соусы
          </h2>
          <br />
          {ingredients
            .filter((ingredient: IIngredient) => ingredient.type === 'sauce')
            .map((ingredient: IIngredient) => (
              <Ingredient
                key={ingredient._id}
                ref={sauceRef}
                ingredient={ingredient}
                onClick={(): void => openModal(ingredient)}
              />
            ))}
        </article>
        <article className={styles.cards__container}>
          <h2 ref={pIngredientsRef} className="text text_type_main-medium">
            Начинки
          </h2>
          <br />
          {ingredients
            .filter((ingredient: IIngredient) => ingredient.type === 'main')
            .map((ingredient: IIngredient) => (
              <Ingredient
                key={ingredient._id}
                ref={ingredientsRef}
                ingredient={ingredient}
                onClick={(): void => openModal(ingredient)}
              />
            ))}
        </article>
      </section>
    </div>
  );
};

export default BurgerIngredients;
