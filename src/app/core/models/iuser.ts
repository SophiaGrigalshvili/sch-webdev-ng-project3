export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface IUserProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  picture: string;
  address: string;
  age: number;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IChangePasswordResponse {
  isSuccess: boolean;
  error: IChangePasswordResponseError;
}

export interface IChangePasswordResponseError {
  message: 'string';
  statusCode: number;
}

export interface IUserMetaData {
  data: IUser;
  meta: {};
}

export interface IUserProfileMetaData {
  data: IUserProfile;
  meta: {};
}

