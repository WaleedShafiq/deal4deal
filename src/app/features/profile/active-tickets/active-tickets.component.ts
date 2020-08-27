import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Configuration} from "../../../core/configuration";
import {LanguageService} from "../../../shared/services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-active-tickets',
  templateUrl: './active-tickets.component.html',
  styleUrls: ['./active-tickets.component.scss']
})
export class ActiveTicketsComponent implements OnInit {
  allTickets = [];

  hostUrlImages;
  currentLanguage: string;
  constructor(private route: ActivatedRoute, private configuration: Configuration, private languageService: LanguageService, private translateService: TranslateService) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.hostUrlImages = this.configuration.HostUrlImages;
    this.getWishList();
  }

  getWishList() {
    this.route.data.subscribe(response => {
      this.allTickets = response.tickets.data.data;
    });
  }

  getWidth(ticket) {
    const v = ticket.campaign.sold / ticket.campaign.total_num_of_sells;
    return ( v * 100 ) + '%';
  }
}
