import { useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={styles.loginpage__container}>
      <div className={styles.loginpage__inputs}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
          disabled={!login || !password}
        >
          Войти
        </Button>
      </div>
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
