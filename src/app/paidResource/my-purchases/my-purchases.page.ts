import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { InstitutionService } from 'src/app/services/institution.service';
import { PaidresourceService } from 'src/app/services/paidresource.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.page.html',
  styleUrls: ['./my-purchases.page.scss'],
})
export class MyPurchasesPage implements OnInit {
  type: string;
  inStatus: string;
  pendingPurchases: any;
  acceptedPurchases: any;
  declinedPurchases: any;
  cancelledPurchases: any;
  noPaidResourceImage: boolean;
  noPendingPaidResourceRequestImage: boolean;
  noAcceptedPaidResourceRequestImage: boolean;
  noDeclinedPaidResourceRequestImage: boolean;
  noCancelledPaidResourceRequestImage: boolean;
  username: string;
  cancelData: {};

  currency: string = 'USD';
  currencyIcon: string = '$';
  paidData: any;
  paidPurchases: any;
  noPaidPaidResourceRequestImage: boolean;

  constructor(private paidService: PaidresourceService,
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService,
    private institutionService: InstitutionService,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private payPal: PayPal,
    private navCtrl:NavController) {
    this.type = "purchases"
    this.inStatus = "pending";
   }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    //init pending
    this.paidService.getMyPurchases("pending").subscribe((res) => {
      this.pendingPurchases = res.data.paidrequests

      if(this.pendingPurchases != undefined) {
        for(var x = 0; x < this.pendingPurchases.length; x++) {
          this.pendingPurchases[x].ownerImg = this.sessionService.getRscPath() + this.pendingPurchases[x].ownerImg +'?random+=' + Math.random();
          if(this.pendingPurchases[x].paidresource.imgPath.length == 0) {
            this.noPendingPaidResourceRequestImage = true;
          } else if (this.pendingPurchases[x].paidresource.imgPath.length != 0) {
            this.noPendingPaidResourceRequestImage = false;
            for(var y = 0; y < this.pendingPurchases[x].paidresource.imgPath.length; y++) {
              this.pendingPurchases[x].paidresource.imgPath[y] = this.sessionService.getRscPath() + this.pendingPurchases[x].paidresource.imgPath[y] +'?random+=' + Math.random();
            }
          }
         
          }
          
        }
    }, (err) => {
      console.log("Pending Purchases error: " + err.error.msg)
    })

    //init accepted
    this.paidService.getMyPurchases("accepted").subscribe((res) => {
      this.acceptedPurchases = res.data.paidrequests

      if(this.acceptedPurchases != undefined) {
        for(var x = 0; x < this.acceptedPurchases.length; x++) {
        this.acceptedPurchases[x].ownerImg = this.sessionService.getRscPath() + this.acceptedPurchases[x].ownerImg +'?random+=' + Math.random();
          if(this.acceptedPurchases[x].paidresource.imgPath.length == 0) {
            this.noAcceptedPaidResourceRequestImage = true;
          } else if (this.acceptedPurchases[x].paidresource.imgPath.length != 0) {
            this.noAcceptedPaidResourceRequestImage = false;
            for(var y = 0; y < this.acceptedPurchases[x].paidresource.imgPath.length; y++) {
              this.acceptedPurchases[x].paidresource.imgPath[y] = this.sessionService.getRscPath() + this.acceptedPurchases[x].paidresource.imgPath[y] +'?random+=' + Math.random();
            }
          }
         
          }
          
        }
    }, (err) => {
      console.log("Accepted Purchases error: " + err.error.msg)
    })

    //init declined
    this.paidService.getMyPurchases("declined").subscribe((res) => {
      this.declinedPurchases = res.data.paidrequests
      if(this.declinedPurchases != undefined) {
        for(var x = 0; x < this.declinedPurchases.length; x++) {
          this.declinedPurchases[x].ownerImg = this.sessionService.getRscPath() + this.declinedPurchases[x].ownerImg +'?random+=' + Math.random();
          if(this.declinedPurchases[x].paidresource.imgPath.length == 0) {
            this.noDeclinedPaidResourceRequestImage = true;
          } else if (this.declinedPurchases[x].paidresource.imgPath.length != 0) {
            this.noDeclinedPaidResourceRequestImage = false;
            for(var y = 0; y < this.declinedPurchases[x].paidresource.imgPath.length; y++) {
              this.declinedPurchases[x].paidresource.imgPath[y] = this.sessionService.getRscPath() + this.declinedPurchases[x].paidresource.imgPath[y] +'?random+=' + Math.random();
            }
          }
         
          }
          
        }
    }, (err) => {
      console.log("Declined Purchases error: " + err.error.msg)
    })

