import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'
import { CallBack } from 'src/app/callback_services/callback';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  email
  loading :boolean = false;
  buyerOrSeller;
  bidId
  constructor(private router :Router,private route :ActivatedRoute , private api : ApiAuthService , private callBack :CallBack) { 
    let token = localStorage.getItem('token');
    if(token == null){
      this.router.navigate(['/login']);
    }
    route.params.subscribe(params => {
      this.email = params['emailBury'];
      this.bidId = params['bidId'];
    });
  }
  ngOnInit(): void {
  }
  submit(body){
    this.loading = true ; 
    this.buyerOrSeller = localStorage.getItem('buyerOrSeller')
    this.api.checkActiveCode(body).subscribe(response=>{
      this.loading = false ; 
      if(response.status == 1 ){
        
        if(this.buyerOrSeller === '2'){
          if(this.bidId !== undefined)
           this.router.navigate(["/complete-profile-seller", { 'bid_id': this.bidId }]);
          else
           this.router.navigate(["/complete-profile-seller"]);
           this.callBack.loginChange.emit(2);
          }
        else{
          this.router.navigate(["/complete-profile"]);
        }
        notify.showNotification(response.message , notify.SUCCESS);
      }else{
        notify.showNotification(response.message , notify.DANGER);
      }
    })
  }

}
