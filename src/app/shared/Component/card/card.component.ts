import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campagin } from '@classes/campagin';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CartService } from '@services/cart.service';
import { NotifierService } from 'angular-notifier';
import { WhishlistService } from '@services/whishlist.service';
import { LanguageService } from '@services/language.service';
import { CurrencyService } from '@services/currency.service';
import { Currency } from '@classes/currency';
import { Configuration } from '@core/configuration';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit {

  @Input() campagin: Campagin;
  @Input() currencyName: any;
  @Output() whishlistRemoved = new EventEmitter();
  @Output() whishlistRemovedLogin = new EventEmitter();

  submitAddedToCartButton = false;
  successAdded = false;
  submitted = false;
  IsWhished = false;
  routerUrl: string;
  currentCurrency: any;
  currency: Currency;
  currentlanguage: any;
  urlShare: string;
  closeResult: string;
  modalOptions: NgbModalOptions;
  existInWhished = [];
  baseURL: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cartService: CartService,
    private notifierService: NotifierService,
    private whishlistService: WhishlistService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private configurationService: Configuration
  ) {
    this.baseURL = this.configurationService.HostUrlImages;
    this.languageService.language.subscribe(lang => {
      this.currentlanguage = lang;
      this.currencyService.currency.subscribe(curr => {
        this.currentCurrency = curr;
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
    // this.currency.code = 'hassan';
  }

  selectedCampaignIdCart;
  selectedCampaignIdWishList;
  ngOnInit() {
    this.existInWhished = JSON.parse(localStorage.getItem('whishlist'));
    this.cartService.addToCartObservable.subscribe(res => {
      if ( res['res']) {
        this.selectedCampaignIdCart = res['campaignId'];
        this.submitted = false;
        this.successAdded = true;
        this.cartService.changeCartLength(false);
      } else {
        this.submitAddedToCartButton = false;
        this.submitted = false;
      }
    });

    this.whishlistService.addToWishListObservable.subscribe(res => {
      if ( res['res']) {
        this.selectedCampaignIdWishList = res['campaignId'];
        this.IsWhished = true;
        this.whishlistService.changeWhishlistLength(false);
      }
    });

  }


  open(content, campagin: Campagin) {
    if (campagin.status === 'sold out') {
      return;
    } else {
      this.urlShare = `https://deal4deal.app/deal1/#/details/` + `${campagin.id}`;
      this.modalService.open(content, this.modalOptions).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  navigateToCampaginDetailsPage(campaginDetailsId: number) {
    this.router.navigate(['details', campaginDetailsId]);
  }

  addCampaginToCart(campagin: Campagin) {
    this.submitted = true;
    this.submitAddedToCartButton = true;
    this.cartService.addCampaginToCart(campagin);
    this.submitted = false;
  }

  addCampaginTowhishlist(campagin: Campagin) {
    this.whishlistService.addCampaginToWhishlist(campagin);
  }

  removeCampaginTowhishlist(campagin: Campagin) {
    if (localStorage.getItem('userId') != null) {
     this.whishlistService.removeUserCampaginFromWhishlist(campagin.wishlist_id).subscribe(response => {
      if (response.success) {

        // window.location.reload();
        if (this.currentlanguage === 'ar') {
          this.notifierService.notify('success', 'تم الحذف بنجاح');
        } else {
        this.notifierService.notify('success', 'Campagin removed successfully from whishlist');
        }
        this.whishlistService.changeWhishlistLength(true);
        this.whishlistRemovedLogin.emit();
        this.whishlistService.removeItemFromWishlist(campagin.id);
      }
    }, error => {

    });
    } else {
      this.whishlistService.removeCampaginFromWhishlist(campagin);
      this.IsWhished = false;
      // window.location.reload();
      this.whishlistRemoved.emit();
      this.whishlistService.changeWhishlistLength(false);
      if (this.currentlanguage === 'ar') {
        this.notifierService.notify('success', 'تم الحذف بنجاح');
      } else {
      this.notifierService.notify('success', 'Campagin Removed Successfully');
      }
    }
  }
}
