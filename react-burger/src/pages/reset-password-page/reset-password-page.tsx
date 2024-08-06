import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmailSubmited } from '../../services/slices/user-auth-slice';
import { resetPassword } from '../../services/slices/user-auth-slice';

const ResetPasswordPage: FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [codeFromEmail, setCodeFromEmail] = useState<string>('');
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const isEmailSent = useSelector(selectEmailSubmited);

  useEffect(() => {
    if (!isEmailSent) {
      navigate('/forgot-password');
    }
  }, [isEmailSent, navigate]);

  // submit form
  const requestSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        // @ts-ignore
        resetPassword({ password: newPassword, token: codeFromEmail })
      ).unwrap();
      navigate('/login');
    } catch (error: unknown) {
      console.log('Reset password failed: ', error);
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            value={codeFromEmail}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCodeFromEmail(e.target.value)
            }
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
