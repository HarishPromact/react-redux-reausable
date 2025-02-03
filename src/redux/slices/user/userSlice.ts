import { User } from '../../../models/global';
import createGenericSlice from '../genericSlice';


const userSlice = createGenericSlice<User>('user');

export const {
  createItem: createUser,
  readItems: readUsers,
  updateItem: updateUser,
  deleteItem: deleteUser,
  selectItem: selectUser,
  clearSelection: clearUserSelection,
} = userSlice.actions;

export default userSlice.reducer;