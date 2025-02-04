import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

/**
 * This is a custom hook that is used to dispatch actions to the store
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
/**
 * This is a custom hook that is used to access data from the redux store
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
