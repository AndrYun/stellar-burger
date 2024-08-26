import { FC, useEffect } from 'react';
import styles from './order-info.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../utils/hooks';
import { ImageIngredient } from '../image-ingredient/image-ingredient';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IIngredient, IOrderFeedOptions } from '../utils/types';
import { wsURL } from '../utils/url';
import {
  feedConnect,
  feedDisconnect,
} from '../../services/web-socket/actions/feed';
import {
  orderHistoryClose,
  orderHistoryStart,
} from '../../services/web-socket/actions/order-history';

export const OrderInfo: FC = () => {
  const { ingredients } = useTypedSelector((state) => state.ingredients);
  const { orderFeed } = useTypedSelector((state) => state.feedSocket);
  const { orderHistory } = useTypedSelector((state) => state.historySocket);
  const dispatch = useDispatch();
  const location = useLocation();
  const { feedId, orderId } = useParams();
  const navigate = useNavigate();
  let totalPrice: number = 0;
  let data: IOrderFeedOptions = null!;
  let orderIngredients: IIngredient[] = [];
  let orderDate: Date | null = null;
  let dataReduce: { [key: string]: number } = {};

  useEffect(() => {
    if (!orderFeed && feedId) {
      dispatch(feedConnect(`${wsURL}/all`));
      return () => {
        dispatch(feedDisconnect('closed by user'));
      };
    }
    if (!orderHistory && orderId) {
      const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
      if (token) {
        dispatch(orderHistoryStart(`${wsURL}?token=${token}`));
      }
      return () => {
        dispatch(orderHistoryClose('closed by user'));
      };
    }
  }, [dispatch]);

  if (orderFeed && orderFeed.orders.length) {
    orderFeed.orders.forEach((order, index) => {
      if (order._id === feedId || order._id === orderId) {
        data = order;
        orderDate = new Date(data.createdAt);
        dataReduce = data.ingredients.reduce(
          (acc: { [key: string]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
          },
          {}
        );
      }
      if (index + 1 === orderFeed.orders.length && data === null) {
        return navigate('/*', { replace: true });
      }
    });
  }

  if (dataReduce && ingredients && ingredients.length) {
    for (let key in dataReduce) {
      ingredients.forEach((element) => {
        if (element._id === key) {
          if (element.type === 'bun') {
            totalPrice = totalPrice + element.price * 2;
            orderIngredients = [...orderIngredients, { ...element }];
          } else {
            totalPrice = totalPrice + element.price;
            orderIngredients = [...orderIngredients, { ...element }];
          }
        }
      });
    }
  }

  return data !== null ? (
    <div className={styles.info}>
      {!location.state && (
        <div className={styles.number}>
          <p className="text text_type_digits-default mt-6">#{data.number}</p>
        </div>
      )}
      <div className={styles.description}>
        <p className="text text_type_main-medium mt-10">{data.name}</p>
        {data.status === 'created' && (
          <p className="text text_type_main-default mt-2">Создан</p>
        )}
        {data.status === 'pending' && (
          <p className="text text_type_main-default mt-2">Готовится</p>
        )}
        {data.status === 'done' && (
          <div className={styles.done}>
            <p className="text text_type_main-default mt-2">Выполнен</p>
          </div>
        )}
        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      </div>
      <ul className={styles.ingredients}>
        {orderIngredients.map((ingredient) => {
          if (ingredient.type === 'bun') {
            return (
              <li key={ingredient._id} className={styles.ingredient}>
                <div className={styles.picture}>
                  <ImageIngredient ingredient={ingredient} />
                  <p className="text text_type_main-default ml-4">
                    {ingredient.name}
                  </p>
                </div>
                <div className={styles.price}>
                  <p className="text text_type_digits-default mr-2">
                    2 x {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          } else {
            return (
              <li key={ingredient._id} className={styles.ingredient}>
                <div className={styles.picture}>
                  <ImageIngredient ingredient={ingredient} />
                  <p className="text text_type_main-default ml-4">
                    {ingredient.name}
                  </p>
                </div>
                <div className={styles.price}>
                  <p className="text text_type_digits-default mr-2">
                    {ingredient.__v} x {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          }
        })}
      </ul>
      <div className={styles.footer}>
        {orderDate && (
          <p className="text text_type_main-default text_color_inactive mt-10 mb-10">
            <FormattedDate date={orderDate} />
          </p>
        )}
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : (
    <p className="text text_type_main-large mt-10 mb-10">Загрузка...</p>
  );
};
