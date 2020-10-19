import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { TokenStorageService } from './token-storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  API_URL: string;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/mobile';
   }

   chooseInstitution(data): Observable<any> {
    return this.http.post(this.API_URL + '/institutionChoice', {
      "institutionId": data.id
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  removeInstitutionChoice(): Observable<any> {
    return this.http.delete(this.API_URL + '/institutionChoice', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  addContact(data): Observable<any> {
    return this.http.post(this.API_URL + '/addContact', {
      "qrhash": data
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteContact(data): Observable<any> {
    return this.http.post(this.API_URL + '/deleteContact', {
      "cardId": data
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  

  getContactList(): Observable<any> {
    return this.http.get(this.API_URL + '/contactList', httpOptions).pipe(
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
