import { ContentModel, UserModel } from "./Model";

export interface AuthContextProps {
  user: UserModel;
  isLogged: boolean;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): void;
  signUp(username: string, email: string, password: string): Promise<void>;
  logInUser(): void;
  isTokenExpired: () => Promise<boolean>;
}

export interface ReloadContentContextProps {
  isReload: boolean;
  toggleReload: () => void;
}
export interface FavoritesContextProps {
  isFavorite: (post: ContentModel) => boolean;
  favorites: ContentModel[];
  toggleFavorite: (post: ContentModel) => void;
  replaceFavorite: (
    oldFavorite: ContentModel,
    newFavorite: ContentModel
  ) => void;
}
