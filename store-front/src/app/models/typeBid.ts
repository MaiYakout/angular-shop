export interface TypeResponce {
  status: number;
  message: string;
  data: typeBidModel[];
}

export interface typeBidModel {
  id: number;
  name: string;
}