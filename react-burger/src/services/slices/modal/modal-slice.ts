import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface IModal {
  contentId: string | null;
  contentType: string | null;
  isOpen: boolean;
}

const initialState: IModal = {
  contentId: localStorage.getItem('modalContentId') || null,
  contentType: localStorage.getItem('modalContentType') || null,
  isOpen: localStorage.getItem('modalIsOpen') === 'true' || false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.contentId = action.payload.contentId;
      state.contentType = action.payload.contentType;
      localStorage.setItem('modalIsOpen', 'true');
      localStorage.setItem('modalContentId', action.payload.contentId);
      localStorage.setItem('modalContentType', action.payload.contentType);
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.contentId = null;
      state.contentType = null;
      localStorage.setItem('modalIsOpen', 'false');
      localStorage.removeItem('modalContentId');
      localStorage.removeItem('modalContentType');
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalContentId = (state: RootState) => state.modal.contentId;
export const selectModalContentType = (state: RootState) =>
  state.modal.contentType;
export const selectIsOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
