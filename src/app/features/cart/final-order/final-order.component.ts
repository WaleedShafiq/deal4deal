import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../../shared/repositories/carts.service';
import { LanguageService } from '../../../shared/services/language.service';
import { Router,UrlTree,PRIMARY_OUTLET, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { CurrencyLookupsService } from '../../../shared/repositories/currency-lookups.service';
import { Configuration } from '../../../core/configuration';
import {NotifierService} from "angular-notifier";
import { UserProfileRepository } from '../../../shared/repositories/userProfileRepository';

@Component({
  selector: 'app-final-order',
  templateUrl: './final-order.component.html',
  styleUrls: ['./final-order.component.scss']
})
export class FinalOrderComponent implements OnInit {
  currentLanguage: string;
  paymentMethods: any;
  urlTree: UrlTree;
  isDonate: any;
  addressId: any;
  selectedPaymentMethodName;
  selectedPaymentMethodId: any;
  cartItems: any = [];
  donateFactor: number;
  donationValue: any;
  taxesValue=0;
  totalTaxes =0;
  countryId: string;
  shippingValue: any;
  currencyText: any;
  hostUrlImages: any;
  selectedMethod;
   dream_point = {
    "id": 1,
    "name_en": "Dream Point",
    "name_ar": "النقط",
    "is_used": null,
    "mobile_icon": "../../../../assets/img/shipping.svg",
    "created_at": null,
    "updated_at": null,
    "deleted_at": null,
    "name": "Point",
    "is_used_text": null,

  }

  userData
  campPoint =0;
  user_point =0;
  orderpoint : any;
  constructor(private cartService:CartsService,private router :Router, private route:ActivatedRoute,
    private languageService: LanguageService,
    private translate: TranslateService,
    private configuration: Configuration,
    private service : SharedDataService,
  private notifierService: NotifierService,
  private currencyService:CurrencyLookupsService
  ,private userProfileRepository: UserProfileRepository) { }

  ngOnInit() {
    this.service.IsOrdered(true);
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translate.use(this.currentLanguage);
    this.urlTree= this.router.parseUrl(this.router.url);
    this.isDonate= this.urlTree.root.children[PRIMARY_OUTLET].segments[2].path;
    this.addressId= this.urlTree.root.children[PRIMARY_OUTLET].segments[3].path;
    this.countryId= this.urlTree.root.children[PRIMARY_OUTLET].segments[4].path;
    this.donateFactor = this.isDonate?2:1;

    this.cartService.ChangeCheckoutProcess('carts-shipping-order');
    localStorage.setItem('checkout','carts-shipping-order');

    this.cartService.cartItem_asObs.subscribe(res=>{
      this.cartItems = res;
      console.log(res);
      this.cartItems.map(item => {
        debugger;
        this.campPoint += (item.quantity * item.campaign.product.points);
      console.log(this.campPoint)
      });
    })

    this.currentLanguage = this.languageService['translate'].store.currentLang;

    this.hostUrlImages = this.configuration.HostUrlImages;

    this.route.data.subscribe(response => {
         this.paymentMethods = response.PaymentMethods.data;
         this.paymentMethods.push(this.dream_point)
         console.log("this.paymentMethods", this.paymentMethods)
    });

    this.cartService.getDonationValue().subscribe(res => {
      this.donationValue = res['data'].donation_value;
    })
    this.cartService.GetShippingValue(Number(this.countryId)).subscribe(res => {
       this.shippingValue = res['data'].value;
    })

    this.cartService.GetTaxes().subscribe(res => {
      this.taxesValue = res['data'][0].tax_value;
    })

    this.currencyService.getCurrencyById(Number(localStorage.getItem('currency'))).subscribe(res=>{
      this.currencyText = this.currentLanguage == 'en'? res['data'].code:res['data'].name_ar;
    })


    this.userProfileRepository.getUserInfo().subscribe(res => {
     debugger;
      console.log('userData1', res);
      this.user_point = res['data'].total_points;
    })
  }

  selectMethodChange(selectedId, name) {
    this.selectedPaymentMethodName =name;
    this.selectedPaymentMethodId = selectedId;
  }


  submitOrder(){
    debugger;
    let ispoints = 'No';
    if (this.selectedPaymentMethodName == 'Point') {
      if (this.user_point > this.campPoint)
        ispoints = 'Yes';
      else{
        this.notifierService.notify('warning',"Your point is no sufficient");
        return;
      }
    }

    let data = {
      address_id: Number(this.addressId),
      payment_method_id: Number(this.selectedPaymentMethodId),
      currency_id: Number(localStorage.getItem('currency')),
      is_donate: Boolean(this.isDonate),
      details: this.cartItems.map(item => ({ campaign_id: item.campaign_id, quantity: item.quantity })),
      by_points: ispoints
    }

    this.cartService.submitOrder(data).subscribe(res=>{
      if(res['status_code']==200){
        this.service.IsSuccess(true)
        this.router.navigate(['/cart/success-order']);
      }
    });
  }



  getPrice(value): number {
    return  Number(Math.round(value).toFixed(3));
   }


   getTotal() {
    let total = 0;

    this.cartItems.map(item => {
      total += ((item.quantity * (item.campaign.product.price - item.campaign.product.offer))
      + (item.quantity * this.donationValue));
    });
    return total;
  }

  getTaxes(){
    let total = 0;
    this.cartItems.map(item => {
      total += (item.quantity * ((this.taxesValue * item.campaign.product.price) / 100));
    });
    return total;
  }
}
