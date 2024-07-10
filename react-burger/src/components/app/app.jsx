import { useCallback, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  selectModalContentId,
  selectModalContentType,
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
  const modalIsOpen = useSelector(selectIsOpen);
  const modalContentId = useSelector(selectModalContentId);
  const modalContentType = useSelector(selectModalContentType);

  const openModalHandler = useCallback(
    (contentId, contentType) => {
      dispatch(openModal({ contentId, contentType }));
    },
    [dispatch]
  );

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const openModalWithContent = (ingredient) =>
    openModalHandler(ingredient._id, 'ingredient');

  const renderModalContent = () => {
    if (modalContentType === 'ingredient') {
      const ingredient = ingredients.find(
        (item) => item._id === modalContentId
      );
      return <IngredientDetails ingredient={ingredient} />;
    } else if (modalContentType === 'order') {
      return <OrderDetails />;
    }
    return null;
  };

  return (
    <>
      <AppHeader />
      <main className={styles.burger__container}>
        {modalIsOpen && (
          <Modal onClose={closeModalHandler} size={modalContentType}>
            {renderModalContent()}
          </Modal>
        )}
        {isLoadingByApi ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModal={openModalWithContent} />
            <BurgerConstructor
              openModal={() => openModalHandler(null, 'order')}
            />
          </DndProvider>
        )}
      </main>
    </>
  );
}

export default App;
