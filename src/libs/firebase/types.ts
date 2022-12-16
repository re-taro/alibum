export type CreateStoreMenuListItem = {
  name: string;
  date: string;
  title: string;
};

export type StoreMenuListItem = {
  name: string;
  date: string;
  id: string;
};

export type StoreMenuList = StoreMenuListItem[];

export type StoreCardListItem = {
  text: string;
  imageRef?: string;
  createdAt: Date;
};

export type CreateStoreCardListItem = {
  text: string;
  imageFile?: File;
};

export type ListInfo = {
  title: string;
  name: string;
  id: string;
  date: string;
};

export type StoreCardList = StoreCardListItem[];
