import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveBidResponce } from 'src/app/models/activeBid';
import { BidOfferResponce } from 'src/app/models/bidOffer';
import { BuyerResponcs } from 'src/app/models/bidsBuyer';
import { CommentBidResponce } from 'src/app/models/commentBid';
import { createBidResponce } from 'src/app/models/createBid';
import { PastBidResponce } from 'src/app/models/pastBid';
import { ReasonsResponce } from 'src/app/models/reasons';
import { SingleBidResponce } from 'src/app/models/singleBid';
import { TypeResponce } from 'src/app/models/typeBid';
import { ServicesConstants } from '../ServicesConstants';

@Injectable({
  providedIn: 'root'
})
export class ApiBuyerService {

  token :string;
  lang :string;
  constructor(private http: HttpClient) { }

  public getTypeBids():  Observable<TypeResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<TypeResponce>(ServicesConstants.BASE_URL+ 'General/bidTypes',{headers});
  }

  public getActiveBids(page =null):  Observable<ActiveBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<ActiveBidResponce>(ServicesConstants.BASE_URL+ 'Bid/myBidsForBuyer?type=1'+ (page == null ? "" : "&page="+page),{headers});
  }

  public getBastBid(page =null):  Observable<PastBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<PastBidResponce>(ServicesConstants.BASE_URL+ 'Bid/myBidsForBuyer?type=2'+ (page == null ? "" : "&page="+page),{headers});
  }

  public getSingleBid(id  : number):  Observable<SingleBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<SingleBidResponce>(ServicesConstants.BASE_URL+ 'Bid/singleBidForBuyer?bid_id=' + id ,{headers});
  }

  public getBidOffer(id : number , page =null):  Observable<BidOfferResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<BidOfferResponce>(ServicesConstants.BASE_URL+ 'Bid/bidOffers?bid_id=' + id + (page == null ? "" : "&page="+page) ,{headers});
  }

  public getCommentBid(id : number , page =null):  Observable<CommentBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<CommentBidResponce>(ServicesConstants.BASE_URL+ 'Bid/bidComments?bid_id=' + id + (page == null ? "" : "&page="+page) ,{headers});
  }

  public createBid(data):  Observable<createBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<createBidResponce>(ServicesConstants.BASE_URL+ 'Bid/createBid' ,data,{headers});
  }

  public editBid(data):  Observable<createBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<createBidResponce>(ServicesConstants.BASE_URL+ 'Bid/editBid' ,data,{headers});
  }

  public AddReply(data):  Observable<createBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<createBidResponce>(ServicesConstants.BASE_URL+ 'Comment/saveComment' ,data,{headers});
  }


  public getReasons(type):  Observable<ReasonsResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<ReasonsResponce>(ServicesConstants.BASE_URL+ 'General/reasons?type=' + type ,{headers});
  }


  public CancleBid(data):  Observable<createBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<createBidResponce>(ServicesConstants.BASE_URL+ 'Bid/cancelBid' ,data,{headers});
  }

  public sendInviat(data):  Observable<createBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<createBidResponce>(ServicesConstants.BASE_URL+ 'Bid/inviterSellers' ,data,{headers});
  }

  public pay(data):  Observable<createBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<createBidResponce>(ServicesConstants.BASE_URL+ 'Bid/payPid' ,data,{headers});
  }

  public ChooseSeller(data):  Observable<createBidResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<createBidResponce>(ServicesConstants.BASE_URL+ 'Bid/acceptOffer' ,data,{headers});
  }
}
