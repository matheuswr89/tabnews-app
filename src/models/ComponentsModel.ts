import { ContentModel } from "./Model";

export interface FloatIconInterface {
  name: string;
  color: string;
  onPress: () => void;
}

export interface GroupButtonInterface {
  content: ContentModel;
  isEdit?: boolean;
  setIsEdit?: (value: boolean) => void;
}

export interface HeaderIconsInterface {
  show: boolean;
}

export interface ListItemInterface {
  post: ContentModel;
  index: number;
}

export interface MarkdownViewInterface {
  body: string;
}

export interface OwnerInfoInterface {
  data: ContentModel;
  setIsEdit?: (value: boolean) => void;
  setDeleted?: (value: boolean) => void;
}

export interface PostInterface {
  value: ContentModel;
  loading: boolean;
  setDeleted: (value: boolean) => void;
}

export interface PostCommentsInteface {
  comments: ContentModel[];
  loading: boolean;
  loadingPost: boolean;
}

export interface SearchBarInterface {
  searchFunc: (
    search: string,
    setLoadingContent: (value: boolean) => void,
    setValue: (value: ContentModel[]) => void,
    setNextPageLink: (value: string | undefined) => void
  ) => void;
  setLoadingContent: (value: boolean) => void;
  setValue: (value: ContentModel[]) => void;
  setNextPageLink: (value: string | undefined) => void;
}

export interface TabCoinInteface {
  data: ContentModel;
  color: string;
}

export interface ActionsCommentsInterface {
  post: ContentModel;
  setIsEdit: (value: boolean) => void;
  setDeleted: (value: boolean) => void;
}

export interface CommentsTreeInterface {
  comments: ContentModel[];
}

export interface CommentsInterface {
  comment: ContentModel;
  key?: string;
}
