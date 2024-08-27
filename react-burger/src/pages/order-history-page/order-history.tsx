import { FC, useEffect } from 'react';
import styles from './order-history.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../components/utils/hooks';
import {
  orderHistoryClose,
  orderHistoryStart,
} from '../../services/web-socket/actions/order-history';
import { wsURL } from '../../components/utils/url';
import { Order } from '../../components/order-list/order/order';

const OrderHistory: FC = () => {
  const location = useLocation();
  const dispatch = useTypedDispatch();
  const { orderHistory } = useTypedSelector((state) => state.historySocket);

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    if (token) {
      dispatch(orderHistoryStart(`${wsURL}?token=${token}`));
    }
    return () => {
      dispatch(orderHistoryClose('closed by user'));
    };
  }, [dispatch]);

  return orderHistory ? (
    <ul className={styles.list}>
      {orderHistory.orders
        .map((order) => {
          return (
            <Link
              to={`/profile/orders/${order.number}`}
              state={{ background: location, orderNumber: order.number }}
              className={styles.link}
              key={order._id}
            >
              <li className={styles.item}>
                <Order order={order} status={true} />
              </li>
            </Link>
          );
        })
        .reverse()}
    </ul>
  ) : (
    <></>
  );
};

export default OrderHistory;
