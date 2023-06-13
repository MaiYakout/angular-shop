import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { convertToFormData } from 'src/app/Constants';
import { typeBidModel } from 'src/app/models/typeBid';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';
import * as notify from '../../../../assets/js/notification'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import { RegionsModel } from 'src/app/models/regoins';


@Component({
  selector: 'app-create-bids',
  templateUrl: './create-bids.component.html',
  styleUrls: ['./create-bids.component.scss']
})
export class CreateBidsComponent implements OnInit {
  notAvilable = false;
  buyerOrSeller;
  type : typeBidModel[];
  region : RegionsModel[]
  formGroup :FormGroup;
  loading =false;
  errorMessage
  is_private =1

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  invitations: string[] = [];
  attachments : File[] = [] ;
  


  
  constructor(private router :Router , private api : ApiBuyerService , private apiAuth :ApiAuthService) 
{ 
    this.buyerOrSeller = localStorage.getItem('buyerOrSeller');
    let token = localStorage.getItem('token');
    if(this.buyerOrSeller != 1){
      this.router.navigate(['/login']);
    }
    if(token == null){
      this.router.navigate(['/login']);
    }
  }

  public onTagEdited(item) {
    // console.log('tag edited: current value is ' + item);
  }

  ngOnInit(): void {
    this.getTypeBid();
    this.getRegionBid();
    this.initFormGroup();
  }
  getTypeBid(){
    this.api.getTypeBids().subscribe(res =>{
      this.type = res.data;
    })
  }
  getRegionBid(){
    this.apiAuth.getAllregions().subscribe(res =>{
      this.region = res.data;
    })
  }

  initFormGroup(){
    this.formGroup = new FormGroup({
      name : new FormControl("" , Validators.required),
      endDate : new FormControl("" , Validators.required),
      type_id : new FormControl(null , Validators.required),
      region_id : new FormControl(null , Validators.required),
      is_private : new FormControl(1 , Validators.required),
      invitation: new FormControl(null,Validators.required)
    });
  }
  submit(){
    this.loading = true;
    let data : FormData = convertToFormData(this.formGroup);
    console.log(this.formGroup.value)
    data.append('is_private',this.is_private+'') ;
    for(let invite of this.invitations)
      data.append('invitations[]',invite) ;
    for (let file of this.attachments) 
      data.append('attaches[]', file);
  
    let dateTime = new Date((this.formGroup.get('endDate').value+"").replace("T" , " "));
    // console.log(this.formGroup.get('endDate').value);
    let formatedDate = dateTime.getFullYear()+"-"+((dateTime.getMonth()+1) < 10 ? "0"+(dateTime.getMonth()+1) : (dateTime.getMonth()+1))+"-"+(dateTime.getDate() < 10 ? "0"+dateTime.getDate() : dateTime.getDate())
    +" "+(dateTime.getHours() < 10 ? "0"+dateTime.getHours() : dateTime.getHours())+":"+(dateTime.getMinutes() < 10 ? "0"+dateTime.getMinutes() :dateTime.getMinutes());
    // console.log(dateTime);
    // console.log(formatedDate);
    data.set("endDate", formatedDate) ;
    
    this.api.createBid(data).subscribe(res => {
      this.loading = false;
      if(res.status === 1 ){
        this.loading = false;
        this.router.navigate(["/bids"]);
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroup.reset();
        this.invitations = [] ;
        this.attachments =[];
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

  handleFile(event) {
    // console.log("handle file");
    const files=event.target.files;
    // console.log(files)
    if(files.length > 0){
      for(let i = 0 ; i < files.length ; i++){
        if(this.attachments.indexOf(files[i]) === -1 )
        this.attachments.push(files[i]);
      }
    }
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if(this.invitations.indexOf(value) !== -1 )
    {
      notify.showNotification("this email or phone is already exist" , notify.DANGER);
      event.chipInput!.clear();
      return ; 
    }

     

    let emailMatche = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
    let phoneMatche =new RegExp(/^[0-9]/).test(value);

    // console.log({
    //   emailMatches : emailMatche,
    //   phoneMatches : phoneMatche
    // });

    if(!emailMatche && !phoneMatche && value){
      notify.showNotification("please enter a valid email or phone" , notify.DANGER);
      event.chipInput!.clear();
      return ; 
    }
    
    if (value) {
      this.invitations.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.invitations.indexOf(value);

    if (index >= 0) {
      this.invitations.splice(index, 1);
    }
  }

  removeAttachment(value: File): void {
    const index = this.attachments.indexOf(value);

    if (index >= 0) {
      this.attachments.splice(index, 1);
    }
  }
}
