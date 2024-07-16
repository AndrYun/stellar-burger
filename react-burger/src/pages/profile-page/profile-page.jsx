import { NavLink, Outlet } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-page.module.css';

const ProfilePage = () => {
  return (
    <div className={styles.profilepage__container}>
      <div className={styles.profilepage__inputs}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input type={'text'} placeholder={'Имя'} icon={'EditIcon'} />
        <Input type={'email'} placeholder={'Логин'} icon={'EditIcon'} />
        <Input type={'password'} placeholder={'Пароль'} icon={'EditIcon'} />
      </div>
    </div>
  );
};

export default ProfilePage;
