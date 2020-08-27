import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LanguageService} from "../../../shared/services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  wishList;
  currentLanguage: string;
  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
   this.getWishList();
  }

  getWishList() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.route.data.subscribe(response => {
      this.wishList = response.wishListResolver.data;
    });
  }
}
