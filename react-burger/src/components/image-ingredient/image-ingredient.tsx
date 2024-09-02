import { FC } from 'react';
import styles from './image-ingredient.module.css';
import { IIngredient } from '../utils/types';

export const ImageIngredient: FC<{
  extraQuantity?: number;
  ingredient: IIngredient;
}> = ({ extraQuantity, ingredient }) => {
  return (
    <div className={styles.image__border}>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image__border_icon}
      />
      {extraQuantity && extraQuantity !== 0 && (
        <div className={styles.image__border_exta}>
          <p className="text text_type_main-small">+{extraQuantity}</p>
        </div>
      )}
    </div>
  );
};
