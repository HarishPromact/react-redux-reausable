/**
 * Interface for counter
 */
export interface CounterItem {
    id: number;
    value: number;
    [key: string]: unknown;
  }
  
  /**
   * Interface for user
   */
  export interface User {
    id: string;
    name: string;
    mobileNumber: string;
    [key: string]: unknown; 
  }

  /**
   * Interface for generic state
   */
  export interface GenericState<T> {
    items: T[];
    selectedItem?: T;
    loading: boolean;
    error: string | null;
  }
  
  /**
   * Interface for draftable items
   */
  export type DraftableItem = {
    id: string | number;
    [key: string]: unknown;
  };
  