import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Configuration} from '../../core/configuration';
import {LanguageService} from '../../shared/services/language.service';
import {UserProfileRepository} from '../../shared/repositories/userProfileRepository';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import { WhishlistService } from '@services/whishlist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  finishedOrders = false;
  userData;
  hostUrlImages;
  currentLanguage;
  userLevel;
  defaultUserImage = 'assets/img/defaultImageUser.png';
  constructor(
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private router: Router,
    private configuration: Configuration,
    private service: UserProfileRepository,
    private translate: TranslateService,
    private languageService: LanguageService,
    private whishlistService: WhishlistService
  ) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translate.use(this.currentLanguage);
    this.hostUrlImages = this.configuration.HostUrlImages;
    this.getUserData();
  }

  getUserData() {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.route.data.subscribe(response => {
      this.userData = response.userData.data || data;
      if (this.userData.code) {
        localStorage.setItem('code', this.userData.code);
      }
      this.userLevel = this.currentLanguage === 'en'  ? this.userData.level.name_en : this.userData.level.name_ar;
      let level = this.userData.level;
      level.earned_points = this.userData.purchase_points + this.userData.referal_points;
      localStorage.setItem('level', JSON.stringify(level));
    });
  }

  setData() {
    let data = {
      purchase_points: this.userData.purchase_points,
      total_points: this.userData.total_points,
      total_spent: this.userData.total_spent,
      referal_points: this.userData.referal_points,
      point_percentage: this.userData.point_percentage,
    };
    localStorage.setItem('points', JSON.stringify(data));
    this.router.navigate(['/profile/dream-points']);
  }

  logOut() {
    this.service.logOutApi().subscribe(
      res => {
        if (res['status_code'] === 200) {
          this.notifierService.notify('success', res['message']);
          localStorage.clear();
          // setTimeout(() => {
          this.router.navigate(['/login']);
         
         // this.whishlistService.sendResult(false, -2);
          // this.whishlistService.whishlist.subscribe( whihlistLength => {
          //     this

          // });
          // });
        } else {
        }
      }, error => {
      }, () => {
      }
    );
  }
}
