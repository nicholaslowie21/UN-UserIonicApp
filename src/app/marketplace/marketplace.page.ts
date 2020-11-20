import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CreateMoneyRequestPage } from 'src/app/funding/create-money-request/create-money-request.page';
import { InstitutionService } from 'src/app/services/institution.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {

  fundingNeedsList: any;
  fundingNeeds: any;
  sdgFilterBoolean: boolean;
  sdgs: any;
  sdgsList: { id: number; }[];
  accountBoolean: boolean;
  accountType: any;
  user: any;
  modal: HTMLIonModalElement;
  needId: any;

  //paypal
  paymentAmount: string = '1.00';
  currency: string = 'USD';
  currencyIcon: string = '$';

  constructor(private marketplaceService: MarketplaceService, 
    private sessionService: SessionService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private institutionService: InstitutionService,
    private modalController: ModalController,
    private payPal: PayPal,
    private alertController: AlertController) {
    this.accountType = this.tokenStorage.getAccountType();
    this.user = this.tokenStorage.getUser();
    if(this.accountType == "institution") {
      this.accountBoolean = true;
    } else {
      this.accountBoolean = false;
    }
    this.initialise();
    this.initializeLists();
   }

  ngOnInit() {
    this.sdgsList = [{"id":1},{"id":2}, {"id":3},
    {"id":4}, {"id":5},{"id":6},
    {"id":7}, {"id":8},{"id":9},
    {"id":10}, {"id":11}, {"id":12},
    {"id":13}, {"id":14}, {"id":15},
    {"id":16},{"id":17}]
    this.initialise();
    this.initializeLists();
  }

  ionViewDidEnter() {
    this.initialise();
    this.initializeLists();
  }

  ionModalDidDismiss() {
    console.log("help");
    this.initialise();
    this.initializeLists();
  }

  initialise() {
    this.marketplaceService.viewFundingNeeds().subscribe((res) => {
      this.fundingNeeds = res.data.fundings;
      console.log(this.fundingNeeds);
      if(this.fundingNeeds != undefined) {
        for(var i = 0; i < this.fundingNeeds.length; i ++) {
          this.fundingNeeds[i].imgPath = this.sessionService.getRscPath() + this.fundingNeeds[i].imgPath +'?random+=' + Math.random();
          this.fundingNeeds[i].ownerImg = this.sessionService.getRscPath() + this.fundingNeeds[i].ownerImg + '?random+=' + Math.random();

        }
      }
    }, (err) => {
      console.log("******************View Funding needs(Retrieve funding needs error: " + err.error.msg);
    })
  }

  reset() {
    this.sdgs = null;
    this.initializeLists();
  }

  initializeLists() {
    this.fundingNeedsList = this.fundingNeeds;
  }

  viewFounderProfile(ev, h) {
    var username = "";

    if(h.owner == this.user.data.user.id) {
      console.log("work");
      this.router.navigateByUrl("/tabs/profile");
    } else {
      
      if(h.ownerType == "institution") {
          this.institutionService.viewInstitutionById(h.owner).subscribe((res) => {
            username = res.data.targetInstitution.username
            this.router.navigate(['/view-others-profile/' + username + "/" + h.ownerType ])
          }, (err) => {
            console.log("View Founder Profile error: " + err.error.msg);
          })
      } else if(h.ownerType == "user") {
        this.userService.viewUserById(h.owner).subscribe((res) => {
          username = res.data.targetUser.username
          this.router.navigate(['/view-others-profile/' + username + "/" + h.ownerType ])
        }, (err) => {
          console.log("View Founder Profile error: " + err.error.msg);
        })
      }
      
    }
  }
  
   async filterFundingsNeedsList(evt) {
    if(this.sdgFilterBoolean != true) {
      this.initializeLists();
      this.reset();
    }
    this.sdgFilterBoolean = false;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.fundingNeedsList = this.fundingNeedsList.filter(fundingneed => {
      if (fundingneed.title && searchTerm) {
        return (fundingneed.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (fundingneed.ownerName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) 
        || (fundingneed.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  filterSDGS(sdgs) {
    /*this.sdgFilterBoolean = true;
    this.data = {
      "filterSDGs": sdgs
    }
    this.marketplaceService.getFilteredOngoingProjects(this.data).subscribe((res) => {
      this.filterList = res.data.projects;
    }, (err) => {
      console.log("****************View Marketplace Projects(filterSDGs).page.ts error: " + err.error.msg);
    })*/
  }

  async contribute(resource) {
    this.modal = await this.modalController.create({
      component: CreateMoneyRequestPage,
      componentProps: {"resource": resource, "needId": resource.needId}
      
    });
    this.modal.onWillDismiss().then((data) => {
      console.log("i ranned");
      this.initialise();
      this.initializeLists();
  });
    return await this.modal.present();
  }

  viewProject(ev, p) {
    this.router.navigate(['/view-market-project-details/' + p.id]);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  calculateProgress(total,received) {
    if(received == 0) {
      return 0;
    }
    return parseFloat((received*100/total).toFixed(2));
  }


  payWithPaypal() {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'ATYIGhVI_8iXzrGnY_2ppcz1AJR8mpQp6IxHxdWXRVXwbcVFamkz-6qjBiYSOHidvvRjvxwkir2jvIka'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          if(res.response.state == "approved") {
            this.successmessage(res);
          } else {
            this.failuremessage(res);
          }
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  async successmessage(res)
	{
		const alert = await this.alertController.create({
			header: 'Your Payment is Successful!',
			message: 'Transaction Id: ' + res.response.id + "\n" + "Status: " + res.response.state + "\n" + this.formatTDate(res.response.create_time),
			buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  cssClass: 'secondary',
			  handler: (blah) => {
				
			  }
			}, {
			  text: 'Okay',
			  handler: () => {
			  }
			}
			]
		});

		await alert.present(); 
  }

  async failuremessage(res)
	{
		const alert = await this.alertController.create({
			header: 'Your Payment has failed!',
			message: 'Transaction Id: ' + res.response.id + "\nStatus: " + res.response.state + "\n" + this.formatTDate(res.response.create_time),
			buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  cssClass: 'secondary',
			  handler: (blah) => {
				
			  }
			}, {
			  text: 'Okay',
			  handler: () => {
			  }
			}
			]
		});

		await alert.present(); 
  }


  formatTDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate;
  }
}
