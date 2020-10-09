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

  viewFundingNeeds(): Observable<any> {
    return this.http.get(this.API_URL + '/fundingNeeds', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getManpowerOffer(): Observable<any> {
    return this.http.get(this.API_URL + '/resources/manpower', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  contributeMoney(data): Observable<any> {
    return this.http.post(this.API_URL + '/contributeMoney', {
      "needId": data.needId,
      "desc": data.desc,
      "moneySum": data.moneySum}, httpOptions).pipe(
        tap(res => {
        }, error => this.handleError(error)),
      );
    }
  getItemOffer(): Observable<any> {
    return this.http.get(this.API_URL + '/resources/item', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getVenueOffer(): Observable<any> {
    return this.http.get(this.API_URL + '/resources/venue', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getKnowledgeOffer(): Observable<any> {
    return this.http.get(this.API_URL + '/resources/knowledge', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createNonKnowledgeResReq(data): Observable<any> {
    return this.http.post(this.API_URL + '/requestResource', {
      "needId": data.needId,
      "resourceId": data.resourceId,
      "resType": data.resType,
      "desc": data.desc } , httpOptions).pipe(
        tap(res => {
        }, error => this.handleError(error)),
      );
    }
   

  createAutoNonKnowledgeResReq(data): Observable<any> {
    return this.http.post(this.API_URL + '/auto/requestResource', {
      "resourceId": data.resourceId,
      "projectId": data.projectId,
      "resType": data.resType,
      "desc": data.desc
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createKnowledgeResReq(data): Observable<any> {
    return this.http.post(this.API_URL + '/useKnowledgeResource', {
      "resourceId": data.resourceId,
      "needId": data.needId,
      "desc": data.desc
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createAutoKnowledgeResReq(data): Observable<any> {
    return this.http.post(this.API_URL + '/auto/useKnowledgeResource', {
      "resourceId": data.resourceId,
      "projectId": data.projectId,
      "desc": data.desc
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getAccountProjects(data): Observable<any> {
    return this.http.get(this.API_URL + '/accProjects?accountId=' + data.id + "&accountType=" + data.type, httpOptions).pipe(
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
