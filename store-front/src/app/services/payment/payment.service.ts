import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BidOfferResponce } from 'src/app/models/bidOffer';
import { PaymentReturnUrl } from 'src/app/models/payment';
import { ServicesConstants } from '../ServicesConstants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  token :string;
  lang :string;
  constructor(private http:HttpClient) { }
  public payment(bid_id:any){
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<PaymentReturnUrl>(ServicesConstants.BASE_URL+ 'payment',bid_id,{headers});
  }
  public paymentOffers(bid_id:any){
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<BidOfferResponce>(ServicesConstants.BASE_URL+ 'payment/verify/'+bid_id,{headers});
  }
}
