import orderReducer, { sendOrder } from './order-details-slice';

const mockOrder = {
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

describe('check order request', () => {
  const initialState = {
    data: {
      success: false,
      name: undefined,
      order: {
        number: undefined,
      },
    },
    isLoading: false,
    error: null,
  };
  it('should send order pending', () => {
    const state = orderReducer(initialState, sendOrder.pending('pending'));

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it('should send order fulfilled', () => {
    const state = orderReducer(
      initialState,
      sendOrder.fulfilled(mockOrder, 'fulfilled')
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(mockOrder);
  });

  it('should send order rejected', () => {
    const error = 'Something went wrong';
    const state = orderReducer(
      initialState,
      sendOrder.rejected(error, 'rejected')
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });
});
