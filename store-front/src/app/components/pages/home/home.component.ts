import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxNotificationMsgService } from 'ngx-notification-msg';
import { CallBack } from 'src/app/callback_services/callback';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  buyerOrSeller;
  trueSeller :boolean
  Showlogin =  false;
  navbarCollapsed = true;
  showBox = true;
  titleLang;
  langCondition
  lang = localStorage.getItem("lang");
  homeIstoken = false
  @ViewChild("isShow" , {static: true}) lab:ElementRef;
  @ViewChild("showmenu" , {static: false}) showmenu:ElementRef;
  @ViewChild("closemenue" , {static: false}) closemen:ElementRef;
  constructor(public router: Router,public callback:CallBack,private translateService: TranslateService,
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

  nave(page){
    this.router.navigate([page]);
    console.log(page)
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
  ngOnInit(): void {
    this.buyerOrSeller = localStorage.getItem('buyerOrSeller')
    let token = localStorage.getItem('token')
    if(token === null){
      this.homeIstoken = false;
    }
    else{
      this.homeIstoken = true;
    }
  }
  dashboard(){
    if(this.buyerOrSeller == 1){ 
      //buyer
      this.router.navigate(['/bids']);
    }
    else if(this.buyerOrSeller == 2){
      // seller
      this.router.navigate(['/Applied-Bids'])
    }
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
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
  // this.router.navigate(['/loading']);
if(lang === "ar"){
  this.langCondition = true
}
else{ 
  this.langCondition = false
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

}
langButton(lang){
  this.router.navigate(['/loading']);
  this.changeLangage(lang)

}
logOut(){
  localStorage.clear();
  let token = localStorage.getItem('token');
  this.router.navigate(['/loading']);
  if(token == null){
    this.Showlogin = true; 
  }
}
}
