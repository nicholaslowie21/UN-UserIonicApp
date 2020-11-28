import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { TermsAndConditionsPage } from 'src/app/terms-and-conditions/terms-and-conditions.page';

@Component({
  selector: 'app-institution-register',
  templateUrl: './institution-register.page.html',
  styleUrls: ['./institution-register.page.scss'],
})
export class InstitutionRegisterPage implements OnInit {
    form: any={};
    name: string;
    username: string; 
    email: string;
    password: string;
    bio: string;
    occupation: string;
    country: string;
    message: string;
    countryData: String[];
    confirmPassword: any;

  resultSuccess: boolean;
  resultError: boolean;
  attachment: any;
  formData: any;
  isChecked: boolean = false;
  modal: any;
  constructor(private  authService:  AuthService, 
    private  router:  Router, 
    private toastCtrl: ToastController,
    private modalController:ModalController) { 
    this.resultSuccess = false;
		this.resultError = false;

  }
          

  ngOnInit() {
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

  selectAttachment(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.attachment = file;
      console.log(this.attachment);
    }
  }

  register(registerForm:NgForm) {
    console.log(this.isChecked);
    if(this.isChecked == true) {
    if (this.attachment == null) {
      var errorMessage = 'Choose a file!';
      this.failureToast(errorMessage);
      return;
    }
    if(this.password == this.confirmPassword){
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("username", this.username);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("country", this.country);
      formData.append("verifyDoc", this.attachment);
      console.log(formData);
      
      this.authService.instituteRegister(formData).subscribe((res) => {
        console.log(res);
        this.resultSuccess = true;
        this.resultError = false;
        registerForm.reset();
        this.successToast();
        this.router.navigateByUrl('/login');
      },
      err => {
        this.resultSuccess = false;
        this.resultError = true;
        this.failureToast(err.error.msg + ": " + err.error.param);
        console.log('********** RegisterNewInstitutionPage.ts: ', err.error.msg);
      });
    } else {
      this.failureToast(Error("Passwords do not match"));
    }

  } else if(this.isChecked == false) {
    this.failureToast("Please accept the Terms & Conditions before registering an account!!");
  }
  }

  back() {
    this.router.navigateByUrl("/login");
  }


  async successToast() {
    let toast = this.toastCtrl.create({
      message: 'Registration successful!',
      duration: 1000,
      position: 'middle',
      cssClass: "toast-pass"      
    });
    (await toast).present();
  }

  async failureToast(error) {
    const toast = this.toastCtrl.create({
      message: 'Registration Unsuccessful: ' + error,
      duration: 1000,
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

