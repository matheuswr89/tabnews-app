import { createContext, useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { FavoritesContextProps } from "../models/ContextModel";
import { ContentModel } from "../models/Model";

const FavoritesContext = createContext<FavoritesContextProps>(
  {} as FavoritesContextProps
);

export const FavoritesProvider = ({ children }) => {
  const { getFavorite, saveFavorite } = useFavorites();

  const [favorites, setFavorites] = useState<ContentModel[]>([]);

  useEffect(() => {
    getFavorite().then((data: any) => setFavorites(data));
  }, []);

  useEffect(() => {
    saveFavorite(favorites);
  }, [favorites]);

  const toggleFavorite = (post: ContentModel) => {
    if (!isFavorite(post)) {
      setFavorites((prevState) => [...prevState, post]);
    } else {
      const newList = favorites.filter((item) => item.id !== post.id);
      setFavorites([...newList]);
    }
    saveFavorite(favorites);
  };

  const replaceFavorite = (
    oldFavorite: ContentModel,
    newFavorite: ContentModel
  ) => {
    const index = favorites.indexOf(oldFavorite);
    favorites[index] = newFavorite;
  };

  const isFavorite = (post: ContentModel) => {
    const exist = favorites.find((item) => item.id === post.id);
    return !!exist;
  };

  return (
    <FavoritesContext.Provider
      value={{
        isFavorite,
        favorites,
        toggleFavorite,
        replaceFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
export default FavoritesContext;
