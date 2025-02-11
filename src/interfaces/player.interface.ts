export interface Player {
    save();
    _id: string;
    email: string;
    facebook_access_token: string | null;
    google_access_token: string | null;
    appleid_access_token: string | null;
    created_at: Date;
    updated_at: Date;
  }