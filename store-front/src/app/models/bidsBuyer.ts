export interface BuyerResponcs {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  activeBids: ActiveBids;
  bastBids: BastBids;
}

export interface BastBids {
  data: BuyerModel[];
  pagination: Pagination;
}

export interface BuyerModel {
  id: number;
  isMain: boolean;
  name: string;
  highPrice: string;
  is_private: number;
  status: number;
  is_payed: number;
  acceptedOffer?: AcceptedOffer;
  endDate: string;
  type: Type;
  region: Type;
  buyer: Buyer;
  cancelReason?: CancelReason;
  attaches: Attach[];
  invitations: Invitation[];
  myOffer?: any;
}

export interface CancelReason {
  id: number;
  type: number;
  name: string;
}

export interface AcceptedOffer {
  id: number;
  price?: string;
  status: number;
  bid_id: number;
  cancelReason?: any;
  seller: Seller;
  attachCompany: AttachCompany[];
  attachNormal: any[];
}

export interface AttachCompany {
  id: number;
  name?: any;
  file: string;
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
  passwordCode: number;
  invitationCode: string;
  crNum: string;
  companyName?: any;
  companyPhone?: any;
  companyRegion?: any;
  token?: any;
}

export interface ActiveBids {
  data: ActiveBidsModel[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface ActiveBidsModel {
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
  attaches: Attach[];
  invitations: Invitation[];
  myOffer?: any;
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