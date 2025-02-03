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