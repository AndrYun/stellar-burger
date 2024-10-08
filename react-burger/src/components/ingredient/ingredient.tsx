import React, { useMemo, forwardRef, Ref, MutableRefObject } from 'react';
import styles from './ingredient.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useTypedSelector } from '../utils/hooks';
import { selectIngredient } from '../../services/slices/burger-constructor/burger-constructor-slice';
import { IIngredient } from '../utils/types';

// сборщик рефов
const combineRefs =
  (...refs: Array<Ref<HTMLDivElement>>) =>
  (node: HTMLDivElement | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as MutableRefObject<HTMLDivElement | null>).current = node;
      }
    });
  };

// interface Ingredient props
interface IIngredientProps {
  ingredient: IIngredient;
  onClick: () => void;
}

const Ingredient = forwardRef<HTMLDivElement, IIngredientProps>(
  ({ ingredient, onClick }, ref) => {
    // подписка на ингредиенты из burger-constructor-slice
    const ingredientsDragged = useTypedSelector(selectIngredient);

    // подсчет кол-ва ингредиентов у компонента Counter
    const ingredientCounter: number = useMemo(() => {
      let counter = 0;
      ingredientsDragged.forEach((el: IIngredient) => {
        if (el._id === ingredient._id) {
          counter += 1;
        }
      });
      return counter;
    }, [ingredientsDragged, ingredient._id]);

    // для ингредиентов drag
    const [{ isDrag }, dragRef] = useDrag({
      type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
      item: ingredient,
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });

    // cobmine the ref for drag functionality and the forwarded ref
    const combinedRef = combineRefs(dragRef, ref);

    return (
      <div
        ref={combinedRef}
        onClick={onClick}
        className={
          isDrag
            ? `${styles.cardbun_wrapp} ${styles.dragging}`
            : styles.cardbun_wrapp
        }
      >
        <div className={styles.cardbun__img_wrapp}>
          <img src={ingredient.image} alt={ingredient.name} />
        </div>
        <div className={styles.cardbun__price_wrapp}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.cardbun__name_wrapp}>{ingredient.name}</div>
        {ingredient.type !== 'bun' && (
          <Counter count={ingredientCounter} size="default" extraClass="m-1" />
        )}
      </div>
    );
  }
);

export default React.memo(Ingredient);
