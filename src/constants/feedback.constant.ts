export const FeedbackType = Object.freeze({
  COMPLAINT: "COMPLAINT",
  FEEDBACK: "FEEDBACK",
  INQUIRY: "INQUIRY",
} as const);

export const FeedbackStatus = Object.freeze({
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
} as const);

export type TFeedbackType = (typeof FeedbackType)[keyof typeof FeedbackType];

export type TFeedbackStatus =
  (typeof FeedbackStatus)[keyof typeof FeedbackStatus];
