import styles from './card-bun.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const CardBun = ({ image, name, price }) => {
  return (
    <div className={styles.cardbun_wrapp}>
      <div className={styles.cardbun__img_wrapp}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.cardbun__price_wrapp}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.cardbun__name_wrapp}>{name}</div>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
};

export default CardBun;
