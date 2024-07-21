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
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPassword from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import OrderHistory from '../../pages/order-history-page/order-history';
import LayoutSideLinks from '../../pages/profile-page/layout/profilepage-layout-sidelinks';
import OrderList from '../order-list/order-list';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import {
  OnlyAuth,
  OnlyUnAuth,
} from '../protected-route-element/protected-route-element';
import { authUserChecking } from '../../services/slices/user-auth-slice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(authUserChecking()); // проверка на аторизацию пользователя
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
    navigate(background?.pathname || '/', { replace: true });
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
        {isLoadingByApi ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <Routes location={background || location}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<OnlyUnAuth component={<LoginPage />} />}
              />
              <Route
                path="/register"
                element={<OnlyUnAuth component={<RegisterPage />} />}
              />
              <Route
                path="/forgot-password"
                element={<OnlyUnAuth component={<ForgotPassword />} />}
              />
              <Route
                path="/reset-password"
                element={<OnlyUnAuth component={<ResetPasswordPage />} />}
              />
              <Route
                path="/profile"
                element={<OnlyAuth component={<LayoutSideLinks />} />}
              >
                <Route
                  index
                  element={<OnlyAuth component={<ProfilePage />} />}
                />
                <Route
                  path="orders"
                  element={<OnlyAuth component={<OrderHistory />} />}
                />
              </Route>
              <Route
                path="/order-list"
                element={<OnlyAuth component={<OrderList />} />}
              />
              <Route
                path="/ingredient/:ingredientId"
                element={<IngredientPage />}
              />
              <Route path="*" element={<HomePage />} />
            </Routes>
            {background && (
              <Routes>
                <Route
                  path="/ingredient/:ingredientId"
                  element={
                    modalIsOpen && (
                      <Modal
                        onClose={closeModalHandler}
                        size={modalContentType}
                      >
                        {renderModalContent()}
                      </Modal>
                    )
                  }
                />
              </Routes>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
