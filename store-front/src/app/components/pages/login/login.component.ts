import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'
import { CallBack } from 'src/app/callback_services/callback';
import { convertToFormData } from 'src/app/Constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading : boolean = false ; 
  Login : string
  lang;
  formGroup : FormGroup ; 
  bidId
  user
loggedIn:boolean;
  constructor(
    private api : ApiAuthService ,
     private route :ActivatedRoute ,
      private router : Router ,
       private callBack :CallBack,
       private authService: SocialAuthService) {
    route.params.subscribe(params => {
      this.bidId = params['bid_id'];
      console.log(this.bidId)
    });
   }

  ngOnInit(): void {
    this.initFormGroup()
    
  }
  socialLogin(user,type){
    this.loading=true;
    let data={
      access_token:user.authToken
    }
    
    if(type==1){
      this.api.socialTokenGoogle(data).subscribe(
        (response=>{
          if(response.status == 1 ){
            localStorage.setItem('id',response.data.id +"");
            localStorage.setItem('token',response.data.token);
              localStorage.setItem('email' , response.data.email);
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('buyerOrSeller' , response.data.buyerOrSeller+"");
            console.log("seller or buyer",response.data)
            if(response.data.buyerOrSeller === 1){
              if(this.bidId === undefined)
                {this.router.navigate(['/bids']);
                notify.showNotification(response.message , notify.SUCCESS);}
              else{
                this.router.navigate(["/home"]);
                notify.showNotification('you have to be a seller to apply this bid' , notify.DANGER); 
              }
            }
             if(response.data.buyerOrSeller === 2){
              if(this.bidId === undefined){
                notify.showNotification(response.message , notify.SUCCESS);
                this.router.navigate(['/Applied-Bids']);
              }
              
              else{
                notify.showNotification(response.message , notify.SUCCESS);
                this.router.navigate(["/bid-detailes", { 'bid_id': this.bidId}]);
              }
              
              
            }
            this.callBack.loginChange.emit(response.data.buyerOrSeller);
          }else{
            notify.showNotification(response.message , notify.DANGER);
          }
        })
      )
    }else if(type==2){
      this.api.socialTokenFacebook(data).subscribe(
        (response=>{
          if(response.status == 1 ){
            localStorage.setItem('id',response.data.id +"");
            localStorage.setItem('token',response.data.token);
              localStorage.setItem('email' , response.data.email);
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('buyerOrSeller' , response.data.buyerOrSeller+"");
            console.log("seller or buyer",response.data)
            if(response.data.buyerOrSeller === 1){
              if(this.bidId === undefined)
                {this.router.navigate(['/bids']);
                notify.showNotification(response.message , notify.SUCCESS);}
              else{
                this.router.navigate(["/home"]);
                notify.showNotification('you have to be a seller to apply this bid' , notify.DANGER); 
              }
            }
             if(response.data.buyerOrSeller === 2){
              if(this.bidId === undefined){
                notify.showNotification(response.message , notify.SUCCESS);
                this.router.navigate(['/Applied-Bids']);
              }
              
              else{
                notify.showNotification(response.message , notify.SUCCESS);
                this.router.navigate(["/bid-detailes", { 'bid_id': this.bidId}]);
              }
              
              
            }
            this.callBack.loginChange.emit(response.data.buyerOrSeller);
          }else{
            notify.showNotification(response.message , notify.DANGER);
          }
        })
      )
    }
    

  }
  initFormGroup(){
    this.formGroup= new FormGroup({
      loginKey : new FormControl("" , Validators.required),
      password : new FormControl(""  , Validators.required ),
    });
  }
  submit(body){
    this.loading = true ; 
    this.api.login(body).subscribe(response=>{
      this.loading = false ; 
      if(response.status == 1 ){
        localStorage.setItem('id',response.data.id +"");
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('email' , response.data.email);
        localStorage.setItem('name',response.data.name);
        localStorage.setItem('buyerOrSeller' , response.data.buyerOrSeller+"")
        if(response.data.buyerOrSeller === 1){
          if(this.bidId === undefined)
            {this.router.navigate(['/bids']);
            notify.showNotification(response.message , notify.SUCCESS);}
          else{
            this.router.navigate(["/home"]);
            notify.showNotification('you have to be a seller to apply this bid' , notify.DANGER); 
          }
        }
         if(response.data.buyerOrSeller === 2){
          if(this.bidId === undefined){
            notify.showNotification(response.message , notify.SUCCESS);
            this.router.navigate(['/Applied-Bids']);
          }
          
          else{
            notify.showNotification(response.message , notify.SUCCESS);
            this.router.navigate(["/bid-detailes", { 'bid_id': this.bidId}]);
          }
          
          
        }
        this.callBack.loginChange.emit(response.data.buyerOrSeller);
      }else{
        notify.showNotification(response.message , notify.DANGER);
      }
    })
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;

      this.loggedIn = user != null;
      this.socialLogin(user,1)
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;

      this.loggedIn = user != null;
      this.socialLogin(user,2)
    });
  }

}
