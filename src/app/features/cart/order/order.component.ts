import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../../shared/repositories/carts.service';
import { LanguageService } from '../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router,UrlTree,PRIMARY_OUTLET, ActivatedRoute } from '@angular/router';
import { CurrencyLookupsService } from '../../../shared/repositories/currency-lookups.service';
import { Configuration } from '../../../core/configuration';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  selectedMethod = 'Credit Card';
  paymentMethods:any;
  urlTree: UrlTree;
  currentLanguage: any;
  currencyText: any;
  donateFactor: number;
  isDonate: any;
  donationValue: any;
  hostUrlImages: any;
  cartItems: any = [];
  addressId: any;

  constructor(private cartService:CartsService, private languageService: LanguageService,
    private translate: TranslateService,private route:ActivatedRoute,private currencyService:CurrencyLookupsService,
    private configuration: Configuration,
    private service : SharedDataService,
    private router :Router   ) { }

  ngOnInit() {
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translate.use(this.currentLanguage);
    this.hostUrlImages = this.configuration.HostUrlImages;
    this.urlTree= this.router.parseUrl(this.router.url);
    this.addressId= this.urlTree.root.children[PRIMARY_OUTLET].segments[2].path;

    this.getCartItems();
    this.cartService.getDonationValue().subscribe(res => {
      this.donationValue = res['data'].donation_value;
      console.log('items',this.cartItems)
    })
    this.donateFactor = this.isDonate?2:1;

    this.currencyService.getCurrencyById(Number(localStorage.getItem('currency'))).subscribe(res=>{
      this.currencyText = this.currentLanguage == 'en'? res['data'].code:res['data'].name_ar;
    });
    this.route.data.subscribe(response => {
      this.paymentMethods = response.PaymentMethods.data;
      this.paymentMethods = this.paymentMethods.filter(x=>x.name_en === 'Credit Card');
      this.selectedMethod = this.paymentMethods[0].id;
 });
  }

  // selectMethod(value) {
  //   this.selectedMethod = value;
  // }

  getTotal() {
    let total = 0;
    this.cartItems.map(item => {
      total += ((item.quantity * (item.campaign.product.price - item.campaign.product.offer))
      + (item.quantity * this.donationValue));
    });
    return total;
  };

  getCartItems() {
    this.cartService.cartItem_asObs.subscribe(res=>{
      this.cartItems = res;
      console.log('items',this.cartItems)
    });

  }
  submitOrder(){
    let data = {
      address_id: Number(this.addressId),
      payment_method_id: Number(this.selectedMethod),
      currency_id: Number(localStorage.getItem('currency')),
      is_donate: Boolean(this.isDonate),
      details: this.cartItems.map(item => ({ campaign_id: item.campaign_id, quantity: item.quantity }))
    }

    this.cartService.submitOrder(data).subscribe(res=>{
      if(res['status_code']==200){
        this.service.IsSuccess(true)
        this.router.navigate(['/cart/success-order']);
      }
    });
  }
}
