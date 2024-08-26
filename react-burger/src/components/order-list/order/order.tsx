import { FC } from 'react';
import styles from './order.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderFeedOptions } from '../../utils/types';
import { IIngredient } from '../../utils/types';
import { useSelector } from 'react-redux';
import { ImageIngredient } from '../../image-ingredient/image-ingredient';
import { selectIngredients } from '../../../services/slices/burger-ingredients-slice';

export const Order: FC<{ status?: boolean; order: IOrderFeedOptions }> = ({
  status,
  order,
}) => {
  const orderDate = new Date(order.createdAt);
  const ingredients = useSelector(selectIngredients);
  let totalPrice: number = 0;
  let orderIngredients: IIngredient[] = [];

  if (ingredients.length) {
    order.ingredients.forEach((ingredient) => {
      ingredients.forEach((element) => {
        if (element._id === ingredient) {
          if (element.type === 'bun') {
            totalPrice = totalPrice + element.price * 2;
            orderIngredients = [...orderIngredients, { ...element }];
          } else {
            totalPrice = totalPrice + element.price;
            orderIngredients = [...orderIngredients, { ...element }];
          }
        }
      });
    });
  }

  return (
    <div className={styles.order__wrapp}>
      <div className={styles.order__top}>
        <p className="text text_type_digits-default mt-6">#{order.number}</p>
        <p className='text text_type_main-default text_color_inactive mt-6"'>
          <FormattedDate date={orderDate} />
        </p>
      </div>
      <p className="text text_type_main-medium mt-6">{order.name}</p>
      {status && order.status === 'created' && (
        <p className="text text_type_main-default mt-2">Создан</p>
      )}
      {status && order.status === 'pending' && (
        <p className="text text_type_main-default mt-2">Готовится</p>
      )}
      {status && order.status === 'done' && (
        <div className={styles.order__done}>
          <p className="text text_type_main-default mt-2">Выполнен</p>
        </div>
      )}
      <div className={styles.order__info}>
        <div className={styles.order__info_compound}>
          {orderIngredients.map((ingredient, index) => {
            if (index < 5) {
              return (
                <div
                  key={index}
                  className={styles.order__info_ingredient}
                  style={{ zIndex: 10 - index }}
                >
                  <ImageIngredient ingredient={ingredient} />
                </div>
              );
            }
          })}
          {orderIngredients.length == 6 && (
            <div className={styles.ingredient} style={{ zIndex: 4 }}>
              <ImageIngredient ingredient={orderIngredients[5]} />
            </div>
          )}
          {orderIngredients.length > 6 && (
            <div className={styles.ingredient} style={{ zIndex: 4 }}>
              <ImageIngredient
                ingredient={orderIngredients[5]}
                extraQuantity={order.ingredients.length - 6}
              />
            </div>
          )}
        </div>
        <div className={styles.order__info_price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
