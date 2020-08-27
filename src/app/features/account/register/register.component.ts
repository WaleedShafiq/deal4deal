import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Countries } from '@classes/countries';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';
import { CurrencyService } from '@services/currency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@reporsitires/account.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  credential = {
    first_name: '',
    last_name: '',
    email: '',
    country_id: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    acceptConditions: false,
    invitationCode: ''
  };

  currentCurrency: any;
  currentlanguage: any;
  submitted = false;
  acceptCondition = false;
  countriesList: Countries;
  constructor(
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private accountService: AccountService,
    private router: Router
  ) {
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.currentlanguage = lang;

    }, error => {
    }, () => {
    });
    this.currencyService.currency.subscribe(curr => {
      this.currentCurrency = curr;
      this.getCounrriesData();
    }, error => {
    }, () => {
    });
  }

  ngOnInit() {
  }
  getCounrriesData() {
    this.route.data.subscribe(response => {
      this.countriesList = response.countries.data;
    });
  }

  // changeAcceptConditionCheckBox() {
  //   this.acceptCondition = !this.acceptCondition;
  // }
  verifyNumber() {
    if (this.credential.phone_number === '') {
      if (this.currentlanguage === 'ar') {
        this.notifierService.notify('warning', 'يجب إدخال رقم الموبايل');
      } else {
        this.notifierService.notify('warning', 'Mobile number is empty');
      }

    } else {
      if (this.currentlanguage === 'ar') {
        this.notifierService.notify('warning', 'تم إرسال كود إلي رقم الموبايل بنجاح');
      } else {
        this.notifierService.notify('success', 'Anew verification code has been sent to your mobile number');
      }

    }
  }
  Save(frm: any) {
    this.submitted = true;
    if (frm.valid && this.credential.acceptConditions) {
      const copyCredential = Object.assign({}, this.credential);
      delete copyCredential.acceptConditions;
      this.accountService.register(copyCredential).subscribe(response => {
        if (response.success) {
          this.submitted = false;
          if (this.currentlanguage === 'ar') {
            this.notifierService.notify('success', 'تم تسجيل مستخدم جديد بنجاح');
          } else {
            this.notifierService.notify('success', 'User has been registered successfully');
          }
          this.router.navigateByUrl('/campaign');
        } else {
          this.submitted = false;
          this.notifierService.notify('warning', response.message);
        }
      }, error => {
          this.submitted = false;
          this.notifierService.notify('warning', error.message);
      }
      );
    } else {
      this.submitted = false;
      if (this.currentlanguage === 'ar') {
      this.notifierService.notify('warning', 'بعض البيانات غير مكتملة');
      } else {
        this.notifierService.notify('warning', 'Some data are missing or incorrect');
      }
    }

  }

}
