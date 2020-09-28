import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// import { fromPromise } from "rxjs/observable/fromPromise";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Platform, AlertController } from '@ionic/angular';
import { File } from "@ionic-native/file";
// import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SessionService } from './session.service';
import { TokenStorageService } from './token-storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  API_URL: string;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService, private transfer: FileTransfer, private file: File) {
    this.API_URL = this.sessionService.getRootPath() + '/project';
   }
}
