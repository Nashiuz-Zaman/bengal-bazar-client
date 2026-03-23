import { TUserRole, TUserStatus } from "@/constants/user";
import { IUserBasic } from "@/types/shared";

export interface IUser extends IUserBasic {
  id: string;

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
}

export interface IGoogleUser extends IUserBasic {
  image: IUser["image"];
}
