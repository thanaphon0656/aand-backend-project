export interface Player {
  save();
  _id: string;
  email: string;
  username: string;
  facebook_access_token: string | null;
  google_access_token: string | null;
  apple_access_token: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface PlayerLoginReshape {
  username: string;
}