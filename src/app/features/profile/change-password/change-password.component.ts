import { Component, OnInit } from '@angular/core';
import {Validation} from '../../../shared/validation';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserProfileRepository} from '../../../shared/repositories/userProfileRepository';
import {LanguageService} from "../../../shared/services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends  Validation implements OnInit {
  submitted = false;
  subscription: Subscription;
  asyncErrorMessage;
  asyncSuccessMessage;
  currentLanguage;
  constructor(
    protected router: Router,
    protected formBuilder: FormBuilder,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private userProfileRepository: UserProfileRepository,
  ) {
    super(formBuilder, router);
  }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.form = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', Validators.required]
    }, {validator: [this.confirmPassword, this.checkSamePass]});
  }

  confirmPassword(formGroup: FormGroup): any {
    const rePassword = formGroup.controls.passwordConfirmation;
    const password = formGroup.controls.password;
    if ((password.value !== rePassword.value) && (rePassword.touched || rePassword.dirty)) {
      return rePassword.setErrors({matchFailed: true});
    } else {
      return null;
    }
  }

  checkSamePass(formGroup: FormGroup): any {
    const currentPassword = formGroup.controls.currentPassword;
    const newPassword = formGroup.controls.password;
    if ((currentPassword.value === newPassword.value) && (newPassword.touched || newPassword.dirty)) {
      return newPassword.setErrors({sameCurrentPass: true});
    } else {
      return null;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.asyncErrorMessage = this.asyncSuccessMessage = null;
    const data = {
      old_password: this.form.value.currentPassword,
      new_password: this.form.value.password,
      confirm_new_password: this.form.value.passwordConfirmation,
    };
    this.subscription = this.userProfileRepository.changePassword(data).subscribe(
      res => {
        if (res['status_code'] == 200) {
          this.submitted = false;
          this.asyncSuccessMessage = res['message'];
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 5000);
        } else {
          this.asyncErrorMessage = res['message'];
        }
      }, error => {
        this.submitted = false;
        this.asyncErrorMessage = this.humanizeHttpError(error);
      }, () => {

      }
    );
  }

}
