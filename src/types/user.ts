import { TUserRole, TUserStatus } from "@/constants/user.constant";

export type TAddress = {
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  phone?: string | null;
  image?: string | null;

  billingAddress?: TAddress | null;
  shippingAddress?: TAddress | null;

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
