export const UserRole = Object.freeze({
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  SUPERADMIN: "SUPERADMIN",
} as const);

export const UserStatus = Object.freeze({
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  PENDING: "PENDING",
} as const);

export type TUserRole = (typeof UserRole)[keyof typeof UserRole];
export type TUserStatus = (typeof UserStatus)[keyof typeof UserStatus];