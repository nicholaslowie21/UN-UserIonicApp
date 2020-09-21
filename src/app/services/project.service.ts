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

export class ProjectService {
  API_URL: string;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/project';
   }

  createProject(data): Observable<any> {
    return this.http.post(this.API_URL + '/createProject', {
      "title": data.title,
      "desc": data.desc,
      "rating": data.rating,
      "SDGs": data.sdgs,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateProject(data): Observable<any> {
    return this.http.post(this.API_URL + '/updateProject', {
      "projectId": data.projectId,
      "title": data.title,
      "desc": data.desc,
      "country": data.country,
      "rating": data.rating,
      "SDGs": data.sdgs,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  
  viewProject(data): Observable<any> {
    return this.http.get(this.API_URL + '/viewProject?projectId=' + data, httpOptions).pipe(
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
