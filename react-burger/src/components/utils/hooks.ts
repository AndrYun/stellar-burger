import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../services/store';

// typed hooks
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
