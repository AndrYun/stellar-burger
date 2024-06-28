import { useEffect } from 'react';
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
import {
  openModal,
  closeModal,
  selectContent,
  selectSize,
  selectIsOpen,
} from '../../services/slices/modal-slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // подписка на состояния из ingredientsSlice
  const ingredients = useSelector(selectIngredients);
  const isLoadingByApi = useSelector(selectIsLoadingByApi);
  const error = useSelector(selectError);

  // подписка на состояния из modalSlice
  const modalContent = useSelector(selectContent);
  const modalIsOpen = useSelector(selectIsOpen);
  const modalSize = useSelector(selectSize);

  const openModalHandler = (content, size) => {
    dispatch(openModal({ content, size }));
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const openModalWithContent = (ingredient) =>
    openModalHandler(
      <IngredientDetails ingredient={ingredient} />, // Pass individual ingredient
      'ingredient'
    );

  return (
    <>
      <AppHeader />
      <main className={styles.burger__container}>
        {modalIsOpen && (
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
