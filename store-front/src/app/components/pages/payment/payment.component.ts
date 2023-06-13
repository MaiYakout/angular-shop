import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { convertToFormData } from 'src/app/Constants';
import { BidOfferModel, BidOfferResponce } from 'src/app/models/bidOffer';
import { SingleBidModel } from 'src/app/models/singleBid';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  loading =false;
  errorMessage;
  buyerOrSeller:string;
  bidId:string;
  bid_offer:BidOfferModel[];
  showPagenateOffer:boolean=true;
emptyPageOffer:boolean=false;
loadingPageOffer:boolean=false;
numOffer:number =0;
currentPageOffer: number = 0
lengthAllOffer
totalOffer
offer:BidOfferResponce;
SellerLoading:boolean;
formGroupSeller:FormGroup;
singleData : SingleBidModel;

  constructor(
    private router :Router , 
    private route :ActivatedRoute, 
    private paymentService :PaymentService,
    private api:ApiBuyerService) 
  { 
      this.buyerOrSeller = localStorage.getItem('buyerOrSeller');
      let token = localStorage.getItem('token');
      if(+this.buyerOrSeller != 1){
        this.router.navigate(['/login']);
      }
      if(token == null){
        this.router.navigate(['/login']);
      }
      route.params.subscribe(params => {
        this.bidId = params['id'];
      });
    }
  ngOnInit(): void {
    this.getOffers(this.bidId);
    this.initFormGroupSeller();
    this.getBidDetails(this.bidId)
  }
  getOffers(bid_id){
    this.showPagenateOffer = true;
    this.emptyPageOffer = false;
    this.loadingPageOffer = true;
    this.loading=false;
    this.paymentService.paymentOffers(bid_id).subscribe(res=>{
      this.offer=res
      this.bid_offer =  res.data.data;
      if(res.status == 1){
        this.loading=true;
        this.loadingPageOffer = false;
        console.log("offer",this.bid_offer)
        this.numOffer = res.data.pagination.total_pages;
        if(this.numOffer < 2){
          this.showPagenateOffer =false;
        }
        this.numOffer = res.data.pagination.total_pages;
        this.currentPageOffer = res.data.pagination.current_page ;
        this.lengthAllOffer = res.data.data.length;
        this.totalOffer = res.data.pagination.total
      }
      if(this.lengthAllOffer === 0){
        this.emptyPageOffer = true;
      }else{
        this.emptyPageOffer = false;
      }
    })
  }
 
  initFormGroupSeller(){
    this.formGroupSeller = new FormGroup({
      offer_id : new FormControl(null , Validators.required),
    });
  }
  getBidDetails(bid_id){
    this.api.getSingleBid(bid_id).subscribe(res =>{
      this.singleData = res.data;
      console.log("singleData",this.singleData)
    })
  }
  submitChooes(){
    this.SellerLoading = true
    let data : FormData = convertToFormData(this.formGroupSeller);
      data.append('bid_id', this.bidId);
    this.api.ChooseSeller(data).subscribe(res => {
      this.SellerLoading = false;
      if(res.status === 1 )  {
        this.SellerLoading = false;
        this.getBidDetails(this.bidId)
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroupSeller.reset();
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.SellerLoading = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.SellerLoading = false;
    })
  }
  chat(bid ){
    this.router.navigate(["/chat", { 'Bid': JSON.stringify(bid) }]);
  }
}
