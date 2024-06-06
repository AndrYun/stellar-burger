import { useCallback, useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';

function App() {
  const [dataIngredients, setDataIngredients] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState('ingredient');

  const openModalHandler = useCallback((content, size) => {
    setModalContent(content);
    setIsModalOpen(true);
    setModalSize(size);
  }, []);

  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
  }, []);

  const openModalWithContent = useCallback(
    (ingredient) =>
      openModalHandler(
        <IngredientDetails ingredient={ingredient} />,
        'ingredient'
      ),
    [openModalHandler]
  );

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
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.burger__container}>
        {isModalOpen && (
          <Modal onClose={closeModalHandler} size={modalSize}>
            {modalContent}
          </Modal>
        )}
        {error && <p>Error: {error.message}</p>}
        {dataIngredients && (
          <BurgerIngredients
            openModal={openModalWithContent}
            ingredients={dataIngredients}
          />
        )}
        {dataIngredients && (
          <BurgerConstructor
            openModal={() => openModalHandler(<OrderDetails />, 'order')}
            ingredients={dataIngredients}
          />
        )}
      </main>
    </>
  );
}

export default App;
