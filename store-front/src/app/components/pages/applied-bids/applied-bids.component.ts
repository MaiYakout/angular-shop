import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { convertToFormData } from 'src/app/Constants';
import { closedBidsModel } from 'src/app/models/closeBidSeller';
import { inProgressBidsModel } from 'src/app/models/inProgressBid';
import { ReasonsModel } from 'src/app/models/reasons';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';
import { ApiSellerService } from 'src/app/services/seller/api-seller.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-applied-bids',
  templateUrl: './applied-bids.component.html',
  styleUrls: ['./applied-bids.component.scss']
})
export class AppliedBidsComponent implements OnInit {

  typeSeller = 2;
  pageClosed = 1;
  showPagenateClosed = true;
  ArrClosed = Array; 
  emptyPageClosed = false;
  loadingPageClosed = false;
  numClosed:number =0 ;
  currentPageClosed : number = 0 ;
  lengthAllClosed;
  buyerOrSeller;
  totalClosed :number
  ClosedBid :closedBidsModel[]

  pageInProgress = 1;
  showPagenateInProgress = true;
  ArrInProgress = Array; 
  emptyPageInProgress = false;
  loadingPageInProgress = false;
  numInProgress:number =0 ;
  currentPageInProgress : number = 0 ;
  lengthAllInProgress;
  totalInProgress :number
  InProgressBid :inProgressBidsModel[];
  showActivePast =false;
  showActive =false;
  resonce : ReasonsModel[];
  typeResonse = 2

  loadingbutton = false;
  formGroup : FormGroup;
  errorMessage:string
  constructor(private router :Router , private api : ApiSellerService , private route :ActivatedRoute , private apiResonse :ApiBuyerService) {
    this.buyerOrSeller = localStorage.getItem('buyerOrSeller');
    let token = localStorage.getItem('token');
    if(this.buyerOrSeller != 2){
      this.router.navigate(['/login']);
    }
    if(token == null){
      this.router.navigate(['/login']);
    }
   }
  ngOnInit(): void {
    this.getProgress();
    this.getResonce();
    this.initFormGroup()
  }

  getClosedBid(){
    this.showPagenateClosed = true;
    this.emptyPageClosed = false;
    this.loadingPageClosed = true;
    this.api.getClosedBid(this.pageClosed).subscribe(res=>{
      this.ClosedBid =res.data.data
      if(res.status == 1){
        this.loadingPageClosed = false;
        this.numClosed = res.data.pagination.total_pages;
        if(this.numClosed < 2){
          this.showPagenateClosed =false;
        }
        
        this.numClosed = res.data.pagination.total_pages;
        this.currentPageClosed = res.data.pagination.current_page ;
        this.lengthAllClosed = res.data.data.length;
        this.totalClosed = res.data.pagination.total
      }
      if(this.lengthAllClosed === 0){
        this.emptyPageClosed = true;
      }else{
        this.emptyPageClosed = false;
      }
    })
  }

  moveToCloseBid(index){
    if(index <= 0 || index > this.numClosed)return;
    this.pageClosed = index;
    this.getClosedBid();
  }


  getProgress(){
    this.showPagenateInProgress = true;
    this.emptyPageInProgress = false;
    this.loadingPageInProgress = true;
    this.api.getinProgressBid(this.pageInProgress).subscribe(res=>{
      this.InProgressBid =res.data.data
      if(res.status == 1){
        this.showPagenateInProgress = false;
        this.loadingPageInProgress = false
        this.numInProgress = res.data.pagination.total_pages;
        if(this.numInProgress < 2){
          this.showPagenateInProgress =false;
        }
        
        this.numInProgress = res.data.pagination.total_pages;
        this.currentPageInProgress = res.data.pagination.current_page ;
        this.lengthAllInProgress = res.data.data.length;
        this.totalInProgress = res.data.pagination.total
      }
      if(this.lengthAllInProgress === 0){
        this.emptyPageInProgress = true;
      }else{
        this.emptyPageInProgress = false;
      }
    })
  }

  moveToInProgress(index){
    if(index <= 0 || index > this.numInProgress)return;
    this.pageInProgress = index;
    this.getProgress();
  }

  showProgress(){
    this.showActivePast = true;
    this.showActive = false;
  }
  showClosed(){
    this.getClosedBid()
    this.showActive = true;
    this.showActivePast = false
  }

  EditBids(bid){
    this.router.navigate(["/Applied", { 'Bid': JSON.stringify(bid) , "offer" : JSON.stringify(bid.myOffer) }]);
  }

  getResonce(){
    this.apiResonse.getReasons(this.typeResonse).subscribe(res=>{
      this.resonce = res.data;
    })
  }

  submitExcuse(id){
    this.loadingbutton = true
    let data : FormData = convertToFormData(this.formGroup);
      data.append('offer_id', id+"");
    this.api.cancelOffer(data).subscribe(res => {
      this.loadingbutton = false;
      if(res.status === 1 )  {
        this.loadingbutton = false;
        this.getProgress();
        
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroup.reset();
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.loadingbutton = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.loadingbutton = false;
    })

  }

  initFormGroup(){
    this.formGroup = new FormGroup({
      cancelReason_id : new FormControl(null , Validators.required),
    });
  }

  Detailes(id){
    this.router.navigate(["/bid-detailes", { 'bid_id': id }]);
  }
  chat(item){
    this.router.navigate(["/chat", { 'Bid': JSON.stringify(item) }]);
  }
}
