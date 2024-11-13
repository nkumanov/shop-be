export interface IUserCreateDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAdminCreate extends IUserCreateDto {}

export interface IUserSignInDto {
  email: string;
  password: string;
}

export interface IAdminLogin extends IUserSignInDto {
  username: string;
}

export interface IUserInfoDto {
  fName: string;
  sName: string;
  address: {
    city: string;
    postalCode: string;
    street: string;
  };
}
