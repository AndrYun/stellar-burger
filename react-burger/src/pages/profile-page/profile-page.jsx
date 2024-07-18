import { NavLink, Outlet } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, selectUser } from '../../services/slices/user-auth-slice';
import styles from './profile-page.module.css';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  // const user = useSelector(selectUser);
  return (
    <div className={styles.profilepage__container}>
      <div className={styles.profilepage__inputs}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input type={'text'} placeholder={'Имя'} icon={'EditIcon'}></Input>
        <Input type={'email'} placeholder={'Логин'} icon={'EditIcon'} />
        <Input type={'password'} placeholder={'Пароль'} icon={'EditIcon'} />
      </div>
    </div>
  );
};

export default ProfilePage;
