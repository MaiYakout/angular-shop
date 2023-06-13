export interface ReasonsResponce {
  status: number;
  message: string;
  data: ReasonsModel[];
}

export interface ReasonsModel {
  id: number;
  type: number;
  name: string;
}