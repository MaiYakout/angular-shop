import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { convertToFormData } from 'src/app/Constants';
import { BidOfferModel } from 'src/app/models/bidOffer';
import { CommentBidModel } from 'src/app/models/commentBid';
import { ReasonsModel } from 'src/app/models/reasons';
import { SingleBidModel } from 'src/app/models/singleBid';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';
import * as notify from '../../../../assets/js/notification'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.scss']
})
export class BidDetailsComponent implements OnInit {

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

  replyButton = false;
  loadingReply = false;
  formGroup : FormGroup;
  errorMessage :string;
  type = 1;
  reasons : ReasonsModel[];
  ResonsLoading= false;
  formGroupReasons :FormGroup;

  inviteLoading = false;
  formGroupInvite : FormGroup;

  formGroupNewComment :FormGroup;
  newCommentLoading = false
  selectable = true;
  removable = true;
  addOnBlur = true;
  payLoading = false ; 
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  invitations: string[] = [];
  showComment = false;

  SellerLoading = false;
  formGroupSeller :FormGroup;
  typeSeller
  constructor(
    private router :Router ,
     private api : ApiBuyerService ,
      private route :ActivatedRoute,
      private  dialogRef : MatDialog,
      private modalService:BsModalService,
      private paymentService:PaymentService) 
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
      this.bidId = params['bid_id'];
    });
  }
  ngOnInit(): void {
    this.getSingleBid();
    this.getbidOffer();
    this.getbidComment();
    this.initFormGroup();
    this.getReasons();
    this.initFormGroupReasons();
    this.initFormGroupInvit();
    this.initFormGroupComment();
    this.initFormGroupSeller()
  }
  getReasons(){
    this.api.getReasons(this.type).subscribe(res =>{
      this.reasons = res.data;
    })
  }
  initFormGroup(){
    this.formGroup = new FormGroup({
      comment : new FormControl("" , Validators.required),
    });
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
  getSingleBid(){
    this.loadingPage = true
    this.api.getSingleBid(this.bidId).subscribe(res =>{
      this.singleData = res.data;
      console.log("singleData",this.singleData)
      this.invitation = res.data.invitations.length;
      this.loadingPage = false
    })
  }
  getbidComment(){
    this.showPagenateComment = true;
    this.emptyPageComment = false;
    this.loadingPageComment = true;
    this.api.getCommentBid(this.bidId , this.pageComment).subscribe(res =>{
      this.bidComment =  res.data.data;
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
  getbidOffer(){
    this.showPagenateOffer = true;
    this.emptyPageOffer = false;
    this.loadingPageOffer = true;
    this.api.getBidOffer(this.bidId , this.pageOffer).subscribe(res =>{
      this.bidOffer =  res.data.data;
      if(res.status == 1){
        this.loadingPageOffer = false;
        console.log("offer",this.bidOffer)
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
  showReplay(item :CommentBidModel){
    item.isCommit = true ; 
    this.replyButton = true;
  }

  initFormGroupReasons(){
    this.formGroupReasons = new FormGroup({
      cancelReason_id : new FormControl(null , Validators.required),
    });
  }
@ViewChild ('template', { static: false }) template: any;
modalRef: BsModalRef;
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
  submitClosed(){
    this.ResonsLoading = true
    let data : FormData = convertToFormData(this.formGroupReasons);
      data.append('bid_id', this.bidId);
    this.api.CancleBid(data).subscribe(res => {
      this.ResonsLoading = false;
      if(res.status === 1 )  {
        this.ResonsLoading = false;
        this.getSingleBid()
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroupReasons.reset();
        if(this.singleData.is_payed === 0){
        this.modalRef = this.modalService.show(this.template, { class: 'modal-lg' });

        }
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.ResonsLoading = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.ResonsLoading = false;
    })
  }

  initFormGroupInvit(){
    this.formGroupInvite = new FormGroup({
      // cancelReason_id : new FormControl(null , Validators.required),
    });
  }
  submitInvite(){
    this.inviteLoading = true
    let data : FormData = convertToFormData(this.formGroupReasons);
    data.append('bid_id', this.bidId);
    for(let invite of this.invitations)
      data.append('invitations[]',invite) ;
    
    this.api.sendInviat(data).subscribe(res => {
      this.inviteLoading = false;
      if(res.status === 1 )  {
        this.inviteLoading = false;
        this.router.navigate(['/home']);
        this.getSingleBid()
        notify.showNotification(res.message , notify.SUCCESS);
        this.formGroupReasons.reset();
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.inviteLoading = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.inviteLoading = false;
    })
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

  payNow(){
    this.payLoading = true ;
    let data :FormData = new FormData();
    data.append("bid_id" , this.bidId);
    this.paymentService.payment(data).subscribe(res=>{
      this.payLoading = false;
      if(res.status === 1 )  {
        this.payLoading = false;
        console.log(res)
        notify.showNotification(res.message , notify.SUCCESS);
        window.location.href=res.data.redirect_url;
        this.modalRef.hide()
      }else{
        notify.showNotification(res.message , notify.DANGER);
        this.payLoading = false;
      }
    } , errorRes => {
      if(errorRes.status == 400)
      notify.showNotification(errorRes.error.message , notify.DANGER);
      else
      notify.showNotification(this.errorMessage , notify.DANGER);
      this.payLoading = false;
    })
 }
  showNewComment(){
    this.showComment = true;
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
  edit(id){
    this.router.navigate(["/edit-bid", { 'bid_Id': id }]);
  }

  initFormGroupSeller(){
    this.formGroupSeller = new FormGroup({
      offer_id : new FormControl(null , Validators.required),
    });
  }
  submitChooes(){
    this.SellerLoading = true
    let data : FormData = convertToFormData(this.formGroupSeller);
      data.append('bid_id', this.bidId);
    this.api.ChooseSeller(data).subscribe(res => {
      this.SellerLoading = false;
      if(res.status === 1 )  {
        this.SellerLoading = false;
        this.getbidComment();
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

