import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ResourceService } from '../../services/resource.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.page.html',
  styleUrls: ['./create-resource.page.scss'],
})
export class CreateResourcePage implements OnInit {
  form: FormGroup;
  title: string;
  desc: string;
  address: string;
  type: string;
  country: string;
  typeList: String[]
  
  message: string;
  isChosenType: boolean;
  isItemType: boolean;
  isVenueType: boolean;
  resultSuccess: boolean;
  resultError: boolean;

  constructor(private resourceService: ResourceService, private toastCtrl: ToastController, private router: Router, private tokenStorage: TokenStorageService) {
    this.resultSuccess = false;
    this.resultError = false;
    this.isVenueType = false;
    this.isItemType = false;
    this.isChosenType = false;
   }

  ngOnInit() {
    this.typeList = ["Manpower", "Knowledge", "Item", "Venue"];
    if(this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getUser());
      this.country = this.tokenStorage.getUser().data.user.country;
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
    } else if(type == "Item") {
      this.isItemType = true;
      this.isVenueType = false;
    }else {
      this.isItemType = false;
      this.isVenueType = false;
    }
  }

  createRes(resourceForm:NgForm) {
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
      this.resourceService.createKnowledgeResource(this.title, this.desc).subscribe((res) => {
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
      this.resourceService.createItemResource(this.title, this.desc, this.country).subscribe((res) => {
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
      this.resourceService.createVenueResource(this.title, this.desc, this.address, this.country).subscribe((res) => {
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
}
