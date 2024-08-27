import { useTypedSelector } from '../utils/hooks';
import styles from './order-details.module.css';
import doneOrderImage from '../images/done.png';
import { selectOrder } from '../../services/slices/order-details-slice';
import { FC } from 'react';

const OrderDetails: FC = () => {
  const { data } = useTypedSelector(selectOrder);
  return (
    <section className={styles.orderdetails__wrapp}>
      <p className="text text_type_digits-large">{data?.order?.number}</p>
      <p className={styles.orderdetails__identify}>идентификатор заказа</p>
      <img src={doneOrderImage} alt="done" />
      <p className={styles.orderdetails__comment_1}>
        Ваш заказ начали готовить
      </p>
      <p className={styles.orderdetails__comment_2}>
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};

export default OrderDetails;
