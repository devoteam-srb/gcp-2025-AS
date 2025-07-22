export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  deliveryAddress: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
