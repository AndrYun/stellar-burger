import styles from './order-details.module.css';
import doneOrderImage from '../images/done.png';

const OrderDetails = () => {
  return (
    <section className={styles.orderdetails__wrapp}>
      <p className="text text_type_digits-large">034530</p>
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
