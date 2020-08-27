import { Component } from '@angular/core';
import { FooterMediaService } from '@reporsitires/footer-media.service';


@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss']

})
export class AppFooterComponent {
  facebook: any;
  twitter: any;
  instgram: any;
  youtube: any;

  constructor(
    private footerService: FooterMediaService) {
    this.getFooterMediaData();
  }
  getFooterMediaData() {
    this.footerService.getFooterSettings().subscribe( response => {
      this.facebook = response.data[0].facebook;
      this.twitter = response.data[0].twitter;
      this.instgram = response.data[0].instgram;
      this.youtube = response.data[0].youtube;
      this.footerService.notifyMediaLinksData(response.data[0]);
    });
  }
}
