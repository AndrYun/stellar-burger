import { useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../components/utils/request';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // запрос
  const forgotPasswordRequest = async (email) => {
    try {
      const response = await request('/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }).then((res) => res.json());

      if (response.success && response.message === 'Reset email sent') {
        navigate('/reset-password');
      } else {
        throw new Error('Не удалось сбросить пароль :(');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // submit form
  const requestSubmit = (e) => {
    e.preventDefault();
    forgotPasswordRequest(email);
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
