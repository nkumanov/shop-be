export interface IUserCreateDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
