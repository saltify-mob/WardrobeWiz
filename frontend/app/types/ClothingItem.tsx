export interface ClothingItem {
  id: string;
  type: string;
  season: string;
  color: string;
  dateOfPurchase: string;
  timeLastUsed: string;
  imageUrl: string;
}

export interface Clothing extends ClothingItem {
  category: string;
}
