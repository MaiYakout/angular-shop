import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'
import { CallBack } from 'src/app/callback_services/callback';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register-seller',
  templateUrl: './register-seller.component.html',
  styleUrls: ['./register-seller.component.scss']
})
export class RegisterSellerComponent implements OnInit {

  invitation = 0;
  invitedCode : number ; 
  bidId : number ; 
  loading : boolean = false ; 
  bury = 2 
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private router :Router,
    private route :ActivatedRoute ,
    private api : ApiAuthService, 
     private callBack :CallBack,
     private socialAuthService: SocialAuthService
     ) { 
    route.params.subscribe(params => {
      this.invitedCode = params['inviteCode'];
      this.invitation = this.invitedCode !== undefined ? 1 : 0; 
      this.bidId = params['bidId']
    });
  }
  ngOnInit(): void {
    
  }
  socialLogin(user,type){
    this.loading=true;
    let data={
      access_token:user.authToken,
      user_type:this.bury
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
          if(this.bidId !== undefined)
           this.router.navigate(["/complete-profile-seller", { 'bid_id': this.bidId }]);
          else
            this.router.navigate(["/complete-profile-seller"]);
          notify.showNotification(response.message , notify.SUCCESS);
          
          this.callBack.loginChange.emit(2);
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
            if(this.bidId !== undefined)
             this.router.navigate(["/complete-profile-seller", { 'bid_id': this.bidId }]);
            else
              this.router.navigate(["/complete-profile-seller"]);
            notify.showNotification(response.message , notify.SUCCESS);
            
            this.callBack.loginChange.emit(2);
          }else{
            notify.showNotification(response.message , notify.DANGER);
          }
        })
      )
    }
    

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
  showInvitation(e){
    this.invitation = e.target.checked ? 1 : 0;
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
        // this.router.navigate(["/verification", { 'bidId': this.bidId }]);
        if(this.bidId !== undefined)
           this.router.navigate(["/verification", { 'bid_id': this.bidId }]);
        else
           this.router.navigate(["/verification"]);
        notify.showNotification(response.message , notify.SUCCESS);
        
        this.callBack.loginChange.emit(2);
      }else{
        notify.showNotification(response.message , notify.DANGER);
      }
    })
  }
  

}
