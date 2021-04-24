import { IPaymentMethod } from "./ipayment-method";

export interface IOrder {

    id:number
    totalPrice:number
    userId:string
    paymentMethod:IPaymentMethod

}
