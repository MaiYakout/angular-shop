export interface closedBidsResponce {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  data: closedBidsModel[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface closedBidsModel {
  id: number;
  isMain: boolean;
  differentDateTime?: any;
  isInvite: boolean;
  name: string;
  highPrice: string;
  is_private: number;
  status: number;
  is_payed: number;
  acceptedOffer?: any;
  endDate: string;
  createdAt: string;
  type: Type;
  region: Type;
  buyer: Buyer;
  cancelReason: CancelReason;
  attaches: Attach[];
  invitations: Invitation[];
  myOffer: MyOffer;
}

export interface MyOffer {
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

export interface Invitation {
  id: number;
  key: string;
  type: number;
}

export interface Attach {
  id: number;
  name: string;
  file: string;
}

export interface CancelReason {
  id: number;
  type: number;
  name: string;
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
  invitationCode?: string;
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