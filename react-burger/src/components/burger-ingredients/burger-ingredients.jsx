import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('Булки');
  return (
    <main>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <section style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Three
        </Tab>
      </section>
      <section>
        <article></article>
        <article></article>
        <article></article>
      </section>
    </main>
  );
};

export default BurgerIngredients;
