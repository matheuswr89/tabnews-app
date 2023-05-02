import { createContext, useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesContext = createContext<any>({});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { getFavorite, saveFavorite } = useFavorites();

  useEffect(() => {
    getFavorite().then((data: any) => setFavorites(data));
  }, []);

  useEffect(() => {
    saveFavorite(favorites);
  }, [favorites]);

  const toggleFavorite = (post) => {
    if (!isFavorite(post)) {
      setFavorites((prevState) => [...prevState, post]);
    } else {
      const newList = favorites.filter((value) => value.id != post.id);
      setFavorites([...newList]);
    }
  };

  const isFavorite = (post: any) => {
    if (favorites.length > 0) {
      const exist = favorites.find((item) => item.id === post.id);
      return !!exist;
    }
    return false;
  };

  return (
    <FavoritesContext.Provider
      value={{
        isFavorite,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
export default FavoritesContext;
