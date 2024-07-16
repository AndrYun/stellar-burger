import { NavLink, Outlet } from 'react-router-dom';
import styles from '../profile-page.module.css';

const LayoutSideLinks = () => {
  return (
    <>
      <div className={styles.profilepage__sidelinks}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.profilepage__profile : styles.inactive
          }
          to="/profile"
        >
          <span>Профиль</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.profilepage__order_history : styles.inactive
          }
          to="/profile/orders"
        >
          <span>История заказов</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.profilepage__logout : styles.inactive
          }
          to="/login"
        >
          <span>Выход</span>
        </NavLink>
        <div className={styles.profilepage__info}>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LayoutSideLinks;
