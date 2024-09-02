import { FC, ReactNode } from 'react';
import styles from './ingredient-info.module.css';

export const IngredientInfo: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.ingredient}>{children}</div>;
};
