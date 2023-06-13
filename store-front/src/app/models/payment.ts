export interface PaymentReturnUrl{
    data:DataReturnUrl,

message: string,
status: number
}
export interface DataReturnUrl{
    callback: string
cart_amount: string
cart_currency: string
cart_description: string
cart_id: string
customer_details: CustomerDetail;
redirect_url:string
return: string
serviceId: 2
trace:string
tran_ref: string
tran_type:string
}
export class CustomerDetail{
name: string
 email: string
  street1: string
   state: string
    country: string
}
