import { FC, useEffect, useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  fetchUserData,
  selectUser,
  updateUserData,
} from '../../services/slices/user-auth-slice';
import styles from './profile-page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const user = useSelector(selectUser);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      dispatch(fetchUserData());
    } else {
      setName(user.name || '');
      setEmail(user.email || '');
      setPassword('');
    }
  }, [user, dispatch, navigate]);

  // сохранение измененных данных
  const handleSave = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    await dispatch(updateUserData({ name, email, password })).unwrap();
  };

  // отмена изменений
  const cancelChanges = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
    }
  };

  return (
    <div className={styles.profilepage__container}>
      <form onSubmit={handleSave} className={styles.profilepage__inputs}>
        <h1 className="text text_type_main-medium">Профиль</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          icon={'EditIcon'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {email !== user.email || name !== user.name ? (
          <div className={styles.profilepage__bts}>
            <Button
              type="primary"
              size="medium"
              htmlType="reset"
              onClick={cancelChanges}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              size="medium"
              type="primary"
              disabled={!email && !name && !password}
            >
              Сохранить
            </Button>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
