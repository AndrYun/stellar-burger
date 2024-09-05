export const mockIngredient = [
  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
  },
];

export const mockOrder = {
  success: true,
  name: 'Space флюоресцентный минеральный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
      },
      {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
        __v: 0,
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
    ],
    _id: '66d99627119d45001b504652',
    owner: {
      name: 'Андрей',
      email: 'race-95@mail.ru',
      createdAt: '2024-07-18T12:40:42.659Z',
      updatedAt: '2024-08-20T16:29:41.792Z',
    },
    status: 'done',
    name: 'Space флюоресцентный минеральный бургер',
    createdAt: '2024-09-05T11:29:43.989Z',
    updatedAt: '2024-09-05T11:29:44.512Z',
    number: 51999,
    price: 2356,
  },
};

export const mockUserData = {
  name: 'vasiliy',
  email: 'vasiliybaptist@yopmail.com',
};

export const mockRegisterData = {
  name: 'vasiliy',
  email: 'vasiliybaptist@yopmail.com',
  password: '012345',
};

export const mockLoginData = {
  name: 'vasiliy',
  email: 'vasiliybaptist@yopmail.com',
};

export const mockError = new Event('error');

export const mockOrderFeedAndHistory = {
  success: true,
  orders: [
    {
      _id: '66d99a03119d45001b50467d',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c',
      ],
      status: 'done',
      name: 'Краторный space минеральный фалленианский бургер',
      createdAt: '2024-09-05T11:46:11.466Z',
      updatedAt: '2024-09-05T11:46:11.969Z',
      number: 52000,
    },
    {
      _id: '66d99627119d45001b504652',
      ingredients: [
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
      ],
      status: 'done',
      name: 'Space флюоресцентный минеральный бургер',
      createdAt: '2024-09-05T11:29:43.989Z',
      updatedAt: '2024-09-05T11:29:44.512Z',
      number: 51999,
    },
  ],
  total: 51626,
  totalToday: 48,
};
