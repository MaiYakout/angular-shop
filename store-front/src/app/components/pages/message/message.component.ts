import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatModel, MessagePageModel } from 'src/app/models/chat_message_model';
import { ApiBuyerService } from 'src/app/services/Buyer/api-buyer.service';
import { ChatFirebaseService } from 'src/app/services/chat/chat-firebase.service';
import { ApiSellerService } from 'src/app/services/seller/api-seller.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  userId : number ; 
  userType : number ; 
  loading = false;
  emptymessage = false;
  messages:  MessagePageModel[]  = [] ;
  constructor(private firebase : ChatFirebaseService ,private sellerApi : ApiSellerService , private buyerApi : ApiBuyerService , private router : Router) { }

  ngOnInit(): void {
    this.userId = Number.parseInt(localStorage.getItem("id")??"0")
    this.userType = Number.parseInt(localStorage.getItem("buyerOrSeller")??"0")
    this.getMessages()
  }

  getMessages(){
    this.loading = true
    this.firebase.getChatHeads(this.userId).snapshotChanges().subscribe(
      data => {
        let chats = data.map<ChatModel>(e=>e.payload.val());

        this.messages = chats.map<MessagePageModel>(e => {
          let messagesArray: any[] = Object.values(e.messages);
          return {
            name : this.userType === 1 ? e.buyer.name : e.seller.name ,
            message : messagesArray.pop(),
            bidId : e.bid_id
          }
        });
        this.loading = false
        if(this.messages.length === 0)
            this.emptymessage = true;
          else 
            this.emptymessage = false;
      }
    );

  }  

  getToChat(bid_id){
    this.loading = true;
    (this.userType == 1 ? this.buyerApi.getSingleBid(bid_id) : this.sellerApi.getSingleBid(bid_id)).subscribe(
      res => {
        this.router.navigate(["/chat", { 'Bid': JSON.stringify(res.data) }]);
      }
    )
    
  }
}


