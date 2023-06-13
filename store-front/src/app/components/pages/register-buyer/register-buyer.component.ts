import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'
import { CallBack } from 'src/app/callback_services/callback';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
@Component({
  selector: 'app-register-buyer',
  templateUrl: './register-buyer.component.html',
  styleUrls: ['./register-buyer.component.scss']
})
export class RegisterBuyerComponent implements OnInit {

  bury : number = 1
  loading : boolean = false ; 
  email
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private router :Router,
    private route :ActivatedRoute ,
     private api : ApiAuthService ,
      private callBack :CallBack,
      private socialAuthService: SocialAuthService
      ) { 
    route.params.subscribe(params => {
    });
  }

  ngOnInit(): void {
    
  }
  loginWithFb(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log("usersocial",user);
      this.socialLogin(this.socialUser,2)
    });
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log("usersocial",user);
      this.socialLogin(this.socialUser,1)
    });
  }
  socialLogin(user,type:number){
    this.loading=true;
    let data={
      access_token:user.authToken,
      user_type:this.bury
    }
    console.log("before",type)

    if(type == 1){
      console.log("aftergoogle",type)
      this.api.socialTokenGoogle(data).subscribe(
        (response=>{
          if(response.status == 1 ){
            localStorage.setItem('id',response.data.id +"");
            localStorage.setItem('token',response.data.token);
              localStorage.setItem('email' , response.data.email);
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('buyerOrSeller' , response.data.buyerOrSeller+"");
            this.email = response.data.email;
            this.router.navigate(["/complete-profile", { 'emailBury': this.email }]);
            notify.showNotification(response.message , notify.SUCCESS);
            
            this.callBack.loginChange.emit(1);
          }else{
            notify.showNotification(response.message , notify.DANGER);
          }
        })
      )
    }else if(type == 2){
      console.log("after fb",type)
      this.api.socialTokenFacebook(data).subscribe(
        (response=>{
          if(response.status == 1 ){
            localStorage.setItem('id',response.data.id +"");
            localStorage.setItem('token',response.data.token);
              localStorage.setItem('email' , response.data.email);
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('buyerOrSeller' , response.data.buyerOrSeller+"");
            this.email = response.data.email;
            this.router.navigate(["/complete-profile", { 'emailBury': this.email }]);
            notify.showNotification(response.message , notify.SUCCESS);
            
            this.callBack.loginChange.emit(1);
          }else{
            notify.showNotification(response.message , notify.DANGER);
          }
        })
      )
    }
    

  }
  submit(body){
    this.loading = true ; 
    this.api.register(body).subscribe(response=>{
      this.loading = false ; 
      if(response.status == 1 ){
        localStorage.setItem('id',response.data.id +"");
        localStorage.setItem('token',response.data.token);
          localStorage.setItem('email' , response.data.email);
        localStorage.setItem('name',response.data.name);
        localStorage.setItem('buyerOrSeller' , response.data.buyerOrSeller+"");
        this.email = response.data.email;
        this.router.navigate(["/verification", { 'emailBury': this.email }]);
        notify.showNotification(response.message , notify.SUCCESS);
        
        this.callBack.loginChange.emit(1);
      }else{
        notify.showNotification(response.message , notify.DANGER);
      }
    })
    
  }
  
  
  
}
