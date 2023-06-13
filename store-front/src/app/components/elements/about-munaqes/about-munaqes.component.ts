import { Component, OnInit } from '@angular/core';
import { SiteInfoModel } from 'src/app/models/siteInfo';
import { ApiHomeService } from 'src/app/services/Home/api-home.service';

@Component({
  selector: 'app-about-munaqes',
  templateUrl: './about-munaqes.component.html',
  styleUrls: ['./about-munaqes.component.scss']
})
export class AboutMunaqesComponent implements OnInit {

  info : SiteInfoModel
  loadding= false;
  constructor(private api :ApiHomeService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(){
    this.loadding = true
    this.api.getSiteInfo().subscribe(res =>{
      this.info = res.data
      // console.log(this.info)
      this.loadding = false;
    })
  }
}
