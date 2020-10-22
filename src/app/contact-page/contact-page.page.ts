import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { SessionService } from '../services/session.service';
import { Router } from  "@angular/router";
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { InstitutionService } from '../services/institution.service';
import { MobileService } from '../services/mobile.service';
import { UserService} from '../services/user.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.page.html',
  styleUrls: ['./contact-page.page.scss'],
})
export class ContactPagePage implements OnInit {
  currentUser: any;
  accountType: any;
  userId: any;
  card: any;
  cards: any[];
  haveCardBoolean: boolean;
  institutionChoice: any;
  institutionChoiceName: any;

  scannedData: any;
  encodeData: any;
  inputData: any;
  institutions: any;
  institutionsList: any;
  
  constructor(private alertController: AlertController, private toastCtrl: ToastController, private userService: UserService, private institutionService: InstitutionService, private tokenStorage: TokenStorageService, private sessionService: SessionService, private mobileService: MobileService, private router: Router, private barcodeScanner: BarcodeScanner) {
    this.haveCardBoolean = false;

    // this.cards = []; 
    // this.data = {
    //   "institution": "Ashoka or super long title",
    //   "name": "John Doe",
    //   "occupation": "Software Developer",
    //   "email": "john@gmail.com",
    //   "website": "www.ashoka.com",
    //   "country": "America",
    //   "address": "American Way New Jersey",
    //   "SDGs": [1, 3, 4],
    //   "profilePic": "",
    // }

    // this.cards.push(this.data);
   }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
    this.accountType = this.tokenStorage.getAccountType();
    this.inputData = this.currentUser.data.user.id + ";" + this.accountType;

    this.initialise();
    this.institutionChoice = this.currentUser.data.user.institutionChoice;
    console.log(this.institutionChoice != "");
    if(this.institutionChoice != "") {
    this.institutionService.viewInstitutionById(this.currentUser.data.user.institutionChoice).subscribe((res)=> {
      this.institutionChoiceName = res.data.targetInstitution.name;
      
      console.log(this.institutionChoice)
    }, (err) => {
      console.log("institution choice error: " + err.error.msg);
    })
  }

    this.institutions = this.currentUser.data.user.institutionIds;
    if(this.institutions != undefined) {
      this.institutionsList = [];
      for(var i = 0; i < this.institutions.length; i++) {
        this.institutionService.viewInstitutionById(this.institutions[i]).subscribe((res)=> {
          var x = res.data.targetInstitution;
          x.ionicImg = this.sessionService.getRscPath() + res.data.targetInstitution.ionicImg +'?random+=' + Math.random();
          this.institutionsList.push(x);
          
        }, (err) => {
          console.log("********Institution retrieval error: " + err.error.msg)
        })
      }
    }
    console.log(this.institutionsList);

  }

  ionViewDidEnter() {
    this.userService.viewUserById(this.currentUser.data.user.id).subscribe((res)=> {
      this.institutionChoice = res.data.targetUser.institutionChoice;
      if(this.institutionChoice != "") {
      this.institutionService.viewInstitutionById(this.institutionChoice).subscribe((res)=> {
        this.institutionChoiceName = res.data.targetInstitution.name;
      }, (err) => {
        console.log("********Institution retrieval error: " + err.error.msg)
      })
    }
      console.log(res.data.targetUser);
    }, (err) => {
      console.log("error retrieving user: " + err.error.msg)
    })

    this.initialise();
  }

  initialise() {
    this.cards=[];
    this.mobileService.getContactList().subscribe((res) => {
      console.log(res);
      this.card = res.data.cards;
      
      if (this.card.length > 0) {
        this.haveCardBoolean = true;

        for(var i = 0; i < this.card.length; i++) {
          console.log(this.card[i])
          if(this.card[i].institutionImg != "") {
          this.card[i].institutionImg = this.sessionService.getRscPath() + this.card[i].institutionImg;
          } 

          if(this.card[i].accountImg !="") {
            this.card[i].accountImg = this.sessionService.getRscPath() + this.card[i].accountImg;
          }
        }

        this.cards = this.card.sort(function (a, b) {
          return a.accountName.localeCompare(b.accountName);
        });
      } else {
        this.haveCardBoolean = false;
      }
    }, (err) => {
      console.log("********Contact Page.ts - error: " + err.error.msg)
    })
  }

  scanQR() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a QR Code inside the scan area',
      resultDisplayDuration: 500,
      formats: 'QR_CODE,PDF_417',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;
      this.addContact(this.scannedData["text"]);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  createQR() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
      console.log(encodedData);
      this.encodeData = encodedData;
    }, (err) => {
      console.log('Error occurred : ' + err);
    });
  }

  addContact(qrhash) {
    this.mobileService.addContact(qrhash).subscribe((res) => {
      console.log(qrhash);
      this.successAddToast();
      this.initialise();
    }, err => {
      this.failureAddToast(err);
      console.log("********Contact Page.ts (Add Contact) - error: " + err.error.msg)
    })
  }

  chooseInstitution() {
    this.router.navigateByUrl("/change-card-institution")
  }

  viewProfile(accUsername, accType) {
    this.router.navigateByUrl("/view-others-profile/" + accUsername + "/" + accType);
  }

  async delete(event, id) {
    console.log(id);
    const alert = await this.alertController.create({
			header: 'Delete Mobile Contact',
			message: 'Confirm delete Mobile Contact?',
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

            this.mobileService.deleteContact(id).subscribe(
              response => {
                this.successToast();
              },
              error => {
                this.failureToast(error);
                console.log("********Institution retrieval error: " + error)
              }
            );

			}}]
		});

		await alert.present(); 
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Deletion successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Deletion Unsuccessful: ' + error.error.msg,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async successAddToast() {
    let toast = this.toastCtrl.create({
      message: 'Mobile Contact Added successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureAddToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Mobile Contact Added Unsuccessfully: ' + error.error.msg,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
