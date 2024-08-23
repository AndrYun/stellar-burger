import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import styles from './order-list.module.css';
// import Order from './order/order';

const OrderList: FC = () => {
  const location = useLocation();
  return (
    <h1>HEllo</h1>
    // <ul className={styles.orderlist__wrapp}>
    //   {/* {orderFeed?.orders.map((order) => { */}
    //   return (
    //   <Link
    //   // key={order._id}
    //   // to={`/feed/${order.number}`}
    //   // state={{ background: location, orderNumber: order.number }}
    //   // className={styles.orderlist__item}
    //   >
    //     <li className={styles.orderlist__item}>
    //       {/* <Order /> */}
    //     </li>
    //   </Link>
    //   );
    //   {/* })} */}
    // </ul>
  );
};

export default OrderList;
