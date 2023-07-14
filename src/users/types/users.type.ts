export type UserSave = {
  _id: any;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  refreshToken: string;
  role: string;
  password: string;
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
  created_at: Date;
  updated_at: Date;
  refreshToken: string;
  role: string;
};

export const Role = {
  USER: 'user',
  ADMIN: 'admin',
};
