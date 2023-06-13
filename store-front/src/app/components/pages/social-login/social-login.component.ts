import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { CallBack } from 'src/app/callback_services/callback';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

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
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log("user",user);
    });
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
