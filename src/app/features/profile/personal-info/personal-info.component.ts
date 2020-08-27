import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Configuration} from '../../../core/configuration';
import {LanguageService} from '../../../shared/services/language.service';
import {UserProfileRepository} from '../../../shared/repositories/userProfileRepository';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {Validation} from '../../../shared/validation';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent extends  Validation implements OnInit {
  nameEdit = false;
  emailEdit = false;
  locationEdit = false;
  phoneEdit = false;
  passwordEdit = false;
  userImage;
  defaultImage = '../../../../assets/img/mancy.jpg';
  imageFiles;
  acceptedAvatarFileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/svg'
  ];
  uploadError;
  userData;
  hostUrlImages;
  currentLanguage;
  userLevel;
  subscription: Subscription;
  asyncSuccessMessage;
  asyncErrorMessage;
  submitted = false;
  userPassword;
  defaultUserImage = 'assets/img/defaultImageUser.png';
  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private configuration: Configuration,
    private languageService: LanguageService,
    private iformBuilder: FormBuilder,
    private translateService: TranslateService,
    private userProfileRepository: UserProfileRepository,
  ) {
    super(iformBuilder, router);
  }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translateService.use(this.currentLanguage);
    this.hostUrlImages = this.configuration.HostUrlImages;
    this.getUserData();
  }

  getUserData() {
    this.route.data.subscribe(response => {
      this.userData = response.userData.data;
      this.userData.user_name = `${this.userData.first_name} ${this.userData.last_name}`;
      this.userLevel = this.currentLanguage === 'en'  ? this.userData.level.name_en : this.userData.level.name_ar;
      if (this.userData.image) {
       this.userImage = this.hostUrlImages + this.userData.image;
     }
    });
  }

  uploadImage(event) {
    this.uploadError = null;

    if (event.target.files[0]) {
     let check = false;
     for (let type of this.acceptedAvatarFileTypes) {
       if (event.target.files[0].type === type) {
         event.preventDefault();

         this.imageFiles = event.target.files[0];
         const reader = new FileReader();
         const myComponent = this;
         reader.addEventListener('load', () => {
           myComponent.userImage = reader.result;
           // myComponent.userImage.image = this.userImage;
         }, false);
         reader.readAsDataURL(this.imageFiles);
         check = true;
       }
     }
     if (!check) {
       this.uploadError = 'Image type must be jpg, png, svg, jpeg or gif';
     }
   }
  }

  submit() {
    this.submitted = true;
    var first_name, last_name = '';
    this.userData.user_name.split(' ').map((name, index) => {
      if (index === 0) {
        first_name = name;
      } else {
        last_name = last_name.concat(` ${name}`);
      }
    });
    const data = {
      email: this.userData.email,
      first_name,
      last_name,
      country_id: this.userData.country_id,
      id: this.userData.id,
    };
    if (this.userImage) {
      data['image'] = this.userImage.split(',')[1];
    }
    this.subscription = this.userProfileRepository.updateUserInfo(data).subscribe(
      res => {
        this.userData = res['data'];
        this.userData.user_name = `${this.userData.first_name} ${this.userData.last_name}`;
        if (res['status_code'] == 200) {
          this.asyncSuccessMessage = res['message'];
          localStorage.clear();
          this.submitted = false;
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 5000);
        } else {
        }
      }, error => {
        this.submitted = false;
        this.asyncErrorMessage = this.humanizeHttpError(error);
      }, () => {
      }
    );
  }

}
