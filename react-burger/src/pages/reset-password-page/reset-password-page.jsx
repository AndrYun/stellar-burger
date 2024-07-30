import { useEffect, useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmailSubmited } from '../../services/slices/user-auth-slice';
import { resetPassword } from '../../services/slices/user-auth-slice';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [codeFromEmail, setCodeFromEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEmailSent = useSelector(selectEmailSubmited);

  useEffect(() => {
    if (!isEmailSent) {
      navigate('/forgot-password');
    }
  }, [isEmailSent, navigate]);

  // submit form
  const requestSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        resetPassword({ password: newPassword, token: codeFromEmail })
      ).unwrap();
      navigate('/login');
    } catch (error) {
      console.log('Reset password failed: ', error.message);
    }
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
