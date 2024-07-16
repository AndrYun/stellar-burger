import { useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import { Link } from 'react-router-dom';
import { request } from '../../components/utils/request';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [codeFromEmail, setCodeFromEmail] = useState('');

  // запрос
  const resetPasswordHandler = async (password, token) => {
    try {
      const response = await request('/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      }).then((res) => res.json());

      if (response.success) {
        return response;
      } else {
        throw new Error('Не удалось восстановить пароль :(');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // submit form
  const requestSubmit = (e) => {
    e.preventDefault();
    resetPasswordHandler(newPassword, codeFromEmail);
  };

  return (
    <div className={styles.resetpasswordpage__container}>
      <form onSubmit={requestSubmit}>
        <div className={styles.resetpasswordpage__inputs}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            icon={'ShowIcon'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            value={codeFromEmail}
            onChange={(e) => setCodeFromEmail(e.target.value)}
          />
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!newPassword || !codeFromEmail}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <div className={styles.resetpasswordpage__remember_password}>
        <p>Вспомнили парроль?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
