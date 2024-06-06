import styles from './ingredient.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from '../utils/types';

const Ingredient = ({ ingredient, onClick }) => {
  return (
    <div onClick={onClick} className={styles.cardbun_wrapp}>
      <div className={styles.cardbun__img_wrapp}>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>
      <div className={styles.cardbun__price_wrapp}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.cardbun__name_wrapp}>{ingredient.name}</div>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;
