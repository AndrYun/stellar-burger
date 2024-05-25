import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './app.module.css';

function App() {
  const [dataIngredients, setDataIngredients] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModelOpen] = useState(false);

  const openModalHandler = () => {
    setIsModelOpen(true);
  };

  const closeModalHandler = () => {
    setIsModelOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://norma.nomoreparties.space/api/ingredients'
        );
        if (!res.ok) {
          throw new Error('Space ingredients is not available now :(');
        }
        const result = await res.json();
        setDataIngredients(result.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [dataIngredients]);

  return (
    <>
      <AppHeader />
      <main className={styles.burger__container}>
        <ModalOverlay isOpen={isModalOpen} onClose={closeModalHandler}>
          <Modal onClose={closeModalHandler}>
            <h2>Детали ингредиента</h2>
          </Modal>
        </ModalOverlay>
        {error && <p>Error: {error.message}</p>}
        {dataIngredients && (
          <BurgerIngredients
            openModal={openModalHandler}
            ingredients={dataIngredients}
          />
        )}
        {dataIngredients && <BurgerConstructor ingredients={dataIngredients} />}
      </main>
    </>
  );
}

export default App;
