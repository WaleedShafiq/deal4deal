import { CampaginService } from '@reporsitires/campagin.service';
import { Component, OnInit } from '@angular/core';
import { Campagin } from '@classes/campagin';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '@services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';
import { CurrencyService } from '@services/currency.service';
import { NgbModalOptions, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WhishlistService } from '@services/whishlist.service';
import { NotifierService } from 'angular-notifier';
import { CurrencyLookupsService } from '@reporsitires/currency-lookups.service';
import { Configuration } from '../../core/configuration';


@Component({
  selector: 'app-campagin-details',
  templateUrl: './campagin-details.component.html',
  styleUrls: ['./campagin-details.component.scss']
})
export class CampaginDetailsComponent implements OnInit {
  campaginDetails: Campagin;
  submitted = false;
  campaginQuantityInCart = 0;
  currentCurrency: any;
  currentlanguage: any;
  IsWhished = false;
  routerUrl: string;
    // share button
    urlShare: string;
    closeResult: string;
    modalOptions: NgbModalOptions;
    // share button
    currencyName: any;
    currentCurrencyId: any;
    campaginDetailsId: any;
    baseURL: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private modalService: NgbModal,
    private whishlistService: WhishlistService,
    private notifierService: NotifierService,
    private currencyLookupsService: CurrencyLookupsService,
    private campaginService: CampaginService,
    private configurationService: Configuration




  ) {
    this.baseURL = this.configurationService.HostUrlImages;
    const lang: any = languageService['translate'].store.currentLang;
    this.translate.use(lang);
    this.languageService.language.subscribe(lang => {
      this.translate.use(lang);
      this.currentlanguage = lang;
      this.currencyService.currency.subscribe(curr => {
        this.currentCurrency = curr;
        this.getCampaginDetailsData();
        this.currencyLookupsService.getCurrencyById(this.currentCurrency).subscribe(response => {
          if (response.success) {
            this.currencyName = response.data["code"];
            this.currentCurrencyId = response.data["id"];
            this.campaginDetailsId = this.route.snapshot.paramMap.get('id');
            this.campaginService.getCampaginById(this.campaginDetailsId, this.currentlanguage, this.currentCurrencyId).subscribe( res => {
              this.campaginDetails = res.data;
            //  console.log(this.campaginDetails);
            });
          }
        });
      }, error => {
      }, () => {
      });
    }, error => {
    }, () => {
    });
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true
    };
    this.routerUrl = router.url;
  }

  ngOnInit() {
    this.cartService.addToCartObservable.subscribe(res => {
       setTimeout(() => {
         this.submitted = false;
       });
       if ( res['res']) {
        this.cartService.changeCartLength(true);
      }
    });

    this.whishlistService.addToWishListObservable.subscribe(res => {
      if ( res['res']) {
        this.IsWhished = true;
        this.whishlistService.changeWhishlistLength(true);
      }
    });

  }

   getCampaginDetailsData() {
    this.route.data.subscribe(response => {
      if (response.compaginDetails.success) {
        this.campaginDetails = response.compaginDetails.data;
        this.getQuantityOfCampaginInInput(this.campaginDetails);
      } else {
        this.router.navigate(['campaign']);
      }
    });
  }


  getQuantityOfCampaginInInput(campagin: Campagin) {
    this.campaginQuantityInCart = this.cartService.getQuantityOfCampaginInCart(campagin);
  }
  decreaseCampaginQuantity() {
    if (this.campaginQuantityInCart > 0 ) {
      this.campaginQuantityInCart -= 1;
    } else {
      this.campaginQuantityInCart = 0;
    }
  }
  increaseCampaginQuantity() {
    this.campaginQuantityInCart += 1;
  }

  addCampaginToCart(campagin: Campagin) {
    this.submitted = true;
    console.log(campagin);
    console.log(this.campaginQuantityInCart);
    if (this.campaginQuantityInCart > 0) {
      this.cartService.addCampaginToCart(campagin, this.campaginQuantityInCart);
      // this.cartService.changeCartLength();
    } else {
      console.log(this.currentlanguage);
      if (this.currentlanguage === 'ar') {
        this.notifierService.notify('warning', 'يجب ان تكون الكمية اكبر من صفر');
        this.submitted = false;
      } else {
        this.notifierService.notify('warning', 'Quantity must be greather than 0');
        this.submitted = false;

      }
    }
  }

  addCampaginTowhishlist(campagin: Campagin) {
    this.whishlistService.addCampaginToWhishlist(campagin);
  }


  // share button //
open(content, campagin: Campagin) {
  if (campagin.status === 'sold out') {
    return;
  } else {
  this.urlShare = `https://deal4deal.app/deal1/#/details/` + `${campagin.id}`;
  this.modalService.open(content,  this.modalOptions).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  }
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
// share button //

// removeCampaginTowhishlist(campagin: Campagin) {
//   this.whishlistService.removeCampaginFromWhishlist(campagin);
//   this.whishlistService.changeWhishlistLength();
//   this.IsWhished = false;
// }
}
