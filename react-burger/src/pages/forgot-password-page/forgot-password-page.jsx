import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/slices/user-auth-slice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // submit form
  const requestSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
      navigate('/reset-password');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.forgotpasswordpage__container}>
      <form
        onSubmit={requestSubmit}
        className={styles.forgotpasswordpage__inputs}
      >
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={!email}
        >
          Восстановить
        </Button>
      </form>
      <div className={styles.forgotpasswordpage__login}>
        <p>Вспомнили пароль?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
