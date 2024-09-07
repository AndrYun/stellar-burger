import constructorReducer, {
  addBun,
  addIngredient,
  removeBun,
  removeIngredient,
  moveIngredient,
  resetConstructor,
} from './burger-constructor-slice';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('unique-id'),
}));

describe('constructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: [],
  };

  const mockBun = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
  };

  const mockIngredient = {
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
  };

  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle addBun', () => {
    const action = addBun(mockBun);
    const expectedState = {
      bun: mockBun,
      ingredients: [],
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle removeBun', () => {
    const stateBeforeRemoveBun = {
      bun: mockBun,
      ingredients: [],
    };
    const expectedState = {
      bun: null,
      ingredients: [],
    };
    expect(constructorReducer(stateBeforeRemoveBun, removeBun())).toEqual(
      expectedState
    );
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const expectedState = {
      bun: null,
      ingredients: [mockIngredient],
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle removeIngredient', () => {
    const stateBeforeRemoveIngredient = {
      bun: null,
      ingredients: [],
    };
    const action = removeIngredient('unique-id');
    const expectedState = {
      bun: null,
      ingredients: [],
    };
    expect(constructorReducer(stateBeforeRemoveIngredient, action)).toEqual(
      expectedState
    );
  });

  it('should handle moveIngredient', () => {
    const stateBeforeMove = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'id-1' },
        { ...mockIngredient, id: 'id-2' },
      ],
    };
    const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
    const expectedState = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'id-2' },
        { ...mockIngredient, id: 'id-1' },
      ],
    };
    expect(constructorReducer(stateBeforeMove, action)).toEqual(expectedState);
  });

  it('should handle resetConstructor', () => {
    const stateBeforeReset = {
      bun: mockBun,
      ingredients: mockIngredient,
    };
    const expectedState = {
      bun: null,
      ingredients: [],
    };
    expect(constructorReducer(stateBeforeReset, resetConstructor())).toEqual(
      expectedState
    );
  });
});
