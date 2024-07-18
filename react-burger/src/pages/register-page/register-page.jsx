import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthChecked,
  selectUser,
  setUser,
} from '../../services/slices/user-auth-slice';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../components/utils/request';
import styles from './register-page.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // подписка на состояния в authUserSlice
  // const user = useSelector(selectUser);
  // console.log(user);

  // запрос на регистрацию пользователя
  const userRegisterHandler = async (email, password, name) => {
    try {
      const response = await request('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      }).then((res) => res.json());
      if (response.success) {
        dispatch(setUser(response.user));
        navigate('/');
      } else {
        throw new Error('Жаль, но зарегаться не судьба');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // submit form
  const requestSubmit = (e) => {
    e.preventDefault();
    userRegisterHandler(email, password, name);
  };

  return (
    <div className={styles.registerpage__container}>
      <form onSubmit={requestSubmit}>
        <div className={styles.registerpage__inputs}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <Input
            type={'text'}
            placeholder={'Имя'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            icon={'ShowIcon'}
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!name || !email || !password}
          >
            Зарегестрировать
          </Button>
        </div>
      </form>
      <div className={styles.registerpage__register}>
        <p>Уже зарегестрированы?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
