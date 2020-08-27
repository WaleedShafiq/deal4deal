import { Component, OnInit,HostListener } from '@angular/core';
import { Router,UrlTree,PRIMARY_OUTLET, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { PlatformLocation } from '@angular/common';
import { CountriesLookupService } from '../../../shared/repositories/countries-lookup.service';
import { CartsService } from '../../../shared/repositories/carts.service';
import { LanguageService } from '../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { UserProfileRepository } from 'src/app/shared/repositories/userProfileRepository';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-final-shipping',
  templateUrl: './final-shipping.component.html',
  styleUrls: ['./final-shipping.component.scss']
})
export class FinalShippingComponent implements OnInit {
  currentLanguage: any;
  boolean : any = false
  urlTree:UrlTree;
  countryList=[];
    selectedCountry:any;
  selectedCity;
  cityList:any[];
  addressText="";
  countryConfig = {
    displayKey:"name_en", 
    search:true,
    height: '200px' , 
    placeholder:'Select Country', 
    customComparator: ()=>{} ,
    limitTo: 100, 
    moreText: 'more', 
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search', 
    searchOnKey: 'name', 
    clearOnSelection: false 
  }

  cityConfig = {
    displayKey:"name_en", 
    search:true,
    height: '200px' , 
    placeholder:'Select City', 
    customComparator: ()=>{} ,
    limitTo: 100, 
    moreText: 'more', 
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search', 
    searchOnKey: 'name', 
    clearOnSelection: false 
  }
  addressList= [];
  isDonate: string;
  selectedAddressId:any;
  subscription: Subscription
  

  constructor(private service : SharedDataService, private router :Router,private route:ActivatedRoute ,private location: PlatformLocation,
    private cartservice : CartsService, private countriesservice:CountriesLookupService, private languageService: LanguageService,
    private translate: TranslateService,
    private notifierService: NotifierService,
    private userProfileRepository: UserProfileRepository) { }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    setTimeout(() => {
      debugger
      this.service.IsShipping(true);
      console.log(this.service.isShipping)
    }, 10);
  }
  ngOnInit() {
    this.cartservice.ChangeCheckoutProcess('carts-shipping');
    localStorage.setItem('checkout','carts-shipping')
    this.boolean = this.service.isShipping.closed
    this.subscription = this.userProfileRepository.closeLogin.subscribe(
      next => {
        // this.boolean = next
        console.log(this.boolean)
      }
    );
    this.urlTree= this.router.parseUrl(this.router.url);
    this.isDonate= this.urlTree.root.children[PRIMARY_OUTLET].segments[2].path;
    localStorage.setItem('isDonate',this.isDonate);

    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.translate.use(this.currentLanguage);
    if(this.currentLanguage === 'en'){
      this.countryConfig = {
        displayKey:"name_en", 
        search:true,
        height: '200px' , 
        placeholder:'Select Country', 
        customComparator: ()=>{} ,
        limitTo: 100, 
        moreText: 'more', 
        noResultsFound: 'No results found!',
        searchPlaceholder:'Search', 
        searchOnKey: 'name_en', 
        clearOnSelection: false 
      }
    
     this.cityConfig = {
        displayKey:"name_en", 
        search:true,
        height: '200px' , 
        placeholder:'Select City', 
        customComparator: ()=>{} ,
        limitTo: 100, 
        moreText: 'more', 
        noResultsFound: 'No results found!',
        searchPlaceholder:'Search', 
        searchOnKey: 'name_en', 
        clearOnSelection: false 
      }
    }else if (this.currentLanguage === "ar"){
      this.countryConfig = {
        displayKey:"name_ar", 
        search:true,
        height: '200px' , 
        placeholder:'أختر البلد', 
        customComparator: ()=>{} ,
        limitTo: 100, 
        moreText: 'المزيد', 
        noResultsFound: 'لم يعثر علي نتيجه!',
        searchPlaceholder:'بحث', 
        searchOnKey: 'name_ar', 
        clearOnSelection: false 
      }
    
      this.cityConfig = {
        displayKey:"name_ar", 
        search:true,
        height: '200px' , 
        placeholder:'أحتر المدينه', 
        customComparator: ()=>{} ,
        limitTo: 100, 
        moreText: 'المزيد', 
        noResultsFound: 'لم يعثر علي نتيجه!',
        searchPlaceholder:'بحث', 
        searchOnKey: 'name_ar', 
        clearOnSelection: false 
      }
    }
    this.getCountries();
  //  this.getShippingAddress();
  this.route.data.subscribe(response => {
    this.addressList = response.shippingAddress.data;
  });
     this.cityConfig.displayKey= this.countryConfig.displayKey = this.currentLanguage === "en" ? "name_en": "name_ar";
  }
  
  getCountries() {
    this.countriesservice.getCountries(this.currentLanguage).subscribe(res=>{
      this.countryList = res['data']; 
    })
  }
  getShippingAddress(){
    this.cartservice.getClientShippingAddresses().subscribe(res=>{
      this.addressList = res['data'];
    })
  }

  Next(){
    this.service.IsOrdered(true);
    this.router.navigate([`/cart/final-order/${this.isDonate}/${this.selectedAddressId}/${this.addressList.find(c=>c.id == this.selectedAddressId).country.id}`])

  }

  getCountryCities(countryId) {
    this.countriesservice.getCityByCountryId(countryId,this.currentLanguage).subscribe(res=>{
      this.cityList = res['data'];
    })
  }
  onCountrySelected(e){   
    this.getCountryCities(this.selectedCountry.id); 
  }
  
  selectAddress(){
    this.boolean = true; 
  }

  DeleteAddress(addressId){
    this.cartservice.DeleteAddress(addressId).subscribe(res=>{
      if(res['status_code'] == 200){ 
        this.addressList.splice(this.addressList.indexOf(e=>e.id == addressId),1);
        this.notifierService.notify('success','Address removed successfully');
       }
    })
  }

  SubmitNewAddress(){
    let newAddress ={
      client_id: localStorage.getItem('userId'),
      country_id:this.selectedCountry.id,
      city_id:this.selectedCity.id,
      shipping_notes:this.addressText
    }
    for (let i = 0; i < this.addressList.length; i++) {
      const element = this.addressList[i];
      if(element.country_id == newAddress.country_id && element.city_id == newAddress.city_id 
        && element.shipping_notes == newAddress.shipping_notes){
          return this.notifierService.notify('error','This address is exist!')
      }
    }
    this.cartservice.postShippingDetailes(newAddress).subscribe(res=>{
      if(res['status_code'] == 200){
        this.addressList.push(res['data']);
        this.notifierService.notify('success','New address added successfully')
       }
    }
    );
  }

  changeSelectedAddress(addressId){
    this.selectedAddressId = addressId;
  }
  EditAddress(addressId){
    this.router.navigate([`cart/shipping/${addressId}`]);
  }


}
