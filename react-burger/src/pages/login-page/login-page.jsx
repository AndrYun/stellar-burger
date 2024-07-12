import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className={styles.loginpage__container}>
      <div className={styles.loginpage__inputs}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input type={'email'} placeholder={'E-mail'} />
        <Input type={'password'} placeholder={'Пароль'} icon={'ShowIcon'} />
        <Button type="primary" size="medium" htmlType="submit">
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
