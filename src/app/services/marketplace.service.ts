import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class MarketplaceService {
  API_URL: string;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService:SessionService, ) {
    this.API_URL = this.sessionService.getRootPath() + '/marketplace';
   }

   getNewsFeed(): Observable<any> {
    return this.http.get(this.API_URL + '/accountNewsFeed', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)));
  }

   getOngoingProjects(): Observable<any> {
    return this.http.get(this.API_URL + '/projects', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getFilteredOngoingProjects(data): Observable<any> {
    return this.http.post(this.API_URL + '/filter/projects', {"filterSDGs": data.filterSDGs}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createProjectRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/requestProject', {
      "needId": data.needId,
      "resourceId": data.resourceId,
      "resType": data.resType,
      "desc": data.desc
    }, httpOptions).pipe(
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