    //init cancelled
    this.paidService.getMyPurchases("cancelled").subscribe((res) => {
      this.cancelledPurchases = res.data.paidrequests
      if(this.cancelledPurchases != undefined) {
          for(var x = 0; x < this.cancelledPurchases.length; x++) {
            this.cancelledPurchases[x].ownerImg = this.sessionService.getRscPath() + this.cancelledPurchases[x].ownerImg +'?random+=' + Math.random();
            if(this.cancelledPurchases[x].paidresource.imgPath.length == 0) {
              this.noCancelledPaidResourceRequestImage = true;
            } else if (this.cancelledPurchases[x].paidresource.imgPath.length != 0) {
              this.noCancelledPaidResourceRequestImage = false;
              for(var y = 0; y < this.cancelledPurchases[x].paidresource.imgPath.length; y++) {
                this.cancelledPurchases[x].paidresource.imgPath[y] = this.sessionService.getRscPath() + this.cancelledPurchases[x].paidresource.imgPath[y] +'?random+=' + Math.random();
              }
            }
           
            }
            
          }
    }, (err) => {
      console.log("Cancelled Purchases error: " + err.error.msg)
    })

    //init paid purchases
    this.paidService.getMyPurchases("paid").subscribe((res) => {
      this.paidPurchases = res.data.paidrequests
      if(this.paidPurchases != undefined) {
          for(var x = 0; x < this.paidPurchases.length; x++) {
            this.paidPurchases[x].ownerImg = this.sessionService.getRscPath() + this.paidPurchases[x].ownerImg +'?random+=' + Math.random();
            if(this.paidPurchases[x].paidresource.imgPath.length == 0) {
              this.noPaidPaidResourceRequestImage = true;
            } else if (this.paidPurchases[x].paidresource.imgPath.length != 0) {
              this.noPaidPaidResourceRequestImage = false;
              for(var y = 0; y < this.paidPurchases[x].paidresource.imgPath.length; y++) {
                this.paidPurchases[x].paidresource.imgPath[y] = this.sessionService.getRscPath() + this.paidPurchases[x].paidresource.imgPath[y] +'?random+=' + Math.random();
              }
            }
           
            }
            
          }
    }, (err) => {
      console.log("Cancelled Purchases error: " + err.error.msg)
    })
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  viewResource(resource) {
    this.router.navigateByUrl("/view-paid-resource-details/" + "paid" + "/" + resource.paidresource.id);
  }

  viewProfile(ev, p) {
    console.log(p);
      this.router.navigate(['/view-others-profile/' + p.ownerUsername + "/" + p.paidresource.ownerType ]) 
  }

  cancelPurchase(request) {
    this.cancelData = {
      "paidRequestId": request.id,
      "status": "cancelled"
    }
    this.paidService.updateBuyerPaidResourceRequestStatus(this.cancelData).subscribe((res) => {
      this.successToast();
      this.initialise();
    }, (err) => {
      this.failureToast(err.error.msg)
      console.log("Cancel Purchase request(Pending to cancelled): " + err.error.msg)
    })
  }

  async presentCancelRequest(event, request)
	{
		const alert = await this.alertController.create({
			header: 'Are you sure you want to cancel this purchase',
			message: 'Confirm cancellation of purchase?',
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
          this.cancelPurchase(request);
			  }
			}
			]
		});

		await alert.present(); 
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Purchase cancelled successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Purchase cancelled Unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  payWithPaypal(paidrequest) {
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
        let payment = new PayPalPayment(paidrequest.paidresource.price, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          if(res.response.state == "approved") {
            this.successmessage(res);
            this.paidData = {
              "paidRequestId": paidrequest.id,
              "status": "paid"
            }
            this.paidService.updateBuyerPaidResourceRequestStatus(this.paidData).subscribe((res) => {
              console.log("backend informed: " + res)
            }, (err) => {
              console.log("Error in update of status(paid): " + err.error.msg)
            })
            this.initialise();
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

  backNav() {
    this.navCtrl.pop();
  }

}
