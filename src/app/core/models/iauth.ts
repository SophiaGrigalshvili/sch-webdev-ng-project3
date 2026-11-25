export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IRegisterResponce {
  token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  isVerified: boolean;
}

export interface IVerifyMailRequest {
  email: string;
  code: string;
}

export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface IRefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
  isVerified: boolean;
}
