import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CallBack } from 'src/app/callback_services/callback';
import { convertToFormData } from 'src/app/Constants';
import { RegionsModel } from 'src/app/models/regoins';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-complete-seller',
  templateUrl: './complete-seller.component.html',
  styleUrls: ['./complete-seller.component.scss']
})
export class CompleteSellerComponent implements OnInit {
  regions :RegionsModel[]
  formGroup :FormGroup;
  loading =false;
  errorMessage;
  bidId;
  photo;
  companyProfile;
  constructor(private router :Router,private route :ActivatedRoute , private apiAuth :ApiAuthService,private callBack :CallBack) { 
    let token = localStorage.getItem('token');
    if(token == null){
      this.router.navigate(['/login']);
    }
    route.params.subscribe(params => {
      this.bidId = params['bidId'];
    });
  }

  ngOnInit(): void {
    this.getRegions()
    this.initFormGroup();
  }
  getRegions(){
    this.apiAuth.getAllregions().subscribe(res =>{
      this.regions = res.data;
    })
  }
  initFormGroup(){
    this.formGroup = new FormGroup({
      companyName : new FormControl("" , Validators.required),
      companyRegion_id : new FormControl(null , Validators.required),
      crNum : new FormControl("" , Validators.required),
      companyPhone : new FormControl("" , Validators.required),
      webSite : new FormControl("" , Validators.required),
    });
  }
  handleFile(event , type){
    const files=event.target.files;
    if(files.length > 0){
      if(type == 1 )
        this.photo = files[0];
      else
        this.companyProfile = files[0];
    }
  }
  submit(){
    this.loading = true;
    let data : FormData = convertToFormData(this.formGroup);
    data.append("companyLogo" , this.photo);
    data.append("companyProfile",this.companyProfile);
    this.apiAuth.registerBury(data).subscribe(res => {
      this.loading = false;
      this.formGroup.reset();
      if(res.status === 1 )  {
        this.loading = false;
        if(this.bidId !== undefined)
           this.router.navigate(["/bidDetails", { 'bid_id': this.bidId }]);
          else
           this.router.navigate(["/Applied-Bids"]);
           this.callBack.loginChange.emit(2);
        notify.showNotification(res.message , notify.SUCCESS);
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.loading = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.loading = false;
    })
  }
}
