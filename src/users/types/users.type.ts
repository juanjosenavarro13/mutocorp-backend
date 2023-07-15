export type UserSave = {
  _id: any;
  name: string;
  email: string;
  refreshToken: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DataUpdate = {
  name?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type userResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;
  role: string;
};

export const Role = {
  USER: 'user',
  ADMIN: 'admin',
};
