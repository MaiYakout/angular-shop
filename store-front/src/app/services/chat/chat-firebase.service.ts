import { Injectable } from '@angular/core';

import { AngularFireDatabase , AngularFireList} from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChatComponent } from 'src/app/components/pages/chat/chat.component';
import { ChatMessageModel, ChatModel } from 'src/app/models/chat_message_model';

@Injectable({
  providedIn: 'root'
})
export class ChatFirebaseService {
   PATH : string  = "/chat" ;
  constructor(private db : AngularFireDatabase) { }

  public getChat(chatKey : string) : AngularFireList<ChatMessageModel> {
    return  this.db.list(this.PATH+"/"+chatKey + "/"  +"messages");
  }

  public sendMessage(chatKey : string , message : ChatMessageModel): any {
    return this.db.list(this.PATH+"/"+chatKey+ "/messages").push(message);
  }

  public creatChat(chatKey : string , chat : ChatModel){
    return this.db.object(this.PATH+"/"+chatKey).set(chat);
  }

  public updateByKey(chatKey :string , key){
    console.log(key);
    return this.db.object(this.PATH+"/"+chatKey+"/messages/"+key ).update({is_seen : true});
  }

  public  getChatHeads(userId) : AngularFireList<ChatModel>  {
    return this.db.list(this.PATH , ref => ref.orderByChild("reciver_id").equalTo(userId)); 
  }
}
