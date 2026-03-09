import { TUserRole, TUserStatus } from "@/constants/user";

export type TUser = {
  id: string;

  name: string;
  email: string;
  phone?: string | null;

  password?: string | null;
  image?: string | null;

  role: TUserRole;
  status: TUserStatus;

  isVerified: boolean;
  emailVerificationToken?: string | null;
  verificationExpiresAt?: string | null;
  emailVerifiedAt?: string | null;

  lastLoginAt?: string | null;

  createdAt: string;
  updatedAt: string;
};

export interface IGoogleUser {
  name: TUser["name"];
  email: TUser["email"];
  image: TUser["image"];
}
