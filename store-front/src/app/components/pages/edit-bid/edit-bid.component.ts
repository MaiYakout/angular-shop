import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { typeBidModel } from 'src/app/models/typeBid';
import { RegionsModel } from 'src/app/models/regoins';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';
import * as notify from '../../../../assets/js/notification'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { SingleBidModel } from 'src/app/models/singleBid';
import { convertToFormData } from 'src/app/Constants';

@Component({
  selector: 'app-edit-bid',
  templateUrl: './edit-bid.component.html',
  styleUrls: ['./edit-bid.component.scss']
})
export class EditBidComponent implements OnInit {

  notAvilable = false;
  buyerOrSeller;
  type : typeBidModel[];
  region : RegionsModel[]
  formGroup :FormGroup;
  loading =false;
  errorMessage


  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  invitations: string[] = [];
  attachments : File[] = [] ;
  attachments2 : File[] = [] ;

  bidDetailes : SingleBidModel;
  bidId :number;
  loadingPage = false

  
  constructor(private router :Router , private api : ApiBuyerService , private route :ActivatedRoute, private apiAuth :ApiAuthService) 
{ 
    this.buyerOrSeller = localStorage.getItem('buyerOrSeller');
    let token = localStorage.getItem('token');
    if(this.buyerOrSeller != 1){
      this.router.navigate(['/login']);
    }
    if(token == null){
      this.router.navigate(['/login']);
    }
    route.params.subscribe(params => {
      this.bidId = params['bid_Id'];
    });
  }

  public onTagEdited(item) {
    // console.log('tag edited: current value is ' + item);
  }

  ngOnInit(): void {
    this.getSingleBid()
    this.getTypeBid();
    this.getRegionBid();
  }
  getSingleBid(){
    this.loadingPage = true;
    this.invitations=[]
    this.attachments2=[]
    this.api.getSingleBid(this.bidId).subscribe(res =>{
      this.bidDetailes = res.data;
      this.bidDetailes.invitations.map(e => this.invitations.push(e.key))
      this.bidDetailes.attaches.map(e => this.attachments2.push(e))
      this.initFormGroup();
      this.loadingPage = false
    })
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
      name : new FormControl(this.bidDetailes.name , Validators.required),
      endDate : new FormControl(this.bidDetailes.endDate , Validators.required),
      type_id : new FormControl(this.bidDetailes.type.id , Validators.required),
      region_id : new FormControl(this.bidDetailes.region.id , Validators.required),
      is_private : new FormControl(this.bidDetailes.is_private , Validators.required)
    });
  }
  submit(){
    this.loading = true;
    let data : FormData = convertToFormData(this.formGroup);
    for(let invite of this.invitations)
      data.append('invitations[]',invite) ;
    for (let file of this.attachments) 
      data.append('attaches[]', file);
      data.append("bid_id", this.bidId + "") ;
  
    let dateTime = new Date((this.formGroup.get('endDate').value+"").replace("T" , " "));
    // console.log(this.formGroup.get('endDate').value);
    let formatedDate = dateTime.getFullYear()+"-"+((dateTime.getMonth()+1) < 10 ? "0"+(dateTime.getMonth()+1) : (dateTime.getMonth()+1))+"-"+(dateTime.getDate() < 10 ? "0"+dateTime.getDate() : dateTime.getDate())
    +" "+(dateTime.getHours() < 10 ? "0"+dateTime.getHours() : dateTime.getHours())+":"+(dateTime.getMinutes() < 10 ? "0"+dateTime.getMinutes() :dateTime.getMinutes());
    data.set("endDate", formatedDate) ;

    this.api.editBid(data).subscribe(res => {
      this.loading = false;
      this.getSingleBid();
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
  handleFile(event) {
    const files=event.target.files;
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
      notify.showNotification("this email or phone is already exisit" , notify.DANGER);
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
