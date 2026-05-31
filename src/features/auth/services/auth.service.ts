import { IUser } from "@/types/user";
import { UserRole } from "@/constants/user";

export const AuthService = {
  /**
   * Determines the dashboard route based on user role.
   */
  getDashboardPath(userData: Partial<IUser> | null | undefined): string {
    if (!userData) return "";

    switch (userData.role) {
      case UserRole.CUSTOMER:
        return "customer";
      case UserRole.ADMIN:
        return "admin";
      default:
        return "";
    }
  },
};
