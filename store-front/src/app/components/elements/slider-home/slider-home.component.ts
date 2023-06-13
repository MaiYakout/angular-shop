import { Component, OnInit } from '@angular/core';
import { SlideModel } from 'src/app/models/Slider';
import { ApiHomeService } from 'src/app/services/Home/api-home.service';

declare var $;
@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.scss']
})
export class SliderHomeComponent implements OnInit {

  slider : SlideModel[];
  loadding= false;
  homeIstoken = false
  constructor(private api :ApiHomeService) { }

  productSlide = {
    speed:300,
    slidesToShow:1,
    slidesToScroll:1,
    cssEase:'linear',
    fade:true,
    draggable:true,
  };

  ngOnInit(): void {
    this.getSlider();
    let token = localStorage.getItem('token')
    this.homeIstoken = token !== null ;

  }
getSlider(){
  this.loadding = true;
  this.api.getSlider().subscribe(res =>{
    this.loadding = false
    this.slider = res.data;
    // $('.centers').slick({
    //   dots: true,
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 1,
    //   adaptiveHeight: true,
    //   prevArrow: "<span class='btn-previous'><svg id='Group_1980' data-name='Group 1980' xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'><path id='Path_1362' data-name='Path 1362' d='M25,0A25,25,0,1,1,0,25,25,25,0,0,1,25,0Z' fill='#f7f7f7'/><path id='Path_613' data-name='Path 613' d='M0,0,7.531,7.6,15.369,0' transform='translate(22.104 32.814) rotate(-90)' fill='none' stroke='#1e805d' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/></svg></span>",
    //   nextArrow: "<span class='btn-next'><img src='../../../../assets/images/icons/slider.svg'></span>",
    //   responsive: [
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 1,
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //       }
    //     }
    //   ]
    // });
  })
}

}
