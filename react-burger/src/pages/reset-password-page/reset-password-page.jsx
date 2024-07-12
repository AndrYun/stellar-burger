import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  return (
    <div className={styles.resetpasswordpage__container}>
      <div className={styles.resetpasswordpage__inputs}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input
          type={'email'}
          placeholder={'Введите новый пароль'}
          icon={'ShowIcon'}
        />
        <Input type={'password'} placeholder={'Введите код из письма'} />
        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </div>
      <div className={styles.resetpasswordpage__remember_password}>
        <p>Вспомнили парроль?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
