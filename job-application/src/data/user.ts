export interface User {
    name: string;
    email: string;
    country: string;
  }
  
  export const currentUser: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    country: "United States"
  };