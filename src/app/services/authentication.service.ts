import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { IonicStorageModule, Storage } from '@ionic/Storage';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { SessionService } from './session.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  private decodedToken;
  //special observable to emit new values to all subscribers
  authenticationState = new BehaviorSubject(false);
  url=environment.url;
  //user = null;
  baseUrl: string;
  protected debug = true;
  

  constructor(private storage: Storage, 
                private http: HttpClient,
                private plt: Platform, 
                private router: Router, 
                private alertController: AlertController,
                private sessionService: SessionService,
                private helper: JwtHelperService,
                private tokenStorage: TokenStorageService
                ) { 
                  this.baseUrl = this.sessionService.getRootPath();
                //check token when ready()
                //Returns a promise when the platform is ready and native functionality can be called.
                this.plt.ready().then(() => {
                    this.checkToken();
                  }); 
  }


    checkToken() {
      this.storage.get(TOKEN_KEY).then(token => {
        
        if (token) {
          let decoded = this.helper.decodeToken(token);
          let isExpired = this.helper.isTokenExpired(token);
   
          if (!isExpired) {
            this.user = decoded;
            this.authenticationState.next(true);
          } else {
            this.storage.remove(TOKEN_KEY);
          }
        }
      });
    }
    login(credentials): Observable<any> {
      var loginReq = {}
      loginReq["usernameOrEmail"] = credentials.usernameOrEmail;
      loginReq["password"] = credentials.password;
      return this.http.post(this.baseUrl + "/authorization/login", loginReq, httpOptions)
        .pipe(
          tap(res => {
              this.tokenStorage.setAccountType(res.data.accountType);
              this.tokenStorage.saveUser(res.data.user);
              this.authenticationState.next(true);
          }, error => this.handleError(error)),
          //catchError(this.handleError)
        ) 
    }

  register(name: string, username: string, email: string, password: string, country: string, salutation: string): Observable<any> {
    let createUserReq = {
      "name": name,
      "username": username,
      "email": email,
      "password": password,
      "country": country,
      "salutation": salutation
    }
    return this.http.post(this.baseUrl + "/authorization/user/signup", createUserReq, httpOptions).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res.data.user);
    }, error => this.handleError(error)),
    );
  }

  instituteRegister(formData): Observable<any> {
    return this.http.post(this.baseUrl + "/authorization/institution/signup", formData).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res.data.user);
    }, error => this.handleError(error)),
    );
  }

  changeUserPassword(data): Observable<any> {
    return this.http.post(this.baseUrl + '/authorization/user/changePassword', {
      "oldpassword": data.oldpassword,
      "newpassword": data.newpassword
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  changeInstitutionPassword(data): Observable<any> {
    return this.http.post(this.baseUrl + '/authorization/institution/changePassword', {
      "oldpassword": data.oldpassword,
      "newpassword": data.newpassword
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  resetPassword(data): Observable<any> {
    return this.http.post(this.baseUrl + '/authorization/reset-password-request', {
      "email": data.email
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  requestVerification(data): Observable<any> {
    return this.http.post(this.baseUrl + '/authorization/user/verifyRequest', data).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res);
        console.log(res.data.user);
    }, error => this.handleError(error)),
    );
  }

  test() {
    return this.http.post(this.baseUrl + "/authorization/testing", {}, httpOptions).pipe(
      catchError(this.handleError)
      )
  }

  getUser() {
    return this.userData.getValue();
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.router.navigateByUrl("/login");
    });
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present);
  }

  private handleError(error: HttpErrorResponse)
	{
		let errorMessage: string = "";
		
		if (error.error instanceof ErrorEvent) 
		{		
			errorMessage = "An unknown error has occurred: " + error.error.message;
		} 
		else 
		{		
			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.message}`;
		}
		
		console.error(errorMessage);
		
		return throwError(errorMessage);		
	}
}
