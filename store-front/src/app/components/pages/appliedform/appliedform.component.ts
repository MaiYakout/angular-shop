import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { convertToFormData } from 'src/app/Constants';
import * as notify from '../../../../assets/js/notification'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableBidModel } from 'src/app/models/avilableBid';
import { ApiSellerService } from 'src/app/services/seller/api-seller.service';

@Component({
  selector: 'app-appliedform',
  templateUrl: './appliedform.component.html',
  styleUrls: ['./appliedform.component.scss']
})
export class AppliedformComponent implements OnInit {

  bidItem : AvailableBidModel;
  formGroup : FormGroup
  selectable = true;
  removable = true;
  addOnBlur = true;
  loading =false;
  offer ; 
  errorMessage;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  companyAttaches: File[] = [];
  normalAttaches : File[] = [] ;
  constructor( private route :ActivatedRoute , private router : Router , private api : ApiSellerService) { 
    route.params.subscribe(params => {
      this.bidItem = JSON.parse (params['Bid']);
      this.offer = JSON.parse(params['offer'])
    });
  }

  ngOnInit(): void {
    this.initFormGroup()
  }

  initFormGroup(){
    this.formGroup = new FormGroup({
      price : new FormControl(this.offer?.price??"" , Validators.required),
    });
  }
  Details(id){
    this.router.navigate(["/bid-detailes", { 'bid_id': id }]);
  }

  submit(){
    this.loading = true;
    let data : FormData = convertToFormData(this.formGroup);
    data.append('bid_id',this.bidItem.id+"") ;
    for(let filecompany of this.companyAttaches)
      data.append('companyAttaches[]',filecompany) ;
    for (let fileNormal of this.normalAttaches) 
      data.append('normalAttaches[]', fileNormal);

    this.api.Apply(data).subscribe(res => {
      this.loading = false;
      if(res.status === 1 )  {
        this.loading = false;
        this.router.navigate(["/bid-detailes", { 'bid_id': this.bidItem.id }]);
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroup.reset();
        this.companyAttaches = [] ;
        this.normalAttaches =[];
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

  handleFileCompany(event) {
    // console.log("handle file");
    const files=event.target.files;
    // console.log(files)
    if(files.length > 0){
      for(let i = 0 ; i < files.length ; i++){
        if(this.companyAttaches.indexOf(files[i]) === -1 )
        this.companyAttaches.push(files[i]);
      }
    }
  }

  handleFileNormal(event) {
    // console.log("handle file");
    const files=event.target.files;
    // console.log(files)
    if(files.length > 0){
      for(let i = 0 ; i < files.length ; i++){
        if(this.normalAttaches.indexOf(files[i]) === -1 )
        this.normalAttaches.push(files[i]);
      }
    }
  }

  removeCompany(value: File): void {
    const index = this.companyAttaches.indexOf(value);

    if (index >= 0) {
      this.companyAttaches.splice(index, 1);
    }
  }

  removeNormal(value: File): void {
    const index = this.normalAttaches.indexOf(value);

    if (index >= 0) {
      this.normalAttaches.splice(index, 1);
    }
  }
}
