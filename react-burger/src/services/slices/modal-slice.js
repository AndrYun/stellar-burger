// отображаем модальное окно с инфо по ингредиенту или булке
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: null,
  isOpen: false,
  size: 'ingredient',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.size = action.payload.size;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectContent = (state) => state.modal.content;
export const selectSize = (state) => state.modal.size;
export const selectIsOpen = (state) => state.modal.isOpen;

export default modalSlice.reducer;
