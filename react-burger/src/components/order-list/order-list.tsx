import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import styles from './order-list.module.css';
import { Order } from './order/order';
import { useTypedSelector } from '../utils/hooks';

const OrderList: FC = () => {
  const location = useLocation();
  const { orderFeed } = useTypedSelector((state) => state.feedSocket);
  return (
    <ul className={styles.list}>
      {orderFeed?.orders.map((order) => {
        return (
          <Link
            key={order._id}
            to={`/feed/${order._id}`}
            state={{ background: location, orderNumber: order.number }}
            className={styles.link}
          >
            <li className={styles.item}>
              <Order order={order} />
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default OrderList;
