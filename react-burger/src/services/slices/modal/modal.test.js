import modalReducer, { openModal, closeModal } from './modal-slice';

describe('modal reducer', () => {
  const initialState = {
    contentId: null,
    contentType: null,
    isOpen: false,
  };

  it('should return the initial state', () => {
    expect(modalReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle openModal', () => {
    const action = openModal({ contentId: '123', contentType: 'image' });
    const expectedState = {
      contentId: '123',
      contentType: 'image',
      isOpen: true,
    };
    expect(modalReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle closeModal', () => {
    const stateBeforeClose = {
      contentId: '123',
      contentType: 'image',
      isOpen: true,
    };
    const expectedState = {
      contentId: null,
      contentType: null,
      isOpen: false,
    };
    expect(modalReducer(stateBeforeClose, closeModal())).toEqual(expectedState);
  });
});
