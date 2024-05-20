import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header_wrapp}>
      <nav>
        <ul className={styles.header__leftside_wrapp}>
          <li className={styles.constructor_of}>
            <a href="">
              <BurgerIcon type="primary" />
            </a>
            <p className="text text_type_main-default">Конструктор</p>
          </li>
          <li className={styles.order_list}>
            <a href="">
              <ListIcon type="secondary" />
            </a>
            <p className="text text_type_main-default">Лента заказов</p>
          </li>
        </ul>
      </nav>
      <div className={styles.header__logo_wrapp}>
        <Logo />
      </div>
      <div className={styles.header__profile_wrapp}>
        <a href="">
          <ProfileIcon type="secondary" />
        </a>
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </header>
  );
};

export default AppHeader;
