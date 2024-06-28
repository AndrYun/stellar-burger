import { useCallback, useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchIngredients,
  selectIsLoadingByApi,
  selectIngredients,
  selectError,
} from '../../services/slices/burger-ingredients-slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // подписка на события из ingredientsSlice
  const ingredients = useSelector(selectIngredients);
  const isLoadingByApi = useSelector(selectIsLoadingByApi);
  const error = useSelector(selectError);

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
        <IngredientDetails ingredient={ingredient} />, // Pass individual ingredient
        'ingredient'
      ),
    [openModalHandler]
  );

  return (
    <>
      <AppHeader />
      <main className={styles.burger__container}>
        {isModalOpen && (
          <Modal onClose={closeModalHandler} size={modalSize}>
            {modalContent}
          </Modal>
        )}
        {isLoadingByApi ? (
          <p>Loading...</p> // Indicate loading state
        ) : error ? (
          <p>{error}</p> // Display error message
        ) : (
          <>
            <BurgerIngredients
              openModal={openModalWithContent}
              ingredients={ingredients}
            />
            <BurgerConstructor
              openModal={() => openModalHandler(<OrderDetails />, 'order')}
              ingredients={ingredients}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
