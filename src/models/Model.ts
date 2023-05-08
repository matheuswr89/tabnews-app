export interface ContentModel {
  id: string;
  owner_id: string;
  parent_id: string;
  slug: string;
  title: string;
  status: string;
  source_url: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string;
  owner_username: string;
  tabcoins: number;
  children_deep_count: number;
  body?: string;
  url?: string;
  children?: ContentModel[];
}

export interface UserModel {
  id: string;
  username: string;
  tabcoins: number;
  tabcash: number;
}
