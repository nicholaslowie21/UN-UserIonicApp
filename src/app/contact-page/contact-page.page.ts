import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { SessionService } from '../services/session.service';
import { Router } from  "@angular/router";
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.page.html',
  styleUrls: ['./contact-page.page.scss'],
})
export class ContactPagePage implements OnInit {
  currentUser: any;
  accountType: any;
  userId: any;

  scannedData: any;
  // encodedData: '';
  encodeData: any;
  inputData: any;
  
  constructor(private tokenStorage: TokenStorageService, private sessionService: SessionService, private router: Router, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
    this.accountType = this.tokenStorage.getAccountType();
    this.inputData = this.currentUser.data.user.id + ";" + this.accountType;
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
      console.log(this.scannedData);
      console.log(this.scannedData["text"]);

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
}
