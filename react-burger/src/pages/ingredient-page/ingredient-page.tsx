import { FC } from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

const IngredientPage: FC = () => {
  return (
    <div className={styles.ingredient__wrapp}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
