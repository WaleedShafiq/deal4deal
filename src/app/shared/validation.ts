import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

export class Validation {
  form: FormGroup;
  asyncErrorMsg: string; // async error message from api
  laddaLoader: boolean; // ladda loading button indicator

  constructor(protected formBuilder: FormBuilder, protected router: Router) {
    this.asyncErrorMsg = '';
    this.laddaLoader = false;
  }

  validateGroup(controlName: string) {
    return {
      'has-danger': this.form.get(controlName).invalid &&
      (this.form.get(controlName).touched || this.form.get(controlName).dirty),
      'has-success': this.form.get(controlName).valid &&
      (this.form.get(controlName).touched || this.form.get(controlName).dirty)
    };
  }

  validateControl(controlName: string) {
    return this.form.get(controlName).invalid &&
      (this.form.get(controlName).touched || this.form.get(controlName).dirty);
  }

  validateError(controlName: string, error: string) {
    return this.form.get(controlName).errors[error];
  }

  humanizeHttpError(error: HttpErrorResponse) {
    switch (error.status) {
        case 0:
            return 'Something went wrong, Please check your internet connection.';
        case 400:
            return error.error.errString;
        case 500:
          return 'Server error: ' + error.statusText;
        default:
          return 'An error has occured: ' + error.statusText;
      }
}
}
