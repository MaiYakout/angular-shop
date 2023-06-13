import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/models/auth';
import { infoResponce } from 'src/app/models/information';
import { RegionsResponce } from 'src/app/models/regoins';
import { ServicesConstants } from '../ServicesConstants';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  token :string;
  lang :string;
  constructor(private http: HttpClient,private route:ActivatedRoute,private router:Router) { }
  
  public login(body : NgForm):  Observable<AuthResponse>{
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+'Auth_general/login' ,body,{headers});
  }

  public register(body : NgForm):  Observable<AuthResponse>{
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+'Auth_general/register' ,body,{headers});
  }

  public checkActiveCode(body : NgForm):  Observable<AuthResponse>{
    this.lang = localStorage.getItem("lang") ??"en";
    this.token = localStorage.getItem("token")
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+'Auth_private/check_active_code' ,body,{headers});
  }

  public registerBury(data):  Observable<AuthResponse>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+ 'Auth_private/buyer_info' ,data,{headers});
  }
  
  public forgetPassword(data):  Observable<AuthResponse>{
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+'Auth_general/forget_password' ,data,{headers});
  }

  public checkPassword(data):  Observable<AuthResponse>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+ 'Auth_private/check_password_code' ,data,{headers});
  }

  public getAllregions():  Observable<RegionsResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<RegionsResponce>(ServicesConstants.BASE_URL+ 'General/regions',{headers});
  }

  public editProfile(body):  Observable<AuthResponse>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+ 'Auth_private/edit_profile' ,body,{headers});
  }
  public changePassword(body):  Observable<AuthResponse>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+ 'Auth_private/change_password' ,body,{headers});
  }

  public getinformation():  Observable<infoResponce>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.get<infoResponce>(ServicesConstants.BASE_URL+ 'Auth_private/my_info',{headers});
  }

  public changeLang(lang):  Observable<AuthResponse>{
    this.token = localStorage.getItem("token")
    this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("Authorization","Bearer " + this.token);
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+'Auth_private/change_lang' ,{'lang' : lang},{headers});
  }

  downloadFile(fileUrl): any {
    let headers: HttpHeaders = new HttpHeaders()
    .set("lang" , this.lang)
    .set("responseType" , 'blob')
		return this.http.get(fileUrl, {headers});
  }
  socialTokenGoogle(data):  Observable<AuthResponse>{
    // this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    // .set("lang" , this.lang)
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+ 'Auth_general/login/google',data,{headers});
  }
  socialTokenFacebook(data):  Observable<AuthResponse>{
    // this.lang = localStorage.getItem("lang") ??"en";
    let headers: HttpHeaders = new HttpHeaders()
    // .set("lang" , this.lang)
    return this.http.post<AuthResponse>(ServicesConstants.BASE_URL+ 'Auth_general/login/facebook',data,{headers});
  }
  
}
