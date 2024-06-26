import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from '../utils/types';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ ingredients, openModal }) => {
  const getSum = () => {
    let sum = 0;
    for (let i = 0; i < ingredients.length; i++) {
      sum += ingredients[i].price;
      console.log('Hello');
    }
    return sum;
  };

  return (
    <div className={styles.burgerconstructor__container}>
      <section>
        <article className={styles.burgerconstructor__picker_section}>
          {ingredients.map(
            (el) =>
              el.name === 'Краторная булка N-200i' && (
                <ConstructorElement
                  key={el._id}
                  type="top"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price={el.price}
                  thumbnail={el.image_mobile}
                />
              )
          )}
          <div className={`${styles.burgerconstructor__middle} custom-scroll`}>
            {ingredients.map(
              (el) =>
                el.type !== 'bun' && (
                  <div
                    key={el._id}
                    className={styles.burgerconstructor__middle_elements}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image_mobile}
                    />
                  </div>
                )
            )}
          </div>
          {ingredients.map(
            (el) =>
              el.name === 'Краторная булка N-200i' && (
                <ConstructorElement
                  key={el._id}
                  type="bottom"
                  isLocked={true}
                  text="Краторная булка N-200i (низ)"
                  price={el.price}
                  thumbnail={el.image_mobile}
                />
              )
          )}
        </article>
        <article className={styles.burgerconstructor__order}>
          <div className={styles.burgerconstructor__order_currency}>
            <p className="text text_type_digits-medium">{getSum()}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            onClick={() => openModal()}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </article>
      </section>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
