// содержит все fetch для запросов
// импортируем их в нужные месте
import { request } from './request';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// fetch на регистрацию
export const userRegisterHandler = async (name, email, password) => {
  const response = await request('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => res.json());
  if (response.success) {
    return response;
  } else {
    throw new Error('Жаль, но зарегаться не судьба');
  }
};

// fetch на авторизацию
export const authUserHandler = async (email, password) => {
  const response = await request('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

  if (response.success) {
    return response;
  } else {
    throw new Error('А ты вообще кто такой?!');
  }
};

// запрос на забыл пароль
export const forgotPasswordRequest = async (email) => {
  try {
    const response = await request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());

    if (response.success && response.message === 'Reset email sent') {
      return response;
    } else {
      throw new Error('Не удалось сбросить пароль :(');
    }
  } catch (error) {
    console.log(error.message);
  }
};

// запрос на сброс пароля /reset-password/reset
export const resetPasswordHandler = async (password, token) => {
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

// функция будет обновлять токены если они уже устарели
export const getUserData = () => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {},
      });
    }, 1000);
  });
};

// обновление токена
export const refreshToken = () => {
  return (
    request(`/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
      .then(checkReponse)
      // !! Важно для обновления токена в мидлваре, чтобы запись
      // была тут, а не в fetchWithRefresh
      .then((refreshData) => {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);
        return refreshData;
      })
  );
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      options.headers.Authorization = `Bearer ${refreshData.accessToken}`;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
