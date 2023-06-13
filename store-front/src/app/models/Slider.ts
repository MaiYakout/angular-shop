export interface SliderResponce {
  status: number;
  message: string;
  data: SlideModel[];
}

export interface SlideModel {
  id: number;
  image: string;
  text: string;
  btnText: string;
}