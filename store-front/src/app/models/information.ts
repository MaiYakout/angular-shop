export interface infoResponce {
  status: number;
  message: string;
  data: infoModel;
}

export interface infoModel {
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
  companyRegion: CompanyRegion;
  token?: any;
  companyLogo?:any;
  companyProfile?:any;
  webSite?:string
}

export interface CompanyRegion {
  id: number;
  name: string;
}