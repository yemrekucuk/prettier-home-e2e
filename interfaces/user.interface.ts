export interface LoginRequest {
  email: string;
  password: string;
}

export interface ProfilePhoto {
  id: number;
  name: string;
  type: string;
  data: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "CUSTOMER" | "ADMIN";
  profilePhoto: ProfilePhoto | null;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteAccountRequest {
  password: string;
}