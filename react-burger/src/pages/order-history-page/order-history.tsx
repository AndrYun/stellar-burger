import { FC, useEffect } from 'react';
import styles from './order-history.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../components/utils/hooks';
import {
  orderHistoryClose,
  orderHistoryStart,
} from '../../services/web-socket/actions/order-history';
import { wsURL } from '../../components/utils/url';
import { Order } from '../../components/order-list/order/order';

const OrderHistory: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { orderHistory } = useTypedSelector((state) => state.historySocket);

  useEffect(() => {
    dispatch(
      orderHistoryStart(
        `${wsURL}?token=${localStorage.getItem('refreshToken')}`
      )
    );
    return () => {
      dispatch(orderHistoryClose('closed by user'));
    };
  }, []);

  return orderHistory && orderHistory.orders ? (
    <ul className={styles.list}>
      {orderHistory.orders
        .slice()
        .reverse()
        .map((order) => {
          return (
            <Link
              to={`/profile/orders/${order._id}`}
              state={{ background: location, orderNumber: order.number }}
              className={styles.link}
              key={order._id}
            >
              <li className={styles.item}>
                <Order order={order} status={true} />
              </li>
            </Link>
          );
        })}
    </ul>
  ) : (
    <></>
  );
};

export default OrderHistory;
