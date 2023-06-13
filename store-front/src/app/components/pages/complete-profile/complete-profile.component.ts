import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallBack } from 'src/app/callback_services/callback';
import { convertToFormData } from 'src/app/Constants';
import { RegionsModel } from 'src/app/models/regoins';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  regions :RegionsModel[]
  formGroup :FormGroup;
  loading =false;
  errorMessage;

  constructor(private router :Router , private apiAuth :ApiAuthService,private callBack :CallBack) { 
    let token = localStorage.getItem('token');
    if(token == null){
      this.router.navigate(['/login']);
    }
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
      
    });
  }
  submit(){
    this.loading = true;
    let data : FormData = convertToFormData(this.formGroup);
    this.apiAuth.registerBury(data).subscribe(res => {
      this.loading = false;
      this.formGroup.reset();
      if(res.status === 1 )  {
        this.loading = false;
        this.router.navigate(["/bids"]);
        this.callBack.loginChange.emit(1);
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
