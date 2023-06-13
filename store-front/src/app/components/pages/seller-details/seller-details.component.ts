import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { convertToFormData } from 'src/app/Constants';
import { BidOfferModel } from 'src/app/models/bidOffer';
import { CommentBidModel } from 'src/app/models/commentBid';
import { ReasonsModel } from 'src/app/models/reasons';
import { SingleBidModel } from 'src/app/models/singleBid';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';
import { ApiSellerService } from 'src/app/services/seller/api-seller.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {

  pageOffer = 1;
  showPagenateOffer = true;
  Arr = Array; 
  emptyPageOffer = false;
  loadingPageOffer = false;
  totalOffer
  numOffer:number =0 ;
  currentPageOffer : number = 0 ;
  lengthAllOffer;
  errorMessageOffer :string
  buyerOrSeller;
  loadingPage = false;
  singleData : SingleBidModel;
  bidId;
  invitation;
  bidOffer : BidOfferModel[];

  loadingbutton = false;
  formGroup : FormGroup;
  errorMessage:string;
  formGroupNewComment :FormGroup;
  newCommentLoading = false;
  showComment = false;
  replyButton = false;
  loadingReply = false;

  pageComment = 1;
  showPagenateComment = true;
  ArrComment = Array; 
  emptyPageComment = false;
  loadingPageComment = false;
  totalComment
  numComment:number =0 ;
  currentPageComment : number = 0 ;
  lengthAllComment;
  errorMessageComment :string;
  bidComment : CommentBidModel[];
  resonce : ReasonsModel[];
  typeResonse = 2
  constructor(private router :Router , private api : ApiBuyerService , private route :ActivatedRoute , private apiSeller : ApiSellerService) 
{ 
    this.buyerOrSeller = localStorage.getItem('buyerOrSeller');
    let token = localStorage.getItem('token');
    if(this.buyerOrSeller != 2){
      this.router.navigate(['/login']);
    }
    if(token == null){
      this.router.navigate(['/login']);
    }
    route.params.subscribe(params => {
      this.bidId = params['bid_id'];
    });
  }
  ngOnInit(): void {
    this.getSingleBid();
    this.getbidComment()
    this.initFormGroup();
    this.getResonce();
    this.getbidOffer();
    this.initFormGroupComment();
  }
  getSingleBid(){
    this.loadingPage = true
    this.apiSeller.getSingleBid(this.bidId).subscribe(res =>{
      this.singleData = res.data;
      // this.invitation = res.data.invitations.length;
      this.loadingPage = false
    })
  }
  getResonce(){
    this.api.getReasons(this.typeResonse).subscribe(res=>{
      this.resonce = res.data;
    })
  }
  submitExcuse(id){
    this.loadingbutton = true
    let data : FormData = convertToFormData(this.formGroup);
      data.append('offer_id', id+"");
    this.apiSeller.cancelOffer(data).subscribe(res => {
      this.loadingbutton = false;
      if(res.status === 1 )  {
        this.loadingbutton = false;
        this.getSingleBid();
        
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

  showNewComment(){
    this.showComment = true;
  }
  getbidComment(){
    this.showPagenateComment = true;
    this.emptyPageComment = false;
    this.loadingPageComment = true;
    this.api.getCommentBid(this.bidId , this.pageComment).subscribe(res =>{
      this.bidComment =  res.data.data;
      this.loadingPageComment = false;
      if(res.status == 1){
        this.loadingPageComment = false;
        this.numComment = res.data.pagination.total_pages;
        if(this.numComment < 2){
          this.showPagenateComment =false;
        }
        this.numComment = res.data.pagination.total_pages;
        this.currentPageComment = res.data.pagination.current_page ;
        this.lengthAllComment = res.data.data.length;
        this.totalComment = res.data.pagination.total
      }
      if(this.lengthAllComment === 0){
        this.emptyPageComment = true;
      }else{
        this.emptyPageComment = false;
      }
    })
  }
  submitNewComment(){
    this.newCommentLoading = true
    let data : FormData = convertToFormData(this.formGroupNewComment);
      data.append('bid_id', this.bidId);
    this.api.AddReply(data).subscribe(res => {
      this.newCommentLoading = false;
      if(res.status === 1 )  {
        this.newCommentLoading = false;
        this.getbidComment();
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroupNewComment.reset();
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.newCommentLoading = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.newCommentLoading = false;
    })
  }
  initFormGroupComment(){
    this.formGroupNewComment = new FormGroup({
      comment : new FormControl("" , Validators.required),
    });
  }
  showReplay(item :CommentBidModel){
    item.isCommit = true ; 
    this.replyButton = true;
  }

  submit(item : CommentBidModel){
    item.replayLoading = true;
    let data : FormData = convertToFormData(this.formGroup);
      data.append('parent_id', item?.id+"");
      data.append('bid_id', this.bidId);
    this.api.AddReply(data).subscribe(res => {
      item.replayLoading = false;
      if(res.status === 1 )  {
        item.replayLoading = false;
        this.getbidComment();
        
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroup.reset();
      }else{
        notify.showNotification(res.message , notify.DANGER);
        item.replayLoading = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      item.replayLoading = false;
    })
  }

  getbidOffer(){
    this.showPagenateOffer = true;
    this.emptyPageOffer = false;
    this.loadingPageOffer = true;
    this.api.getBidOffer(this.bidId , this.pageOffer).subscribe(res =>{
      this.bidOffer =  res.data.data;
      if(res.status == 1){
        this.loadingPageOffer = false;
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

  moveTo(index){
    if(index <= 0 || index > this.numOffer)return;
    this.pageOffer = index;
    this.getbidOffer();
  }

  moveToComment(index){
    if(index <= 0 || index > this.numComment)return;
    this.pageComment = index;
    this.getbidComment();
  }
  Apply(item){
    this.router.navigate(["/Applied", { 'Bid': JSON.stringify(item) }]);
  }
  chat(item){
    this.router.navigate(["/chat", { 'Bid': JSON.stringify(item) }]);
  }
}
