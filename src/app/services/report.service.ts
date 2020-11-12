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
export class ReportService {
  API_URL: string;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/report';
   }

   createReport(data): Observable<any> {
    return this.http.post(this.API_URL, {
      "title": data.title,
      "summary": data.summary,
      "reportType": data.reportType,
      "targetId": data.targetId
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewPendingReport(): Observable<any> {
    return this.http.get(this.API_URL + '/my/filtered?status=pending', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewProgressReport(): Observable<any> {
    return this.http.get(this.API_URL + '/my/filtered?status=progress', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewSolvedReport(): Observable<any> {
    return this.http.get(this.API_URL + '/my/filtered?status=solved', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewDeclinedReport(): Observable<any> {
    return this.http.get(this.API_URL + '/my/filtered?status=declined', httpOptions).pipe(
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
