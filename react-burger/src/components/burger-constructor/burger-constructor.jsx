import {
  ConstructorElement,
  Button,
  CurrencyIcon,
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
  resetConstructor,
} from '../../services/slices/burger-constructor-slice';
import { sendOrder } from '../../services/slices/order-details-slice';
import PropTypes from 'prop-types';
import SortableIngredient from '../sortable-ingredient/sortable-ingredient';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ openModal }) => {
  const dispatch = useDispatch();
  // подписка на состояния из burger-constructor-slice
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredient);

  // drop для верхней булки
  const [{ isHoverTopBun }, dropTopBun] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(addBun(item));
    },
    collect: (monitor) => ({
      isHoverTopBun: monitor.isOver(),
    }),
  });

  // drop для нижней булки
  const [{ isHoverBottomBun }, dropBottomBun] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(addBun(item));
    },
    collect: (monitor) => ({
      isHoverBottomBun: monitor.isOver(),
    }),
  });

  // drop для Ингредиентов
  const [{ isHoverIngredients }, dropIngredient] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHoverIngredients: monitor.isOver(),
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

  // функция для отправки запроса на заказ
  const handleOrderClick = () => {
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    if (bun) {
      ingredientIds.push(bun._id, bun._id);
    }
    dispatch(sendOrder(ingredientIds)).then((result) => {
      if (sendOrder.fulfilled.match(result)) {
        dispatch(resetConstructor());
        openModal();
      }
    });
  };

  return (
    <section className={styles.burgerconstructor__container}>
      <div className={styles.burgerconstructor__dropzone}>
        <div
          ref={dropTopBun}
          className={
            isHoverTopBun
              ? `${styles.upperBunPlace} ${styles.isHoverTopBun}`
              : styles.upperBunPlace
          }
        >
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
          className={
            isHoverIngredients
              ? `${styles.middleIngredientPlace} ${styles.isHoverIngredients}`
              : `${styles.middleIngredientPlace} custom-scroll`
          }
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
        <div
          ref={dropBottomBun}
          className={
            isHoverBottomBun
              ? `${styles.downBunPlace} ${styles.isHoverBottomBun}`
              : styles.downBunPlace
          }
        >
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
          onClick={handleOrderClick}
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
