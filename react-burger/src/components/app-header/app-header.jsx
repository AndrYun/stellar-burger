import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useState } from 'react';

const AppHeader = () => {
  const [isHoveredConstructor, setIsHoveredConstructor] = useState(false);
  const [isHoveredOrderList, setIsHoveredOrderList] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);

  return (
    <header className={styles.header_wrapp}>
      <nav>
        <ul className={styles.header__leftside_wrapp}>
          <li
            onMouseEnter={() => setIsHoveredConstructor(true)}
            onMouseLeave={() => setIsHoveredConstructor(false)}
            className={styles.constructor_of}
          >
            <a>
              <BurgerIcon
                type={!isHoveredConstructor ? 'secondary' : 'primary'}
              />
            </a>
            <p
              className={
                !isHoveredConstructor
                  ? 'text text_type_main-default text_color_inactive'
                  : 'text text_type_main-default'
              }
            >
              Конструктор
            </p>
          </li>
          <li
            onMouseEnter={() => setIsHoveredOrderList(true)}
            onMouseLeave={() => setIsHoveredOrderList(false)}
            className={styles.order_list}
          >
            <a>
              <ListIcon type={!isHoveredOrderList ? 'secondary' : 'primary'} />
            </a>
            <p
              className={
                !isHoveredOrderList
                  ? 'text text_type_main-default text_color_inactive'
                  : 'text text_type_main-default'
              }
            >
              Лента заказов
            </p>
          </li>
        </ul>
      </nav>
      <div className={styles.header__logo_wrapp}>
        <Logo />
      </div>
      <div
        onMouseEnter={() => setIsHoveredProfile(true)}
        onMouseLeave={() => setIsHoveredProfile(false)}
        className={styles.header__profile_wrapp}
      >
        <a>
          <ProfileIcon type={!isHoveredProfile ? 'secondary' : 'primary'} />
        </a>
        <p
          className={
            !isHoveredProfile
              ? 'text text_type_main-default text_color_inactive'
              : 'text text_type_main-default'
          }
        >
          Личный кабинет
        </p>
      </div>
    </header>
  );
};

export default AppHeader;
