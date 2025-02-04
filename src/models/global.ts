export interface CounterItem {
    id: number;
    value: number;
    [key: string]: unknown;
  }
  
  export interface User {
    id: string;
    name: string;
    mobileNumber: string;
    [key: string]: unknown; 
  }

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
  