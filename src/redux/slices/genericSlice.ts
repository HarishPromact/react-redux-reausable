// counterTypes.ts
export interface CounterItem {
    id: number;
    value: number;
    [key: string]: unknown; // Add index signature to satisfy DraftableItem
  }

  export interface User {
    id: string;
    name: string;
    mobileNumber: string;
    [key: string]: unknown; // Add index signature to satisfy DraftableItem
  }
  
  // genericSlice.ts
  import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
  
  export interface GenericState<T> {
    items: T[];
    selectedItem?: T;
    loading: boolean;
    error: string | null;
  }
  
  // Updated DraftableItem type
  export type DraftableItem = {
    id: string | number;
    [key: string]: unknown;
  };
  
  const createGenericSlice = <T extends DraftableItem>(name: string) => {
    const initialState: GenericState<T> = {
      items: [],
      loading: false,
      error: null,
    };
  
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




