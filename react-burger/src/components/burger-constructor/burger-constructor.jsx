import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useMemo } from 'react';
import {
  addBun,
  addIngredient,
  selectBun,
  selectIngredient,
  removeIngredient,
  moveIngredient,
} from '../../services/slices/burger-constructor-slice';
import PropTypes from 'prop-types';
import SortableIngredient from '../sortable-ingredient/sortable-ingredient';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ openModal }) => {
  const dispatch = useDispatch();
  // подписка на состояния из burger-constructor-slice
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredient);

  // drop для верхней булки
  const [, dropTopBun] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(addBun(item));
    },
  });

  // drop для нижней булки
  const [, dropBottomBun] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(addBun(item));
    },
  });

  // drop для Ингредиентов
  const [{ isHover }, dropIngredient] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  // sorting for ingredients inside the constructor
  const moveIngredientHandler = (dragIndex, hoverIndex) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  // подсчет общей стоимости вместе в 2-мя булками
  const getSum = useMemo(() => {
    let sum = 0;
    if (bun) {
      sum += bun.price * 2;
    }
    for (let i = 0; i < ingredients.length; i++) {
      sum += ingredients[i].price;
    }
    return sum;
  }, [bun, ingredients]);

  return (
    <section className={styles.burgerconstructor__container}>
      <div>
        <div ref={dropTopBun} className={styles.upperBunPlace}>
          {bun && (
            <ConstructorElement
              key={bun.id}
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          )}
        </div>
        <div
          ref={dropIngredient}
          className={`${styles.middleIngredientPlace} custom-scroll`}
        >
          {ingredients.map((ingredient, index) => (
            <SortableIngredient
              key={ingredient.id}
              index={index}
              id={ingredient.id}
              ingredient={ingredient}
              moveIngredient={moveIngredientHandler}
              handleClose={() => dispatch(removeIngredient(ingredient.id))}
            />
          ))}
        </div>
        <div ref={dropBottomBun} className={styles.downBunPlace}>
          {bun && (
            <ConstructorElement
              key={bun.id}
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          )}
        </div>
      </div>
      <article className={styles.burgerconstructor__order}>
        <div className={styles.burgerconstructor__order_currency}>
          <p className="text text_type_digits-medium">{getSum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => openModal()}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </article>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
