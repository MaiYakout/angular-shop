import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { convertToFormData } from 'src/app/Constants';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formGroup :FormGroup;
  loading =false;
  errorMessage
  constructor(private router :Router ,private apiAuth :ApiAuthService) { }

  ngOnInit(): void {
    this.initFormGroup()
  }
  initFormGroup(){
    this.formGroup = new FormGroup({
      email : new FormControl("" , Validators.required),
      
    });
  }
  submit(){
    this.loading = true;
    let data : FormData = convertToFormData(this.formGroup);
    this.apiAuth.forgetPassword(data).subscribe(res => {
      this.loading = false;
      this.formGroup.reset();
      if(res.status === 1 )  {
        localStorage.setItem('token',res.data.token);
        this.loading = false;
        this.router.navigate(["/complete-reset-password"]);
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
