import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const CONTENT_KEY = "@tabnews-app:CONTENT";

export const useContent = () => {
  const saveContent = async (id, content) => {
    storage.set(CONTENT_KEY + id, JSON.stringify(content));
  };

  const getContent = async (id): Promise<any> => {
    const data = await storage.getString(CONTENT_KEY + id);

    return JSON.parse(data ?? null);
  };

  const deleteContent = async (id) => {
    storage.delete(CONTENT_KEY + id);
  };

  return {
    saveContent,
    getContent,
    deleteContent,
  };
};
