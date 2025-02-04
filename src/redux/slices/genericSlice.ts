import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { DraftableItem, GenericState } from "../../models/global";

/**
 * Create a generic slice for a given name
 * @param name name of slice
 * @returns slice object
 */
const createGenericSlice = <T extends DraftableItem>(name: string) => {
  const initialState: GenericState<T> = {
    items: [],
    loading: false,
    error: null,
  };

  /**
   * Create a slice for a given name
   */
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      createItem: (state, action: PayloadAction<T>) => {
        state.items.push(action.payload as Draft<T>);
      },
      readItems: (state, action: PayloadAction<T[]>) => {
        state.items = action.payload as Draft<T>[];
      },
      updateItem: (state: Draft<GenericState<T>>, action: PayloadAction<T>) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          Object.assign(state.items[index], action.payload);
        }
      },
      deleteItem: (
        state: Draft<GenericState<T>>,
        action: PayloadAction<T["id"]>
      ) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      },
      selectItem: (
        state: Draft<GenericState<T>>,
        action: PayloadAction<T["id"]>
      ) => {
        state.selectedItem = state.items.find(
          (item) => item.id === action.payload
        );
      },
      clearSelection: (state: Draft<GenericState<T>>) => {
        state.selectedItem = undefined;
      },
    },
  });

  return slice;
};

export default createGenericSlice;
