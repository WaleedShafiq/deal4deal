import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.scss']
})
export class SuccessOrderComponent implements OnInit {
  currentLanguage: any;
  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translate.use(this.currentLanguage);
  }

  goToFinishedOrderPage()
  {
    this.router.navigate(['profile/finished-orders']);

  }

}
