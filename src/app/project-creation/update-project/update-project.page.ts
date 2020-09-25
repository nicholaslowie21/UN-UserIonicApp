import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.page.html',
  styleUrls: ['./update-project.page.scss'],
})
export class UpdateProjectPage implements OnInit {

  resultSuccess: boolean;
  resultError: boolean;
  accountBoolean: boolean;
  isLoggedIn: boolean;

  user: any;
  accountType: any;
  title: any;
  desc: any;
  rating: any;
  sdgs: any;
  sdgsList: any[];
  ratingsList: any[];
  form: any;
  country: any;
  countryData: string[];
  projectToUpdate: any;
  id: any;
  tst: any;
  retrieveProjectError: boolean;

  constructor(private  userService:  UserService, 
    private  router:  Router, 
    private toastCtrl: ToastController, 
    private tokenStorage: TokenStorageService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute) { 
this.resultSuccess = false;
this.resultError = false;
this.retrieveProjectError = false;
//this.user = this.tokenStorage.getUser().data.user
this.accountType = this.tokenStorage.getAccountType();
if(this.accountType == "institution") {
this.accountBoolean = true;
} else {
this.accountBoolean = false;
}

}



ngOnInit() {
  this.initialiseLists();
  this.id = this.activatedRoute.snapshot.paramMap.get('Id');
  this.projectToUpdate = this.projectService.viewProject(this.id).subscribe((res)=> {
    this.projectToUpdate = res.data.targetProject;
  },
  (err) => {
    console.log("******Retrieve Project error");
  });
      this.ratingsList = [1 ,2 ,3 ,4 ,5];
}

update() {
    this.form = {
    "projectId": this.projectToUpdate.id,
    "title": this.projectToUpdate.title,
    "desc": this.projectToUpdate.desc,
    "rating": this.projectToUpdate.rating,
    "country": this.projectToUpdate.country,
    "sdgs": this.projectToUpdate.SDGs,
    }
    this.projectService.updateProject(this.form).subscribe((res) => {
    this.resultSuccess = true;
    this.resultError = false;
    this.successToast();
    this.router.navigate(['/view-project' , this.id]);
    },
    err => {
    this.resultSuccess = false;
    this.resultError = true;
    this.failureToast(err.error.msg);
    console.log('********** UpdateProjects.ts: ', err.error.msg);
    });
} 

back() {
  this.router.navigate(['/view-project', this.id]);
}

async successToast() {
    let toast = this.toastCtrl.create({
    message: 'Update Successful!',
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

initialiseLists() {
      this.sdgsList = [{"id":1, "name": "No Poverty"},{"id":2,"name": "Zero Hunger"}, {"id":3,"name": "Good Health and Well-Being"},
      {"id":4, "name": "Quality Education"}, {"id":5, "name": "Gender Equality"},{"id":6,"name": "Clean Water and Sanitisation"},
      {"id":7, "name": "Affordable and Clean Energy"}, {"id":8, "name": "Decent Work and Economic Growth"},{"id":9, "name": "Industry, Innovation and Infrastructure"},
      {"id":10, "name": "Reduced Inequalities"}, {"id":11, "name": "Sustainable Cities and Communities"}, {"id":12, "name": "Responsible Consumption and Production"},
      {"id":13, "name": "Climate Action"}, {"id":14, "name": "Life Below Water"}, {"id":15, "name": "Life On Land"},
      {"id":16, "name": "Peace, Justice and Strong Institutions"},{"id":17, "name": "Partnerships for the Goals"}];

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


}

