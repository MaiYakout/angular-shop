import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { convertToFormData } from 'src/app/Constants';
import { infoModel } from 'src/app/models/information';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import * as notify from '../../../../assets/js/notification'
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formGroup :FormGroup;
  loading =false;
  errorMessage;
  loadingPage =false;
  loadingpass = false
  information : infoModel
  photo;
  companyProfile;
  constructor(private router :Router ,private apiAuth :ApiAuthService) { 
    let token = localStorage.getItem('token');
    if(token == null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getInfo();
    
  }
  getInfo(){
    this.loadingPage= true
    this.apiAuth.getinformation().subscribe(res =>{
      this.information = res.data;
      console.log(this.information)
      this.initFormGroup()
      this.loadingPage = false
    })
  }
  initFormGroup(){
    this.formGroup = new FormGroup({
      name : new FormControl(this.information.name),
      crNum : new FormControl(this.information.crNum),
      phone : new FormControl(this.information.phone),
      email : new FormControl(this.information.email),
      companyName: new FormControl(this.information.companyName),
      webSite:new FormControl(this.information.webSite),
    });
  }
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  handleFile(fileInput , type){
    // const files=event.target.files;
    // if(files.length > 0){
    //   if(type == 1 )
    //     this.photo = files[0];
    //   else
    //     this.companyProfile = files[0];
    // }
      this.imageError = null;
      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg'];
          const max_height = 15200;
          const max_width = 25600;

          if (fileInput.target.files[0].size > max_size) {
              this.imageError =
                  'Maximum size allowed is ' + max_size / 1000 + 'Mb';

              return false;
          }

          if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
              this.imageError = 'Only Images are allowed ( JPG | PNG )';
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];

                  console.log(img_height, img_width);


                  if (img_height > max_height && img_width > max_width) {
                      this.imageError =
                          'Maximum dimentions allowed ' +
                          max_height +
                          '*' +
                          max_width +
                          'px';
                      return false;
                  } else {
                      const imgBase64Path = e.target.result;
                      this.cardImageBase64 = imgBase64Path;
                      this.isImageSaved = true;
                      // this.previewImagePath = imgBase64Path;
                      console.log(this.cardImageBase64)
                  if(type == 1 )
                    this.photo = this.cardImageBase64;
                  else
                    this.companyProfile = this.cardImageBase64;
                          }
                      };
                  };

          reader.readAsDataURL(fileInput.target.files[0]);
          
        }
      }
          
  
  
  submit(){
    this.loading = true;
    // console.log(this.photo,this.companyProfile)

    let data : FormData = convertToFormData(this.formGroup);
    data.append("companyLogo" , this.photo);
    
    data.append("companyProfile",this.companyProfile);

    this.apiAuth.editProfile(data).subscribe(res => {
      
      if(res.status === 1 )  {
        this.loading = false;
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
  changePassword(body){
    this.loadingpass = true;
    this.apiAuth.changePassword(body.value).subscribe(res => {
      body.reset();
      if(res.status === 1 )  {
        this.loadingpass = false;
        
        notify.showNotification(res.message , notify.SUCCESS);
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.loadingpass = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.loadingpass = false;
    })
  }
}
