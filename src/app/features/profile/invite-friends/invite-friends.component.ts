import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../shared/services/language.service';
declare var $: any;
@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {
  code;
  currentLanguage: string;
  constructor(private notifierService: NotifierService,          private translateService: TranslateService,
              private languageService: LanguageService) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.code = localStorage.getItem('code');
  }


  select() {
    $('#code').select();
    document.execCommand('copy');
    if (this.currentLanguage === 'ar') {
      this.notifierService.notify('success', 'تم نسخ الكود');
    } else {
    this.notifierService.notify('success', 'Code Copied to clipboard');
    }
  }
}
