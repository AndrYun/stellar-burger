import { useTypedSelector } from '../utils/hooks';
import { useLocation, Navigate } from 'react-router-dom';
import {
  selectAuthChecked,
  selectUser,
} from '../../services/slices/user-auth-slice';

interface IProtectedRouteElementProps {
  onlyUnAuth: boolean;
  component: JSX.Element;
}

interface IComponent {
  component: JSX.Element;
}

const ProtectedRouteElement = ({
  onlyUnAuth,
  component,
}: IProtectedRouteElementProps): JSX.Element | null => {
  const authHasChecked = useTypedSelector(selectAuthChecked);
  const user = useTypedSelector(selectUser);
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

export const OnlyAuth = ({ component }: IComponent): JSX.Element | null => (
  <ProtectedRouteElement onlyUnAuth={false} component={component} />
); // для роутов которые требуют авторизации

export const OnlyUnAuth = ({ component }: IComponent): JSX.Element | null => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
