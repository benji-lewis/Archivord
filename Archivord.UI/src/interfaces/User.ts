export interface User {
  id: number;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string | null;
  mfa_enabled: boolean;
  banner: string | null;
  accent_color: number | null;
  locale: string;
  flags: number;
  premium_type: number;
  public_flags: number;
}