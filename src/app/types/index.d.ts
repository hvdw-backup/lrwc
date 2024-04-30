export type FormInputPost = {
  title: string;
  content: string;
};

export type FormInputReply = {
  content: string;
  postId: string;
};

export type FormNewUser = {
  email: string;
  username: string;
  password: string;
};

export type FormApprovedUser = {
  email: string;
  username: string;
  password: string;
};
