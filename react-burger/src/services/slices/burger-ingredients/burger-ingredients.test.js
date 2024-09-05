import ingredientsReducer, {
  fetchIngredients,
} from './burger-ingredients-slice';

const mockIngredient = [
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

describe('ingredients reducer', () => {
  describe('should return async ingredients', () => {
    const initialState = {
      ingredients: [],
      isLoadingByApi: false,
      error: null,
    };
    it('should be pending request', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.pending('pending')
      );

      expect(state.isLoadingByApi).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should be fulfilled request', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.fulfilled(mockIngredient, 'fulfilled')
      );

      expect(state.isLoadingByApi).toBeFalsy();
      expect(state.ingredients).toEqual(mockIngredient);
    });

    it('should error occurs', () => {
      const error = 'Something went wrong'; // 'Something went wrong' , 'Space connection lost ((('
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.rejected(error, 'rejected')
      );

      expect(state.isLoadingByApi).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});
