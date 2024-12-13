// Mock authentication utilities and types
export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export const mockUsers = {
  google: {
    id: "1",
    displayName: "John Doe",
    email: "john.doe@example.com",
    photoURL: "https://ui-avatars.com/api/?name=John+Doe&background=random",
  },
  apple: {
    id: "2",
    displayName: "Jane Smith",
    email: "jane.smith@example.com",
    photoURL: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
  },
} as const;

export const mockAuthDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 800));
