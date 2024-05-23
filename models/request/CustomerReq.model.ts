export interface ISocialRegister {
  firstName: string;
  lastName: string;
}

export interface IOtpRegister {
  firstName: string;
  lastName: string;
  password?: string;
}

export interface IUpdateAccount {
  firstName: string;
  lastName: string;
  address?: string;
  province?: string;
  district?: string;
  subDistrict?: string;
  postalCode?: string;
  tags?: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
