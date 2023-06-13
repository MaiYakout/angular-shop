import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  AttachActive } from 'src/app/models/activeBid';
import { ActiveBidsModel } from 'src/app/models/bidsBuyer';
import { PastBidModel } from 'src/app/models/pastBid';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent implements OnInit {

  pageActive = 1;
  showPagenateActive = true;
  Arr = Array; 
  emptyPageActive = false;
  loadingPageActive = false;
  numActive:number =0 ;
  currentPageActive : number = 0 ;
  lengthAllActive;
  errorMessageActive :string
  notAvilable = false;
  buyerOrSeller;
  ActiveBids : ActiveBidsModel[];
  totalActive

  pagePast = 1;
  showPagenatePast = true;
  ArrPast = Array; 
  emptyPagePast = false;
  loadingPagePast = false;
  numPast:number =0 ;
  currentPagePast : number = 0 ;
  lengthAllPast;
  PastBids : PastBidModel[];
  showActivePast = false;
  totalPast
  constructor(private router :Router , private api : ApiBuyerService) 
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

  ngOnInit(): void {
    this.getBids();
    
  }
  
  showActiveBid(){
    this.showActivePast = false;
  }
  showPastBid(){
    this.getBidsPast();
    this.showActivePast = true;
  }
  getBids(){
    this.showPagenateActive = true;
    this.emptyPageActive = false;
    this.loadingPageActive = true;
    this.api.getActiveBids(this.pageActive).subscribe(res =>{
      this.ActiveBids =  res.data.data;
      if(res.status == 1){
        this.loadingPageActive = false;
        this.numActive = res.data.pagination.total_pages;
        if(this.numActive < 2){
          this.showPagenateActive =false;
        }
        
        this.numActive = res.data.pagination.total_pages;
        this.currentPageActive = res.data.pagination.current_page ;
        this.lengthAllActive = res.data.data.length;
        this.totalActive = res.data.pagination.total
      }
      if(this.lengthAllActive === 0){
        this.emptyPageActive = true;
      }else{
        this.emptyPageActive = false;
      }
    })
  }
  moveTo(index){
    if(index <= 0 || index > this.numActive)return;
    this.pageActive = index;
    this.getBids();
  }

  moveToPast(index){
    if(index <= 0 || index > this.numPast)return;
    this.pagePast = index;
    this.getBids();
  }
  getBidsPast(){
    this.showPagenatePast = true;
    this.emptyPagePast = false;
    this.loadingPagePast = true;
    // console.log(this.loadingPagePast)
    this.api.getBastBid(this.pagePast).subscribe(res =>{
      this.PastBids =  res.data.data;
      console.log("past bids",this.PastBids)
      if(res.status == 1){
        this.loadingPagePast = false;
        this.numPast = res.data.pagination.total_pages;
        if(this.numPast < 2){
          this.showPagenatePast =false;
        }
        
        this.numPast = res.data.pagination.total_pages;
        this.currentPagePast = res.data.pagination.current_page ;
        this.lengthAllPast = res.data.data.length;
        this.totalPast = res.data.pagination.total
      }
      if(this.lengthAllPast === 0){
        this.emptyPagePast = true;
      }else{
        this.emptyPagePast = false;
      }
      // console.log(this.loadingPagePast)
      // console.log(this.emptyPagePast)
    })
  }
editPage(id){
  this.router.navigate(["/edit-bid", { 'bid_Id': id }]);
}
SinglPage(id){
  this.router.navigate(["/bidDetails", { 'bid_id': id }]);
}
}
