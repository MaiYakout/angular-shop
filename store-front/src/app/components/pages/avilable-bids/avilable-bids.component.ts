import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableBidModel } from 'src/app/models/avilableBid';
import { ApiSellerService } from 'src/app/services/seller/api-seller.service';

@Component({
  selector: 'app-avilable-bids',
  templateUrl: './avilable-bids.component.html',
  styleUrls: ['./avilable-bids.component.scss']
})
export class AvilableBidsComponent implements OnInit {

  pageAvilable = 1;
  showPagenateAvilable = true;
  ArrAvilable = Array; 
  emptyPageAvilable = false;
  loadingPageAvilable = false;
  numAvilable:number =0 ;
  currentPageAvilable : number = 0 ;
  lengthAllAvilable;
  buyerOrSeller;
  totalAvilable :number
  sliderLength;
  typeSeller = 2
  AvilableBid :AvailableBidModel[]
  constructor(private router :Router , private api : ApiSellerService , private route :ActivatedRoute) {
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
    this.getAvialableBid()
  }
  getAvialableBid(){
    this.showPagenateAvilable = true;
    this.emptyPageAvilable = false;
    this.loadingPageAvilable = true;
    this.api.getAvilableBid(this.pageAvilable).subscribe(res=>{
      this.AvilableBid =res.data.data
      if(res.status == 1){
        this.loadingPageAvilable = false;
        this.numAvilable = res.data.pagination.total_pages;
        if(this.numAvilable < 2){
          this.showPagenateAvilable =false;
        }
        
        this.numAvilable = res.data.pagination.total_pages;
        this.currentPageAvilable = res.data.pagination.current_page ;
        this.lengthAllAvilable = res.data.data.length;
        this.totalAvilable = res.data.pagination.total
      }
      if(this.lengthAllAvilable === 0){
        this.sliderLength = true;
      }else{
        this.sliderLength = false;
      }
    })
  }

  moveTo(index){
    if(index <= 0 || index > this.numAvilable)return;
    this.pageAvilable = index;
    this.getAvialableBid();
  }

  Apply(item){
    this.router.navigate(["/Applied", { 'Bid': JSON.stringify(item) }]);
  }
  Detailes(id){
    this.router.navigate(["/bid-detailes", { 'bid_id': id }]);
  }
}
