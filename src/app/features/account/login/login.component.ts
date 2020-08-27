import { LanguageService } from 'src/app/shared/services/language.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '@reporsitires/account.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UserProfileRepository} from '@reporsitires/userProfileRepository';
import { NotifierService } from 'angular-notifier';
import {WhishlistService} from '@services/whishlist.service';
import {CartService} from '@services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgetPasswordForm: FormGroup;
  closeResult: string;
  language = localStorage.getItem('Lang');
  submitted = false;
  userData;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private userProfileRepository: UserProfileRepository,
    private router: Router,
    private modalService: NgbModal,
    private whishlistService: WhishlistService,
    private cartService: CartService,
    private notifierService: NotifierService,
    private languageService: LanguageService,

    ) {
      this.languageService.language.subscribe(lang => {
        this.language = lang;
      });
    }
  ngOnInit() {
    this.loginForm = this.fb.group({
   email: ['', [Validators.required, Validators.email]],
   password: ['', [Validators.required, Validators.minLength(8)]]
  });
    this.forgetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
   });

 }

 get loginFormControl() {
   return this.loginForm.controls;
}


  onSubmit() {
      this.submitted = true;
      if (this.loginForm.valid) {
        this.accountService.login(this.loginForm.value).subscribe(response => {
          if (response.success) {
            this.userData = response.data;
            if (this.userData.code) {
              localStorage.setItem('code', this.userData.code);
            }
            let level = this.userData.level;
            level.earned_points = this.userData.purchase_points + this.userData.referal_points;
            localStorage.setItem('level', JSON.stringify(level));
            localStorage.setItem('userId', this.userData.id);
            localStorage.setItem('userData', JSON.stringify(this.userData));
            localStorage.setItem('token', this.userData.token);
            if (this.userData.image) {
              localStorage.setItem('image', this.userData.image);
            }
            const userId = JSON.parse(localStorage.getItem('userId'));
            this.submitted = false;
            if (localStorage.getItem('whishlist') != null) {
              const wishlist = JSON.parse(localStorage.getItem('whishlist'));
              const campaign_id: any[] = [];
              const quantity: any[] = [];
              for (const item of wishlist) {
                campaign_id.push(item.campaign_id);
                quantity.push(item.quantity);
              }
              localStorage.removeItem('whishlist');
              this.accountService.addCampaginToWhishlist(userId, quantity, campaign_id).subscribe(respon => {
              });
            }
            if (localStorage.getItem('cart') != null) {
              const carts = JSON.parse(localStorage.getItem('cart'));
              const campaign_id: any[] = [];
              const quantity: any[] = [];
              for (const item of carts) {
                campaign_id.push(item.campaign_id);
                quantity.push(item.quantity);
              }
              localStorage.removeItem('cart');
              this.accountService.addCampaginToCart(userId, quantity, campaign_id).subscribe(respon => {
                if (respon.success && respon['data'][0]['add'] === false) {
                  this.accountService.editCampaginToCart(userId, quantity, campaign_id).subscribe(
                    result => {
                    }
                  );
                }
              });
            }
            // this.whishlistService.changeWhishlistLength('refresh');
            this.whishlistService.changeWhishlistLength(true);

            this.cartService.changeCartLength(false);
            this.closeLogin();
            this.router.navigate(['/profile']);
          } else {
            this.submitted = false;
            this.notifierService.notify('warning', response.message);

          }
        });
      } else {
        this.submitted = false;
      }
  }


  openVerticallyCentered(content) {
    this.closeLogin();
    this.modalService.open(content, { centered: true });
  }
  get forgetPasswordFormControl() {
    return this.forgetPasswordForm.controls;
  }
  submit() {
    if (this.forgetPasswordForm.valid) {
      this.accountService.forgetPassword(this.forgetPasswordForm.value).subscribe(response => {
        if (response.success) {
          if (this.language === 'en') {
          this.notifierService.notify('success', 'Your New Password sent to your Email');
          } else {
            this.notifierService.notify('success', 'تم إرسال كلمة المرور الجديدة إلي بريدك الإلكتروني');
          }
        } else {
          if (this.language === 'en') {
            this.notifierService.notify('warning', response.message);
            } else {
              this.notifierService.notify('warning', 'البريد الإلكتروني غير صحيح');
            }
        }
      });
    }
  }

  closeLogin() {
    this.userProfileRepository.closeLoginFunc(true);
  }
}
