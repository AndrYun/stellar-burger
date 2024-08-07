import React, { useMemo, forwardRef } from 'react';
import styles from './ingredient.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { ingredientType } from '../utils/types';
import { selectIngredient } from '../../services/slices/burger-constructor-slice';

// сборщик рефов
const combineRefs =
  (...refs) =>
  (node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };

const Ingredient = forwardRef(({ ingredient, onClick }, ref) => {
  // подписка на ингредиенты из burger-constructor-slice
  const ingredientsDragged = useSelector(selectIngredient);

  // подсчет кол-ва ингредиентов у компонента Counter
  const ingredientCounter = useMemo(() => {
    let counter = 0;
    ingredientsDragged.forEach((el) => {
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
});

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Ingredient);
