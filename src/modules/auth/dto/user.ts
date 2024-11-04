export interface IRegisterNewUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserPersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    city: string;
    street: string;
    postalCode: string;
  };
}

export interface IUserInfo extends IRegisterNewUser, IUserPersonalInfo {}
