export interface createBidResponce {
  status: number;
  message: string;
  data: createBidModel;
}

export interface createBidModel {
  id: number;
  isMain: boolean;
  name: string;
  highPrice: string;
  is_private: number;
  status: number;
  is_payed: number;
  acceptedOffer?: any;
  endDate: string;
  type: Type;
  region: Type;
  buyer: Buyer;
  cancelReason?: any;
  attaches: any[];
  invitations: Invitation[];
  myOffer?: any;
}

export interface Invitation {
  id: number;
  key: string;
  type: number;
}

export interface Buyer {
  id: number;
  phone: string;
  email: string;
  name: string;
  status: number;
  social: number;
  buyerOrSeller: number;
  lang: string;
  fire_base?: any;
  activeCode?: any;
  passwordCode?: any;
  invitationCode?: any;
  crNum: string;
  companyName: string;
  companyPhone: string;
  companyRegion: Type;
  token?: any;
}

export interface Type {
  id: number;
  name: string;
}