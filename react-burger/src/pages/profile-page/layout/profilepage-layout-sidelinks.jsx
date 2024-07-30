import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../../../services/slices/user-auth-slice';
import styles from '../profile-page.module.css';

const LayoutSideLinks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout
  const handleLogout = async () => {
    await dispatch(logout(localStorage.getItem('refreshToken'))).unwrap();
    navigate('/login');
  };

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
        <button className={styles.profilepage__logout} onClick={handleLogout}>
          <span>Выход</span>
        </button>
        <div className={styles.profilepage__info}>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LayoutSideLinks;
