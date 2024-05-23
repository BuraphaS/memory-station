export interface IAuthOtpLogin {
  phoneNumber: string;
  ref: string;
  otp: string;
}

export interface IAuthPasswordLogin {
  phoneNumber: string;
  password: string;
}

export interface ISignUp {
  email: string
  userName: string
  password: string
  confirmPassword: string
  phone: string
  firstName: string
  lastName: string
}
