import { NgModule, ErrorHandler, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicStorageModule, Storage } from '@ionic/storage';
import { ActionSheetController, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverController } from '@ionic/angular';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { authInterceptorProviders } from './helper/auth.interceptor';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { QRScanner } from '@ionic-native/qr-scanner/ngx';

/*Supply an array of whitelisted Domains
let system know where we store the token
*/
export function jwtOptionsFactory(storage:Storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['localhost:8080']
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            IonicStorageModule.forRoot(),
            HttpClientModule,
            JwtModule.forRoot({
              jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [Storage],
              }

            }),
            FormsModule,
            ReactiveFormsModule,
          ],
            
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ToastController,
    PopoverController,
    FormControl,
    Camera,
    File,
    FileTransfer,
    FileTransferObject,
    SocialSharing,
    ActionSheetController,
    Downloader,
    ModalController,
    authInterceptorProviders,
    BarcodeScanner,
    // QRScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
