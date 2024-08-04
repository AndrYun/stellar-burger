import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useMemo, FC } from 'react';
import {
  addBun,
  addIngredient,
  selectBun,
  selectIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
} from '../../services/slices/burger-constructor-slice';
import { selectUser } from '../../services/slices/user-auth-slice';
import { sendOrder } from '../../services/slices/order-details-slice';
import SortableIngredient from '../sortable-ingredient/sortable-ingredient';
import styles from './burger-constructor.module.css';

interface IBurgerConstructor {
  openModal: () => void;
}

interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: number;
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ openModal }) => {
  const dispatch: any = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  // подписка на состояния из burger-constructor-slice
  const bun: IIngredient | null = useSelector(selectBun);
  const ingredients: IIngredient[] = useSelector(selectIngredient);

  // подписка на состояния в authUserSlice
  const user = useSelector(selectUser);

  // drop для верхней булки
  const [{ isHoverTopBun }, dropTopBun] = useDrop({
    accept: 'bun',
    drop(item: IIngredient) {
      dispatch(addBun(item));
    },
    collect: (monitor) => ({
      isHoverTopBun: monitor.isOver(),
    }),
  });

  // drop для нижней булки
  const [{ isHoverBottomBun }, dropBottomBun] = useDrop({
    accept: 'bun',
    drop(item: IIngredient) {
      dispatch(addBun(item));
    },
    collect: (monitor) => ({
      isHoverBottomBun: monitor.isOver(),
    }),
  });

  // drop для Ингредиентов
  const [{ isHoverIngredients }, dropIngredient] = useDrop({
    accept: 'ingredient',
    drop(item: IIngredient) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHoverIngredients: monitor.isOver(),
    }),
  });

  // sorting for ingredients inside the constructor
  const moveIngredientHandler = (
    dragIndex: number,
    hoverIndex: number
  ): void => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  // подсчет общей стоимости вместе в 2-мя булками
  const getSum: number = useMemo(() => {
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
  const handleOrderClick = (): void => {
    if (user) {
      const ingredientIds: string[] = ingredients.map(
        (ingredient) => ingredient._id
      );
      if (bun) {
        ingredientIds.push(bun._id, bun._id);
      }
      // @ts-ignore
      dispatch(sendOrder(ingredientIds)).then((result: string[]) => {
        if (sendOrder.fulfilled.match(result)) {
          // @ts-ignore
          dispatch(resetConstructor());
          openModal();
        }
      });
    } else {
      navigate('/login');
    }
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
          {ingredients.map((ingredient: any, index: number) => (
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
          disabled={!bun}
        >
          {user ? 'Оформить заказ' : 'Авторизуйся('}
        </Button>
      </article>
    </section>
  );
};

export default BurgerConstructor;
