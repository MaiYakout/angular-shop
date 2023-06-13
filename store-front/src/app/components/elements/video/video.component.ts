import { Component, OnInit } from '@angular/core';
import { SiteInfoModel } from 'src/app/models/siteInfo';
import { ApiHomeService } from 'src/app/services/Home/api-home.service';
import * as constants from "src/app/Constants";


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  info : SiteInfoModel
  loadding= false;
  constructor(private api :ApiHomeService) { }

  ngOnInit(): void {
    this.getInfo()
    
  }

  getInfo(){
    this.loadding = true
    this.api.getSiteInfo().subscribe(res =>{
      this.loadding=false
      this.info = res.data
      constants.loadJsFile("../../../../assets/js/video.js" , document );
    })
  }

}
