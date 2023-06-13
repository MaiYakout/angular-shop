export interface ActiveBidResponce {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  data: ActiveBidModel[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface ActiveBidModel {
  id: number;
  isMain: boolean;
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
  cancelReason?: any;
  differentDateTime: string;
  attaches: AttachActive[];
  invitations: Invitation[];
  myOffer?: any;
}

export interface Invitation {
  id: number;
  key: string;
  type: number;
}

export interface AttachActive {
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