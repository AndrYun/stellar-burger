import { useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { Link } from 'react-router-dom';
import { login } from '../../services/slices/user-auth-slice';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // submit request на авторизацию
  const requestSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.loginpage__container}>
      <form onSubmit={requestSubmit}>
        <div className={styles.loginpage__inputs}>
          <h1 className="text text_type_main-medium">Вход</h1>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!email || !password}
          >
            Войти
          </Button>
        </div>
      </form>
      <div className={styles.loginpage__register}>
        <p>Вы - новый пользователь?</p>
        <Link to="/register">Зарегестрироваться</Link>
      </div>
      <div className={styles.loginpage__forgot_password}>
        <p>Забыли парроль?</p>
        <Link to="/forgot-password">Восстановить пароль</Link>
      </div>
    </div>
  );
};

export default LoginPage;
