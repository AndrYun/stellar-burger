import { useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  return (
    <div className={styles.forgotpasswordpage__container}>
      <div className={styles.forgotpasswordpage__inputs}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={!value}
          onClick={() => navigate('/reset-password')}
        >
          Восстановить
        </Button>
      </div>
      <div className={styles.forgotpasswordpage__login}>
        <p>Вспомнили пароль?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
