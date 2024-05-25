import styles from './order-details.module.css';

const OrderDetails = () => {
  return (
    <section className={styles.orderdetails__wrapp}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-default">идентификатор заказа</p>
      <img src="./react-burger/src/images/done.png" alt="" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};

export default OrderDetails;
