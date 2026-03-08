import { TAddressType } from "@/constants/address";

export type TAddress = {
  id: string;

  userId: string;

  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  contactPhone?: string | null;

  type: TAddressType;

  createdAt: string;
  updatedAt: string;
};
