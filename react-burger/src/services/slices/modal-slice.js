import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contentId: null,
  contentType: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.contentId = action.payload.contentId;
      state.contentType = action.payload.contentType;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.contentId = null;
      state.contentType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalContentId = (state) => state.modal.contentId;
export const selectModalContentType = (state) => state.modal.contentType;
export const selectIsOpen = (state) => state.modal.isOpen;

export default modalSlice.reducer;
