import { NotifierService } from 'angular-notifier';
import { LanguageService } from '@services/language.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '@reporsitires/contact.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  ContactFormPage: FormGroup;
  submitted = false;
  currentlanguage: any;
  image = 'assets/img/help/help.png';
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private fb: FormBuilder,
    private contactService: ContactService,
    private notifierService: NotifierService,

  ) {
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.currentlanguage = lang;
      this.translate.use(lang);
    }, error => {
    }, () => {
    });
  }


  ngOnInit() {
    this.ContactFormPage = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.ContactFormPage.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.ContactFormPage.valid) {
    this.contactService.contact(this.ContactFormPage.value).subscribe(response => {
      if (response.success) {
        this.submitted = false;
        this.ContactFormPage.reset();
        if (this.currentlanguage === 'ar') {
          this.notifierService.notify('success', 'تم إرسال الرسالة بنجاح');
        } else {
          this.notifierService.notify('success', 'Message Send Successfully');
        }
      }
  });
}
  }
}

