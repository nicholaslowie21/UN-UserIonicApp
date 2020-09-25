import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { SessionService } from '../../services/session.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from  "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.page.html',
  styleUrls: ['./edit-resource.page.scss'],
})
export class EditResourcePage implements OnInit {
  updateForm: any;
  resourceId: any;
  resourceType: any;
  currResource: any;
  title: any;
  desc: any;
  country: any;
  address: any;

  countryData: any[];
  resultSuccess: boolean;
  resultError: boolean;

  constructor(private resourceService: ResourceService, private sessionService: SessionService, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private toastCtrl: ToastController) {
    this.resultSuccess = false;
    this.resultError = false;
   }

  ngOnInit() {
    this.resourceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.resourceType = this.activatedRoute.snapshot.paramMap.get('type');
    console.log(this.resourceType + " " + this.resourceId);

    if(this.resourceType == "manpower") {
      this.currResource = this.resourceService.viewManpowerResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.manpower;
        //Can call the other JSON parts if needed, like owner details

        // To check w BG, bcs not all of them hv image Path...
        // this.manpowerResource[i].imgPath = this.sessionService.getRscPath() + this.manpowerResource[i].imgPath  +'?random+=' + Math.random();
      }), err => {
        console.log('********** EditResource.ts - Manpower: ', err.error.msg);
      };
    } else if (this.resourceType == "knowledge") {
      this.currResource = this.resourceService.viewKnowledgeResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.knowledge;
      }), err => {
        console.log('********** EditResource.ts - Knowledge: ', err.error.msg);
      };
    } else if (this.resourceType == "item") {
      this.currResource = this.resourceService.viewItemResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.item;
      }), err => {
        console.log('********** EditResource.ts - Item: ', err.error.msg);
      };
    } else if (this.resourceType == "venue") {
      this.currResource = this.resourceService.viewVenueResourceDetail(this.resourceId).subscribe((res) => {
        this.currResource = res.data.venue;
      }), (err) => {
        console.log('********** EditResource.ts - Venue: ', err.error.msg);
      };
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

  update() {
    if (this.resourceType == "manpower") {
      this.updateForm= {
        "manpowerId": this.resourceId,
        "title": this.currResource.title,
        "desc": this.currResource.desc,
        "country": this.currResource.country,
      }
      
      this.resourceService.updateManpower(this.updateForm).subscribe((res) => {
        this.resultSuccess = true;
        this.resultError = false;
        this.successToast();
        this.back();
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** EditResource.ts - Manpower: ', err.error.msg);
      });
    } else if (this.resourceType == "knowledge") {
      console.log ("I am posting knowledge" + this.resourceId);
      this.updateForm= {
        "knowledgeId": this.resourceId,
        "title": this.currResource.title,
        "desc": this.currResource.desc,
      }
      
      this.resourceService.updateKnowledge(this.updateForm).subscribe((res) => {
        this.resultSuccess = true;
        this.resultError = false;
        this.successToast();
        this.back();
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** EditResource.ts - Knowledge: ', err.error.msg);
      });
    } else if (this.resourceType == "item") {
      console.log ("I am posting item" + this.resourceId);
      this.updateForm= {
        "itemId": this.resourceId,
        "title": this.currResource.title,
        "desc": this.currResource.desc,
        "country": this.currResource.country
      }
      
      this.resourceService.updateItem(this.updateForm).subscribe((res) => {
        this.resultSuccess = true;
        this.resultError = false;
        this.successToast();
        this.back();
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** EditResource.ts - Knowledge: ', err.error.msg);
      });
    } else if (this.resourceType == "venue") {
      this.updateForm= {
        "venueId": this.resourceId,
        "title": this.currResource.title,
        "desc": this.currResource.desc,
        "address": this.currResource.address,
        "country": this.currResource.country
      }
      
      this.resourceService.updateVenue(this.updateForm).subscribe((res) => {
        this.resultSuccess = true;
        this.resultError = false;
        this.successToast();
        this.back();
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg);
        console.log('********** EditResource.ts - Knowledge: ', err.error.msg);
      });
    }
  }

  back() {
    this.router.navigateByUrl("/view-resource/" + this.resourceType + "/" + this.resourceId);
  }

  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Update successful!',
      duration: 2000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Update Unsuccessful: ' + error,
      duration: 2000,
      position: 'middle',
      cssClass: "toast-fail"
    });
    (await toast).present();
  }
}
