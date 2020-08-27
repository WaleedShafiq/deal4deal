import { FooterMediaService } from 'src/app/shared/repositories/footer-media.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-donating',
  templateUrl: './faqs-donating.component.html',
  styleUrls: ['./faqs-donating.component.scss']
})
export class FaqsDonatingComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'donateQuestion1', answer: 'donateAnswer1'},
    {toggle: false, question: 'donateQuestion2', answer: 'donateAnswer2', links: true}
  ];


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
    });
  }

  ngOnInit() {
  }
}
