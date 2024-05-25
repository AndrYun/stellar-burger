import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.modal__ingredient_wrapp}>
      <h2 className="text text_type_main-medium mt-2">Детали ингредиента</h2>
      <div className={styles.modal__ingredient_img_name}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <h3>{ingredient.name}</h3>
      </div>
      <ul className={styles.modal__ingredient_profits}>
        <li className={styles.modal__ingredient_li}>
          <p>Калории,ккал</p>
          <div className={styles.modal__ingredient_digits}>
            {ingredient.calories}
          </div>
        </li>
        <li>
          <p>Белки, г</p>
          <div className={styles.modal__ingredient_digits}>
            {ingredient.proteins}
          </div>
        </li>
        <li>
          <p>Жиры, г</p>
          <div className={styles.modal__ingredient_digits}>
            {ingredient.fat}
          </div>
        </li>
        <li>
          <p>Углеводы, г</p>
          <div className={styles.modal__ingredient_digits}>
            {ingredient.carbohydrates}
          </div>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
};

export default IngredientDetails;
