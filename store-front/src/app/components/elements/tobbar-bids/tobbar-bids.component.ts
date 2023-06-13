import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CallBack } from 'src/app/callback_services/callback';
import { NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { DOCUMENT } from '@angular/common'; 
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';

@Component({
  selector: 'app-tobbar-bids',
  templateUrl: './tobbar-bids.component.html',
  styleUrls: ['./tobbar-bids.component.scss']
})
export class TobbarBidsComponent implements OnInit {

  buyerOrSeller : number ;
  Showlogin =  false;
  navbarCollapsed = true;
  name 
  @ViewChild("isShow" , {static: false}) lab:ElementRef;
  @ViewChild("showmenu" , {static: false}) showmenu:ElementRef;
  @ViewChild("closemenue" , {static: false}) closemen:ElementRef;
  showBox = true;
  titleLang;
  langCondition
  lang = localStorage.getItem("lang");
  constructor(public router: Router,public callback:CallBack,private translateService: TranslateService,private api :ApiAuthService,
    @Inject(DOCUMENT) private document: Document,private readonly ngxNotificationMsgService: NgxNotificationMsgService , private callBack : CallBack){

    let lang = localStorage.getItem("lang");
    if(lang === "ar"){
      this.langCondition = true
    }
    else{
      this.langCondition = false
    }
    if(lang !== null)  
    {
      this.changeLangage(lang);
    }
    
    else{
      this.changeLangage("en"); 
    }
    
   }
   
  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.buyerOrSeller = Number.parseInt(localStorage.getItem('buyerOrSeller'));
    this.callBack.loginChange.subscribe((res : number) => {
        this.buyerOrSeller = res ;
    })
    
  }


  logOut(){
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("buyerOrSeller");
    let token = localStorage.getItem('token');
    this.router.navigate(['/home']);
    if(token == null){
      this.Showlogin = true; 
    }
  }


  nave(page){
    this.router.navigate([page]);
  }
  onClickedOut(e: Event) {
    this.lab.nativeElement.classList.remove("show");
    this.showmenu.nativeElement.classList.remove("menue");
    this.closemen.nativeElement.classList.add("menue");
  }
  onClickedOutClose(){
    this.lab.nativeElement.classList.remove("show");  
  }
  clickinside(){
    this.lab.nativeElement.classList.add("show");
    this.showmenu.nativeElement.classList.add("menue");
    this.closemen.nativeElement.classList.remove("menue");
  }
  changeLangage(lang: string) {
    
    localStorage.setItem("lang" , lang); 
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    if(lang === "ar"){
      this.titleLang = "Arabic"
    }
    else{
      this.titleLang = "English"
    }
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.changeCssFile(lang);
    this.callback.languageChange.emit(true);
  }
  changeCssFile(lang: string) {
  if(lang === "ar"){
    this.langCondition = true;
  }
  else{ 
    this.langCondition = false;
  }

  let headTag = this.document.getElementsByTagName(
    "head"
  )[0] as HTMLHeadElement;
  let existingLink = this.document.getElementById(
    "langCss"
  ) as HTMLLinkElement;
  
  let bundleName ="englishStyle.css";
  if(lang === "ar"){
    bundleName = "arabicStyle.css";
    this.titleLang = "Arabic"
  }
  else {
    bundleName = "englishStyle.css";
    this.titleLang = "English"
  }

  if (existingLink) {
    existingLink.href = bundleName;
  } else {
    let newLink = this.document.createElement("link");
    newLink.type = "text/css";
    newLink.rel = "stylesheet";
    newLink.type = "text/css";
    newLink.id = "langCss";
    newLink.href = bundleName;
    headTag.appendChild(newLink);
  }
    console.log("changing language")
    this.api.changeLang(lang).subscribe(res=>{})
  }
  langButton(lang){
    this.router.navigate(['/loading']);
    this.changeLangage(lang)

  }
}
