import { Component, OnInit } from '@angular/core';
import { SiteInfoModel } from 'src/app/models/siteInfo';
import { ApiHomeService } from 'src/app/services/Home/api-home.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  info : SiteInfoModel
  loadding= false;
  constructor(private api :ApiHomeService) { }

  ngOnInit(): void {
    this.getPrivacy()
  }

  getPrivacy(){
    this.loadding = true
    this.api.getSiteInfo().subscribe(res =>{
      this.info = res.data
      this.loadding = false;
    })
  }

}
