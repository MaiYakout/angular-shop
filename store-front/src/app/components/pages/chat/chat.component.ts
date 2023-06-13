import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessageModel, ChatModel } from 'src/app/models/chat_message_model';
import { ChatFirebaseService } from 'src/app/services/chat/chat-firebase.service';
import * as notify from '../../../../assets/js/notification'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  bid ;
  formGroup : FormGroup ;  
  messages : ChatMessageModel[] = [] ;
  myId : number ; 
  userType : number  ;
  roomData ; 
  loading =false;
  emptymessage = false;
  constructor(private route :ActivatedRoute , private firebase : ChatFirebaseService , private router : Router) { 
    route.params.subscribe(params => {
      this.bid =JSON.parse(params['Bid']) ;
    });
  }


  ngOnInit(): void {
    this.myId = Number.parseInt(localStorage?.getItem("id")??"0");
    this.userType = Number.parseInt(localStorage?.getItem("buyerOrSeller")??"0");
    this.initFormGroup() ;
    this.getMessages() ;
    this.getRoomData() ;

  }

  initFormGroup(){
    this.formGroup = new FormGroup({
      message : new FormControl('')
    });
  }

  getRoomData(){
    this.roomData = {
      user : this.userType === 1 ? this.bid.acceptedOffer.seller : this.bid.buyer ,
      bid : this.bid
    }
  }
  sendMessage(){
    let message = this.formGroup?.get('message')?.value??""; 
    if(message === "" )
     notify.showNotification("please add message to supmit" , notify.DANGER);

     let reciverId = this.userType === 1 ? this.bid.acceptedOffer.seller.id : this.bid.buyer.id ; 
      if(this.messages.length == 0 ){
        let chat : ChatModel = {
          seller : {
            id : this.bid.acceptedOffer.seller.id,
            name :this.bid.acceptedOffer.seller.name
          },
          buyer : {
            id : this.bid.buyer.id,
            name :this.bid.buyer.name
          },
          reciver_id :reciverId , 
          bid_id : this.bid.id ,
          messages : [] 
        }

        this.firebase.creatChat("chat_"+this.bid.id , chat);
      }
      let date = new Date() ; 
     let sendData : ChatMessageModel = {
       sender_id : this.myId,
       message: message ,
       reciever_Id :  reciverId,
       time : date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes() ,
       is_seen : false 
     }
    
     this.firebase.sendMessage("chat_"+this.bid.id , sendData);

     this.formGroup.reset();
  }
  getMessages(){
    this.loading = true;
    this.firebase.getChat("chat_"+this.bid.id ).snapshotChanges().subscribe(data => {
      this.loading = false;
      this.messages = data.map<ChatMessageModel>(e => e.payload.val());
      data.forEach(e => {
        if(e.payload.val().reciever_Id === this.myId){
          this.firebase.updateByKey("chat_"+this.bid.id , e.payload.key)
        }
      })
    });
  }

  gotoDetails(){
    if(this.userType == 1)
       this.router.navigate(["/bidDetails", { 'bid_id': this.bid.id }]);
    else
      this.router.navigate(["/bid-detailes", { 'bid_id': this.bid.id }]);
  }

}
