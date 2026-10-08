export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === '') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateLoginForm(data: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegisterForm(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Full name is required.';
  }

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters.';
  }

  if (!data.confirmPassword || data.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateForgotPasswordForm(data: {
  email: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
