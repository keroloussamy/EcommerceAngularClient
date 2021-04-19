import { IProduct } from "./IProduct";

export interface IFavouriteProduct {

    id: number,

    userId: string,

    productId: number,

    product: IProduct

}

