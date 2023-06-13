import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publicBidResponce } from 'src/app/models/publicBid';
import { SiteInfoResponce } from 'src/app/models/siteInfo';
import { SliderResponce } from 'src/app/models/Slider';
import { ServicesConstants } from '../ServicesConstants';

@Injectable({
  providedIn: 'root'
})
export class ApiHomeService {

  token :string;
  lang :string;
  constructor(private http: HttpClient) { }

  public getSiteInfo() :  Observable<SiteInfoResponce>{
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    return this.http.get<SiteInfoResponce>(ServicesConstants.BASE_URL+ 'General/siteInfo',{headers});
  }

  public getSlider() :  Observable<SliderResponce>{
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    return this.http.get<SliderResponce>(ServicesConstants.BASE_URL+ 'General/sliders',{headers});
  }

  public getPublicBid() :  Observable<publicBidResponce>{
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    return this.http.get<publicBidResponce>(ServicesConstants.BASE_URL+ 'General/publicBids',{headers});
  }
}
