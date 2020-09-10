import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'https://localhost:8080/api/institution';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  updateProfile(data): Observable<any> {
    return this.http.post(API_URL + '/updateProfile', {
      "name": data.name,
      "address": data.address,
      "bio": data.bio,
      "country": data.country,
      "website": data.website,
      "phone": data.phone,
      "SDGs": data.sdgs,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  changePassword(data): Observable<any> {
    return this.http.post(API_URL + '/changePassword', {
      "oldpassword": data.oldpassword,
      "newpassword": data.newpassword
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateUsername(data): Observable<any> {
    return this.http.post(API_URL + '/updateUsername', {
      "username": data.username
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateEmail(data): Observable<any> {
    return this.http.post(API_URL + '/updateEmail', {
      "email": data.email
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getMembers(): Observable<any> {
    return this.http.get(API_URL + '/getMembers', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  delMembers(data): Observable<any> {
    return this.http.post(API_URL + '/delMember', {
      "userId": data.userId
    }, httpOptions).pipe(
      tap(res => {
    }, error => console.log(error)),
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

