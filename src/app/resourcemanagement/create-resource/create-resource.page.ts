import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ResourceService } from '../../services/resource.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from  "@angular/router";
import { PaidresourceService } from 'src/app/services/paidresource.service';
import { TermsAndConditionsPage } from 'src/app/terms-and-conditions/terms-and-conditions.page';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.page.html',
  styleUrls: ['./create-resource.page.scss'],
})
export class CreateResourcePage implements OnInit {
  form: FormGroup;
  title: any;
  desc: any;
  address: any;
  type: string;
  country: any;
  attachment: any;
  knowType: any;
  link: any;
  patentNum: any;
  expiry: any;
  issn: any;
  doi: any;
  issueDate: any;
  typeList: String[];
  countryData: any[];
  knowTypeList: String[];
  
  message: string;
  isChosenType: boolean;
  isItemType: boolean;
  isVenueType: boolean;
  isKnowledgeType: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  image1: any;
  images: any;
  file: any;
  isPaidType: boolean;
  category: string | Blob;
  price: any=5;
  checked: boolean;
  isChecked: boolean = false;
  modal: any;
  accountType: any;
  accountBoolean: boolean;

  constructor(private resourceService: ResourceService, 
    private toastCtrl: ToastController, 
    private router: Router, 
    private tokenStorage: TokenStorageService,
    private paidService: PaidresourceService,
    private modalController:ModalController) {
    this.resultSuccess = false;
    this.resultError = false;
    this.isVenueType = false;
    this.isItemType = false;
    this.isKnowledgeType = false;
    this.isChosenType = false;
   }

  ngOnInit() {
    this.knowTypeList = ["patent", "publication", "other"];
    if(this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getUser());
      this.country = this.tokenStorage.getUser().data.user.country;
      this.accountType = this.tokenStorage.getAccountType();
        
      console.log(this.accountType);
      if(this.accountType == "institution") {
        this.accountBoolean = true;
        this.typeList = [ "Item", "Venue", "Knowledge", "Paid"];
      } else if(this.accountType == "user") {
        this.accountBoolean = false;
        this.typeList = [ "Item", "Manpower", "Venue", "Knowledge", "Paid"];
      }
      console.log(this.accountBoolean);
    }


    this.countryData = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
    "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
    "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam",
    "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands",
    "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia",
    "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire",
    "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
    "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana",
    "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
    "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
    "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait",
    "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
    "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles",
    "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands",
    "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn",
    "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon",
    "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic",
    "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Türkiye", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay",
    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)",
    "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
  }

  renderType(type: string) {
    this.isChosenType = true;
    if (type == "Venue") {
      this.isVenueType = true;
      this.isItemType = false;
      this.isKnowledgeType = false;
      this.isPaidType = false;
    } else if(type == "Item") {
      this.isItemType = true;
      this.isVenueType = false;
      this.isKnowledgeType = false;
      this.isPaidType = false;
    } else if (type == "Knowledge") {
      this.isItemType = false;
      this.isVenueType = false;
      this.isKnowledgeType = true;
      this.isPaidType = false;

      this.link = "";
      this.patentNum = "";
      this.issn = "";
      this.doi = "";
      this.expiry = "";
      this.issueDate = "";
    } else if(type == "Paid") {
      this.isItemType = false;
      this.isVenueType = false;
      this.isKnowledgeType = false;
      this.isPaidType = true;
    } else{
      this.isItemType = false;
      this.isVenueType = false;
      this.isKnowledgeType = false;
    }
  }


  createRes(resourceForm:NgForm) {
    console.log(this.isChecked);
    if(this.isChecked == true) {
      const formData = new FormData();
    if (this.type == "Manpower") {
      this.resourceService.createManpowerResource(this.title, this.desc).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Manpower: ', err.error.msg);
      });
    } else if (this.type == "Knowledge") {
      formData.append("title", this.title);
      formData.append("desc", this.desc);
      formData.append("attachment", this.attachment);
      formData.append("knowType", this.knowType);
      formData.append("link", this.link);
      formData.append("patentNum", this.patentNum);
      formData.append("expiry", this.expiry);
      formData.append("issn", this.issn);
      formData.append("doi", this.doi);
      formData.append("issueDate", this.issueDate);


      this.resourceService.createKnowledgeResource(formData).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Knowledge: ', err.error.msg);
      });
    } else if(this.type == "Item"){
     
      formData.append("title", this.title);
      formData.append("desc", this.desc);
      formData.append("country", this.country);
      if(this.images != undefined) {
          for (let i = 0; i < this.images.length; i++) {
            formData.append("itemPics", this.images[i]);
          }
      }

      this.resourceService.createItemResource(formData).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Item: ', err.error.msg);
      });
    } else if(this.type == "Venue") {
      formData.append("title", this.title);
      formData.append("desc", this.desc);
      formData.append("country", this.country);
      formData.append("address", this.address);
      if(this.images != undefined) {
          for (let i = 0; i < this.images.length; i++) {
            formData.append("venuePics", this.images[i]);
          }
      }
      this.resourceService.createVenueResource(formData).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Venue: ', err.error.msg);
      });
    } else if(this.type == "Paid") {
      formData.append("title", this.title);
      formData.append("desc", this.desc);
      formData.append("category", this.category);
      formData.append("country", this.country);
      formData.append("price", this.price);
      
      if(this.images != undefined) {
          for (let i = 0; i < this.images.length; i++) {
            formData.append("paidResourcesPics", this.images[i]);
          }
      }

      this.paidService.createPaidResource(formData).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        resourceForm.reset();
        this.successToast();
        this.router.navigateByUrl('/my-resources');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** CreateResourcePage.ts - Item: ', err.error.msg);
      });
    }
    } else if(this.isChecked == false) {
      this.failureToast("Please accept the Terms & Conditions before creating the resource!!");
    }
    
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      this.images = file;
      console.log(this.images);
    }
  }

  selectAttachment(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.attachment = file;
      console.log(this.attachment);
    }
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Resource is created successfully!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Resource is created unsuccessfully: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }

  async presentModal() {
    this.modal = await this.modalController.create({
    component: TermsAndConditionsPage,
    componentProps: {}
        
    });
    this.modal.onWillDismiss().then((data) => {
       });
      return await this.modal.present();
    }


}
