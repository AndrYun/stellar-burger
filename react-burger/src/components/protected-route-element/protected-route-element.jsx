import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import {
  selectAuthChecked,
  selectUser,
} from '../../services/slices/user-auth-slice';

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
  const authHasChecked = useSelector(selectAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  // первая проверка
  if (!authHasChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    // пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // делаем редирект на главную страницу или на тот адрес, что в location.state.from
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // !onlyUnAuth && user - пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = ProtectedRouteElement; // для роутов которые требуют авторизации

export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);

export const OnlyAfterEmail = ({ component }) => (
  <ProtectedRouteElement
    onlyUnAuth={true}
    onlyAfterEmail={true}
    component={component}
  />
);
