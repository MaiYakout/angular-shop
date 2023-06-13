import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  buyerOrSeller 
  constructor(private router :Router) { }

  ngOnInit(): void {
  }
  TypeRegester(e , id){
    this.buyerOrSeller  = id;
    // console.log(this.buyerOrSeller)
  }
  submitTybe(){
    // console.log('seller or buyer' + this.buyerOrSeller)
    if(this.buyerOrSeller == 1){
      this.router.navigate(["/register-buyer"]);
    }
    if(this.buyerOrSeller == 2){
      this.router.navigate(["/register-seller"]);
    }
    
  }
}
