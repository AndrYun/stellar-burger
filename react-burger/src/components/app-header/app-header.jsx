import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { selectUser } from '../../services/slices/user-auth-slice';
import styles from './app-header.module.css';

const AppHeader = () => {
  // состояния для ховер
  const [isHoveredConstructor, setIsHoveredConstructor] = useState(false);
  const [isHoveredOrderList, setIsHoveredOrderList] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);
  const user = useSelector(selectUser);

  return (
    <header className={styles.header_wrapp}>
      <nav>
        <ul className={styles.header__leftside_wrapp}>
          <li
            onMouseEnter={() => setIsHoveredConstructor(true)}
            onMouseLeave={() => setIsHoveredConstructor(false)}
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? styles.constructor_of
                  : `${styles.constructor_of} ${styles.inactive}`
              }
              to="/"
            >
              <BurgerIcon
                type={!isHoveredConstructor ? 'secondary' : 'primary'}
              />
              <p>Конструктор</p>
            </NavLink>
          </li>
          <li
            onMouseEnter={() => setIsHoveredOrderList(true)}
            onMouseLeave={() => setIsHoveredOrderList(false)}
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? styles.order_list
                  : `${styles.order_list} ${styles.inactive}`
              }
              to="/order-list"
            >
              <ListIcon type={!isHoveredOrderList ? 'secondary' : 'primary'} />
              <p>Лента заказов</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.header__logo_wrapp}>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div
        onMouseEnter={() => setIsHoveredProfile(true)}
        onMouseLeave={() => setIsHoveredProfile(false)}
      >
        <NavLink
          className={({ isActive }) =>
            isActive
              ? styles.header__profile_wrapp
              : `${styles.header__profile_wrapp} ${styles.inactive}`
          }
          to="/profile"
        >
          <ProfileIcon type={!isHoveredProfile ? 'secondary' : 'primary'} />
          <p>{user ? user.name : 'Личный кабинет'}</p>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
