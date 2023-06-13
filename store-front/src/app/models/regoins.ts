export interface RegionsResponce {
  status: number;
  message: string;
  data: RegionsModel[];
}

export interface RegionsModel {
  id: number;
  name: string;
}