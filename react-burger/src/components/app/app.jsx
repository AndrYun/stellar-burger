import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import HomePage from '../../pages/home-page';
import styles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchIngredients,
  selectIsLoadingByApi,
  selectIngredients,
  selectError,
} from '../../services/slices/burger-ingredients-slice';
import {
  closeModal,
  selectModalContentId,
  selectModalContentType,
  selectIsOpen,
} from '../../services/slices/modal-slice';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPassword from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';

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

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
