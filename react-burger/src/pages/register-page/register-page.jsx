import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register-page.module.css';

const RegisterPage = () => {
  return (
    <div className={styles.registerpage__container}>
      <div className={styles.registerpage__inputs}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type={'text'} placeholder={'Имя'} />
        <Input type={'email'} placeholder={'E-mail'} />
        <Input type={'password'} placeholder={'Пароль'} icon={'ShowIcon'} />
        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </div>
      <div className={styles.registerpage__register}>
        <p>Уже зарегестрированы?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
