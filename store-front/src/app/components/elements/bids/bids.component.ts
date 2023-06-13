import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { publicBidModel } from 'src/app/models/publicBid';
import { ApiAuthService } from 'src/app/services/auth/api-auth.service';
import { ApiHomeService } from 'src/app/services/Home/api-home.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {

  bids : publicBidModel[];
  loadding= false;
  token
  buyerOrSeller 
  constructor(private router : Router ,private api :ApiHomeService , private generalApi : ApiAuthService) { }

  ngOnInit(): void {
    this.getInfo();
    this.token = localStorage.getItem('token')
    this.buyerOrSeller = localStorage.getItem('buyerOrSeller')
  }

  getInfo(){
    this.loadding = true
    this.api.getPublicBid().subscribe(res =>{
      this.bids = res.data.data
      this.loadding = false 
    })
  }

  bidLogin(id){
    if(this.token === null){
      this.router.navigate(["/login", { 'bid_id': id}]);
    }
    else{
      if(this.buyerOrSeller == 1){
        notify.showNotification('you have to be a seller to apply this bid' , notify.DANGER); 
      }
      else{
        this.router.navigate(["/bid-detailes", { 'bid_id': id}]);
      }

    }
    
  }
  SeeAll(){
    if(this.token === null){
      this.router.navigate(["/login"]);
    }
    else{
      if(this.buyerOrSeller == 1){
        this.router.navigate(["/bids"]);
      }
      else{
        this.router.navigate(["/Applied-Bids"]);
      }

    }
  }
  downloadAll(){
    console.log("download file " +this.bids[0].attaches[0].file)
    let fileUrl = this.bids[0].attaches[0].file;
    this.generalApi.downloadFile(fileUrl).subscribe((response: any) => {} ,(error: any) => {
      console.log('Error downloading the file');
      console.log(error)
    });
  }

}
