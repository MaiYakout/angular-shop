export interface BidOfferResponce {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  data: BidOfferModel[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface BidOfferModel {
  id: number;
  isMyOffer: boolean;
  price: string;
  status: number;
  bid_id: number;
  cratedAt: string;
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
  webSite?: any;
  companyLogo: string;
  companyRegion?: any;
  token?: any;
}