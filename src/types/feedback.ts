import { TFeedbackStatus, TFeedbackType } from "@/constants/feedback";

export type TFeedback = {
  id: string;

  subject: string;
  message: string;

  type: TFeedbackType;
  status: TFeedbackStatus;

  images: string[];

  userId: string;

  productId?: string | null;
  orderId?: string | null;

  adminResponse?: string | null;
  resolvedAt?: string | null;

  createdAt: string;
  updatedAt: string;
};
