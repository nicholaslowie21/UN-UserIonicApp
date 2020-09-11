import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'https://localhost:8080/api/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  updateProfile(data): Observable<any> {
    console.log(data.name);
    return this.http.post(API_URL + '/updateProfile', {
      "name": data.name,
      "email": data.email,
      "occupation": data.occupation,
      "bio": data.bio,
      "country": data.country,
      "website": data.website,
      "gender": data.gender,
      "SDGs": data.sdgs,
      "skills": data.skills
    }, httpOptions).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res);
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
        this.tokenStorage.saveUser(res);
    }, error => this.handleError(error)),
    );
  }

  uploadProfilePicture(data): Observable<any> {
    console.log(data);
    return this.http.post(API_URL + '/uploadProfilePicture', data).pipe(
      tap(res => {
        this.tokenStorage.saveUser(res);
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
