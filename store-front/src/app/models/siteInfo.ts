export interface SiteInfoResponce {
  status: number;
  message: string;
  data: SiteInfoModel;
}

export interface SiteInfoModel {
  id: number;
  email: string;
  phone: string;
  imageAbout: string;
  homeVideo: string;
  about: string;
  terms: string;
  privacy: string;
  address: string;
  bidPrice: string;
}