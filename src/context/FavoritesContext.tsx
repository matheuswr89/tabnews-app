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
      const newList = favorites.filter((item) => item.id !== post.id);
      setFavorites([...newList]);
    }
    saveFavorite(favorites);
  };

  const replaceFavorite = (oldFavorite, newFavorite) => {
    const index = favorites.indexOf(oldFavorite);
    favorites[index] = newFavorite;
  };

  const isFavorite = (post: any) => {
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
