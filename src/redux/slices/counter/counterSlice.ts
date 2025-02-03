
import { CounterItem } from "../../../models/global";
import createGenericSlice from "../genericSlice";

const counterSlice = createGenericSlice<CounterItem>('counter');

export const {
  createItem: createCounter,
  readItems: readCounters,
  updateItem: updateCounter,
  deleteItem: deleteCounter,
  selectItem: selectCounter,
  clearSelection: clearCounterSelection,
} = counterSlice.actions;

export default counterSlice.reducer;