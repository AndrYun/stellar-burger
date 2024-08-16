import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/slices/user-auth-slice';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './register-page.module.css';

const RegisterPage: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setNewPassword] = useState<string>('');
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  // submit form register
  const requestSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // @ts-ignore
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate('/login');
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className={styles.registerpage__container}>
      <form onSubmit={requestSubmit}>
        <div className={styles.registerpage__inputs}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <Input
            type={'text'}
            placeholder={'Имя'}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            icon={'ShowIcon'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!name || !email || !password}
          >
            Зарегестрировать
          </Button>
        </div>
      </form>
      <div className={styles.registerpage__register}>
        <p>Уже зарегестрированы?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
