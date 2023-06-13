import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplyResponce } from 'src/app/models/apply';
import { AvailableBidResponce } from 'src/app/models/avilableBid';
import { closedBidsResponce } from 'src/app/models/closeBidSeller';
import { inProgressBidsResponce } from 'src/app/models/inProgressBid';
import { SingleBidModel, SingleBidResponce } from 'src/app/models/singleBid';
import { ServicesConstants } from '../ServicesConstants';

@Injectable({
  providedIn: 'root'
})
export class ApiSellerService {
  token :string;
  lang :string;
  constructor(private http: HttpClient) { }

  public getAvilableBid(page =null) :  Observable<AvailableBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<AvailableBidResponce>(ServicesConstants.BASE_URL+ 'Bid/availableBids'+ (page == null ? "" : "?page="+page),{headers});
  }

  public Apply(data):  Observable<ApplyResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<ApplyResponce>(ServicesConstants.BASE_URL+ 'Offer/makeOffer' ,data,{headers});
  }

  public getClosedBid(page =null) :  Observable<closedBidsResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<closedBidsResponce>(ServicesConstants.BASE_URL+ 'Bid/closedBids'+ (page == null ? "" : "?page="+page),{headers});
  }

  public getinProgressBid(page =null) :  Observable<inProgressBidsResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<inProgressBidsResponce>(ServicesConstants.BASE_URL+ 'Bid/inProgressBids'+ (page == null ? "" : "?page="+page),{headers});
  }

  public cancelOffer(data):  Observable<ApplyResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<ApplyResponce>(ServicesConstants.BASE_URL+ 'Offer/cancelOffer' ,data,{headers});
  }

  public getSingleBid(id  : number):  Observable<SingleBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<SingleBidResponce>(ServicesConstants.BASE_URL+ 'Bid/singleBidForSeller?bid_id=' + id ,{headers});
  }

}
