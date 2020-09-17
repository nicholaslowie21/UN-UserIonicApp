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
export class InstitutionService {
  API_URL: any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/institution';
   }

  updateProfile(data): Observable<any> {
    return this.http.post(this.API_URL + '/updateProfile', {
      "name": data.name,
      "address": data.address,
      "bio": data.bio,
      "country": data.country,
      "website": data.website,
      "phone": data.phone,
      "SDGs": data.sdgs,
    }, httpOptions).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res);
    }, error => this.handleError(error)),
    );
  }

  changePassword(data): Observable<any> {
    return this.http.post(this.API_URL + '/changePassword', {
      "oldpassword": data.oldpassword,
      "newpassword": data.newpassword
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateUsername(data): Observable<any> {
    return this.http.post(this.API_URL + '/updateUsername', {
      "username": data.username
    }, httpOptions).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res);
    }, error => this.handleError(error)),
    );
  }

  updateEmail(data): Observable<any> {
    return this.http.post(this.API_URL + '/updateEmail', {
      "email": data.email
    }, httpOptions).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res);
    }, error => this.handleError(error)),
    );
  }

  getMembers(data): Observable<any> {
    return this.http.get(this.API_URL + '/getMembers?institutionId=' + data , httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  delMembers(data): Observable<any> {
    return this.http.post(this.API_URL + '/delMember', {
      "userId": data.userId
    }, httpOptions).pipe(
      tap(res => {
    }, error => console.log(error)),
    );
  }

  addMember(data): Observable<any> {
    return this.http.post(this.API_URL + '/addMember', {
      "userId": data.userId
    }, httpOptions).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res);
    }, error => console.log(error)),
    );
  }

  uploadProfilePicture(data): Observable<any> {
    console.log(data);
    return this.http.post(this.API_URL + '/uploadProfilePicture', data).pipe(
      tap(res => {
        console.log(res);
        this.tokenStorage.saveUser(res);
    }, error => this.handleError(error)),
    );
  }

  uploadCameraPicture(formData): Observable<any> {
    console.log(formData);
    return this.http.post(this.API_URL + '/uploadProfilePicture', formData).pipe(
      tap(res => {
        console.log(res);
        this.tokenStorage.saveUser(res);
    }, error => this.handleError(error)),
    );
  }

  getCurrentProjects(data): Observable<any> {
    return this.http.get(this.API_URL + '/currProjects?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getPastProjects(data): Observable<any> {
    return this.http.get(this.API_URL + '/pastProjects?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  searchUser(data): Observable<any> {
    return this.http.get(this.API_URL + '/searchUsers?username='  + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  generateShare(): Observable<any> {
    return this.http.get(this.API_URL + '/shareProfile', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getBadges(data): Observable<any> {
    return this.http.get(this.API_URL + '/badges?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
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

