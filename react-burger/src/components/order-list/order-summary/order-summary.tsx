import { FC } from 'react';
import { useTypedSelector } from '../../utils/hooks';
import styles from './order-summary.module.css';

export const OrderSummary: FC = () => {
  const { orderFeed } = useTypedSelector((state) => state.feedSocket);

  return (
    <div>
      <div className={styles.status}>
        <div className={styles.ready}>
          <p className="text text_type_main-medium mb-4">Готовы:</p>
          <div className={styles.ready_nubmers}>
            {orderFeed?.orders.map((order, index) => {
              if (order.status === 'done' && index < 20) {
                return (
                  <p
                    key={index}
                    className="text text_type_digits-default mt-2 mr-15"
                  >
                    {order.number}
                  </p>
                );
              }
            })}
          </div>
        </div>
        <div className={styles.in_work}>
          <p className="text text_type_main-medium mb-4">В работе:</p>
          <div className={styles.in_work_nubmers}>
            {orderFeed?.orders.map((order, index) => {
              if (order.status === 'pending' && index < 20) {
                return (
                  <p
                    key={index}
                    className="text text_type_digits-default mt-2 mr-15"
                  >
                    {order.number}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </div>
      <p className="text text_type_main-medium mt-15">
        Выполнено за все время:
      </p>
      <p className="text text_type_digits-large">{orderFeed?.total}</p>
      <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{orderFeed?.totalToday}</p>
    </div>
  );
};
