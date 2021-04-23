export interface IShoppingCartProducts {
  id: number,
  quantity: number,
  productId: number,
  userId: string,
  productImage?: string,
  productName?: string,
  productPrice?: number,
  productMaxQuantity?: number
}
