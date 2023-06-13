export interface ChatMessageModel {
  sender_id: number;
  message: string;
  reciever_Id: number;
  time : string ,
  is_seen :boolean
}

export interface ChatUserModel{
  id : number ,
  name : string
}

export interface ChatModel{
  seller :ChatUserModel ;
  buyer :ChatUserModel;
  reciver_id : number ; 
  bid_id :number ; 
  messages : ChatMessageModel[] 
}

export interface MessagePageModel{
  name : string ; 
  message : any ; 
  bidId :number 
}