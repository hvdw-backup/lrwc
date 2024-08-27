export type FormInputPost = {
  title: string;
  content: string;
};

export type FormInputReply = {
  content: string;
  postId: string;
};

export type ApprovedUsers = {
  id: string;
  email: string;
  redeemed: boolean;
};

export type User = {
  id: string;
  username: string | null;
  email: string;
  redeemed: boolean;
};
