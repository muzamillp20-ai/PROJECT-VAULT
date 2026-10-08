/**
 * Simple Authentication Service
 * Uses localStorage for client-side authentication
 * No external services required
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

const USERS_KEY = 'project-vault-users';
const CURRENT_USER_KEY = 'project-vault-current-user';

// Get all registered users
function getUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save users
function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Get current logged in user
export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Set current user
function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// Register new user
export function register(name: string, email: string, password: string): { success: boolean; error?: string; user?: User } {
  if (!name || !email || !password) {
    return { success: false, error: 'All fields are required.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const users = getUsers();
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  // Create new user
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name,
    createdAt: new Date().toISOString(),
  };

  // Store user with password (in real app, use proper hashing)
  const userWithPassword = { ...newUser, password };
  users.push(userWithPassword as any);
  saveUsers(users);

  // Auto login after registration
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

// Login user
export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const users = getUsers();
  const user = users.find(u => u.email === email && (u as any).password === password);

  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = user as any;
  setCurrentUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
}

// Logout user
export function logout(): void {
  setCurrentUser(null);
}

// Check if user is logged in
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
