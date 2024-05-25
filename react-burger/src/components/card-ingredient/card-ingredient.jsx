import styles from './card-ingredient.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const CardIngredient = ({ image, name, price, onClick }) => {
  return (
    <div onClick={onClick} className={styles.cardbun_wrapp}>
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

CardIngredient.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default CardIngredient;
