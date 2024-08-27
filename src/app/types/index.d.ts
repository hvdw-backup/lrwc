export type FormInputPost = {
  title: string;
  content: string;
  userId: string;
};

export type FormInputReply = {
  content: string;
  postId: string;
  userId: string;
};

export type FormApprovedUser = {
  email: string;
};

export type ApprovedUsers = {
  id: string;
  email: string;
  redeemed;
};

export type User = {
  id: string;
  email: string;
  username: string | null;
  about: string | null;
};
