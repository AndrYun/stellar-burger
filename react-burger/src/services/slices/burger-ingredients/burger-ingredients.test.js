import ingredientsReducer, {
  fetchIngredients,
} from './burger-ingredients-slice';
import { mockIngredient } from '../../mocks/mocks';

describe('ingredients reducer', () => {
  describe('should return async ingredients', () => {
    const initialState = {
      ingredients: [],
      isLoadingByApi: false,
      error: null,
    };
    it('should return the initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });
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
