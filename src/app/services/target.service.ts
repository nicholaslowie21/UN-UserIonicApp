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
export class TargetService {
  API_URL: string;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService:SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/target';
   }

   getPossibleTargets(data) {
    return this.http.post(this.API_URL + '/possible/targets', {"SDGs": data.SDGs}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateAccountTargets(data) {
    return this.http.post(this.API_URL + '/account/targets', data.targetIds, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getAccountTargets(data): Observable<any> {
    return this.http.get(this.API_URL + '/account/targets?accountId=' + data.id + "&accountType=" + data.accountType, httpOptions).pipe(
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
