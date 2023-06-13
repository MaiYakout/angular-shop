export interface AuthResponse {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
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
  token: string;
}

export interface CompanyRegion {
  id: number;
  name: string;
}