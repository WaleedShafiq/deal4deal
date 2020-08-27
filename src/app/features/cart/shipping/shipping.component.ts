import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/shared/repositories/carts.service';
import { ActivatedRoute, Router,UrlTree,PRIMARY_OUTLET } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language.service';
import { CountriesLookupService } from '../../../shared/repositories/countries-lookup.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  urlTree:UrlTree;
  currentLanguage;
  countryList=[
    {id:1, name: "Egypt"},
    {id:2, name: "Paris"}
  ];
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
  addressId: string;
  selectedAddress:any;



  constructor(private cartservice : CartsService, private countriesservice:CountriesLookupService, 
    private route: ActivatedRoute, private languageService: LanguageService, private router:Router) { }
  ngOnInit() {
    
    this.currentLanguage = this.languageService['translate'].store.currentLang;
    this.getCountries();
   this.cityConfig.displayKey= this.countryConfig.displayKey = this.currentLanguage === "en" ? "name_en": "name_ar";
   
   this.urlTree= this.router.parseUrl(this.router.url);
   this.addressId= this.urlTree.root.children[PRIMARY_OUTLET].segments[2].path;
   this.route.data.subscribe(response => {
    let addressList = response.shippingAddress.data; 
    this.selectedAddress = addressList.find(e=>e.id == this.addressId);
});
  }


  getCountries() {
    this.countriesservice.getCountries(this.currentLanguage).subscribe(res=>{
      this.countryList = res['data']; 
    })
  }
  getCountryCities(countryId) {
    this.countriesservice.getCityByCountryId(countryId,this.currentLanguage).subscribe(res=>{
      this.cityList = res['data'];
    })
  }
  onCountrySelected(){  
    this.getCountryCities(this.selectedAddress.country.id); 
  }
  
  UpdateAddress(){
    let newAddress ={
      client_id:Number(localStorage.getItem('userId')),
      country_id:this.selectedAddress.country.id,
      city_id:this.selectedAddress.city.id,
      shipping_notes:this.selectedAddress.shipping_notes
    }
    this.cartservice.updateShippingDetailes(newAddress,this.addressId).subscribe(res=>{
      if(res['status_code'] == 200){
        let donate = localStorage.getItem('isDonate');
        this.router.navigate([`cart/final-Shipping/${donate}`]);
      }
    }
    );
  }

}
