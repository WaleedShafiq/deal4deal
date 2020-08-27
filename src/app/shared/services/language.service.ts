import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
	public language = new ReplaySubject<any>();

	constructor(
		private translate: TranslateService,
	) {
  }

	ChangeLanguage(lang) {
		localStorage.setItem('Lang', lang);
		this.translate.use(lang);
		let body = document.querySelector('body');
		if (body.classList.contains('body-right')) {
			if (lang === 'en') {
				body.classList.remove('body-right');
			}
		} else {
			if (lang === 'ar') {
				body.classList.toggle('body-right');
			}
		}
    this.language.next(lang);
	}

	PubCurrentLanguage(lang: any) {
		this.ChangeLanguage(lang);
	}

	SubCurrentLanguage(): Observable<any> {
		return this.language.asObservable();
	}

}
