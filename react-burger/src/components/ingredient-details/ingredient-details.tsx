import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../utils/hooks';
import styles from './ingredient-details.module.css';
import { selectIngredients } from '../../services/slices/burger-ingredients-slice';
import { IIngredient } from '../utils/types';

interface IIngredientDetailsProps {
  ingredient?: IIngredient;
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({ ingredient }) => {
  const { ingredientId } = useParams();
  const ingredients = useTypedSelector(selectIngredients);
  const data =
    ingredient ||
    ingredients.find((el: IIngredient) => el._id === ingredientId);

  if (!data) {
    return <p>Ingredient not found</p>;
  }

  return (
    <div className={styles.modal__ingredient_wrapp}>
      <h2 className={styles.modal__ingredient_title}>Детали ингредиента</h2>
      <div className={styles.modal__ingredient_img_name}>
        <img src={data.image_large} alt={data.name} />
        <h3>{data.name}</h3>
      </div>
      <ul className={styles.modal__ingredient_profits}>
        <li className={styles.modal__ingredient_li}>
          <p>Калории,ккал</p>
          <div className={styles.modal__ingredient_digits}>{data.calories}</div>
        </li>
        <li>
          <p>Белки, г</p>
          <div className={styles.modal__ingredient_digits}>{data.proteins}</div>
        </li>
        <li>
          <p>Жиры, г</p>
          <div className={styles.modal__ingredient_digits}>{data.fat}</div>
        </li>
        <li>
          <p>Углеводы, г</p>
          <div className={styles.modal__ingredient_digits}>
            {data.carbohydrates}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
