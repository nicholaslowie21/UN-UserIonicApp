import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  resourceAPI_URL: any;
  userAPI_URL: any;
  institutionAPI_URL: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.resourceAPI_URL = this.sessionService.getRootPath() + '/resource';
    this.userAPI_URL = this.sessionService.getRootPath() + '/resource/user';
    this.institutionAPI_URL = this.sessionService.getRootPath() + '/resource/institution';
   }

  getInstitutionKnowledgeResource(data): Observable<any> {
    return this.http.get(this.institutionAPI_URL + '/knowledge?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getInstitutionItemResource(data): Observable<any> {
    return this.http.get(this.institutionAPI_URL + '/item?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getInstitutionVenueResource(data): Observable<any> {
    return this.http.get(this.institutionAPI_URL + '/venue?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserManpowerResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/manpower?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserKnowledgeResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/knowledge?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserItemResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/item?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserVenueResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/venue?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createItemResource(title: string, desc: string): Observable<any> {
    let createItemReq = {
      "title": title,
      "desc": desc
    }

    return this.http.post(this.resourceAPI_URL + "/createItem", createItemReq, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createVenueResource(title: string, desc: string, address: string): Observable<any> {
    let createVenueReq = {
      "title": title,
      "desc": desc,
      "address": address
    }

    return this.http.post(this.resourceAPI_URL + "/createVenue", createVenueReq, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createManpowerResource(title: string, desc: string): Observable<any> {
    let createManpowerReq = {
      "title": title,
      "desc": desc
    }

    return this.http.post(this.resourceAPI_URL + "/createManpower", createManpowerReq, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createKnowledgeResource(title: string, desc: string): Observable<any> {
    let createKnowledgeReq = {
      "title": title,
      "desc": desc
    }

    return this.http.post(this.resourceAPI_URL + "/createKnowledge", createKnowledgeReq, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  // register(name: string, username: string, email: string, password: string, country: string, gender: string): Observable<any> {
  //   let createUserReq = {
  //     "name": name,
  //     "username": username,
  //     "email": email,
  //     "password": password,
  //     "country": country,
  //     "gender": gender
  //   }
  //   return this.http.post(this.baseUrl + "/authorization/user/signup", createUserReq, httpOptions).pipe(
  //     tap(res => {
  //       this.tokenStorage.saveUser(res.data.user);
  //   }, error => this.handleError(error)),
  //   );
  // }

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
