export interface Guild {
  id: number;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: Array<string>;
}