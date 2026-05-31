import { IApiResponse } from "@/types/shared";
import { IUser } from "@/types/user";

export interface ILocalLoginRequest {
  email: string;
  password: string;
}
export type TApiUserResponse = IApiResponse<{
  user: Partial<IUser>;
}>;
