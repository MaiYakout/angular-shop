export interface ApplyResponce {
  status: number;
  message: string;
  data: ApplyModel;
}

export interface ApplyModel {
  id: number;
  isMyOffer: boolean;
  price: string;
  status: number;
  bid_id: number;
  cratedAt: string;
  cancelReason?: any;
  seller: Seller;
  attachCompany: any[];
  attachNormal: any[];
}

export interface Seller {
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
  invitationCode: string;
  crNum?: any;
  companyName?: any;
  companyPhone?: any;
  companyRegion?: any;
  token?: any;
}