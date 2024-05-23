import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import data_bun from '../utils/data';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

ConstructorElement.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
};

const BurgerConstructor = () => {
  const getSum = () => {
    let sum = 0;
    for (let i = 0; i < data_bun.length; i++) {
      sum += data_bun[i].price;
      console.log('Hello');
    }
    return sum;
  };

  useEffect(() => getSum, [data_bun.price]);
  return (
    <main className={styles.burgerconstructor__container}>
      <section>
        <article className={styles.burgerconstructor__picker_section}>
          {data_bun.map(
            (el) =>
              el.name === 'Краторная булка N-200i' && (
                <ConstructorElement
                  {...el}
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
            {data_bun.map(
              (el) =>
                el.type !== 'bun' && (
                  <div
                    {...el}
                    key={el._id}
                    className={styles.burgerconstructor__middle_elements}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      {...el}
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image_mobile}
                    />
                  </div>
                )
            )}
          </div>
          {data_bun.map(
            (el) =>
              el.name === 'Краторная булка N-200i' && (
                <ConstructorElement
                  {...el}
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
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </article>
      </section>
    </main>
  );
};

export default BurgerConstructor;
