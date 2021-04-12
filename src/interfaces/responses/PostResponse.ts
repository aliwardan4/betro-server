export interface PostsFeedResponse {
  posts: Array<PostResponse>;
  users: { [user_id: string]: PostUserResponse };
  keys: { [key_id: string]: PostKeyResponse };
}

export interface PostResponse {
  id: string;
  user_id: string;
  media_content: string;
  media_encoding: string;
  text_content: string;
  key_id: string;
}

export interface PostUserResponse {
  id: string;
  email: string;
}

export interface PostKeyResponse {
  sym_key: string;
  private_key: string;
}