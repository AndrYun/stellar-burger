import { useCallback, useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';

function App() {
  const [dataIngredients, setDataIngredients] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModalHandler = useCallback((content) => {
    setModalContent(content);
    setIsModalOpen(true);
  }, []);

  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
  }, []);

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
          <ModalOverlay isOpen={isModalOpen} onClose={closeModalHandler}>
            <Modal onClose={closeModalHandler}>{modalContent}</Modal>
          </ModalOverlay>
        )}
        {error && <p>Error: {error.message}</p>}
        {dataIngredients && (
          <BurgerIngredients
            openModal={(ingredient) =>
              openModalHandler(<IngredientDetails ingredient={ingredient} />)
            }
            ingredients={dataIngredients}
          />
        )}
        {dataIngredients && (
          <BurgerConstructor
            openModal={(ingredient) =>
              openModalHandler(<OrderDetails ingredient={ingredient} />)
            }
            ingredients={dataIngredients}
          />
        )}
      </main>
    </>
  );
}

export default App;
