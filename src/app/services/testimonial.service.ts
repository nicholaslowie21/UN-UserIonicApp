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
export class TestimonialService {
  API_URL: string;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService:SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/testimonial';
   }

   getCommonProjects(data): Observable<any> {
    return this.http.get(this.API_URL + '/common/projects?accountId=' + data.accountId + "&accountType=" + data.accountType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  requestTestimonial(data) {
    return this.http.post(this.API_URL + '/request', {"accountId": data.accountId, "accountType": data.accountType, "projectId": data.projectId}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  //outgoing refers to those I am writing for, people request me to write for them.
  getRequestedOutgoingTestimonials(data) {
    return this.http.get(this.API_URL + '/outgoing?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=requested", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getOpenedOutgoingTestimonials(data) {
    return this.http.get(this.API_URL + '/outgoing?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=open", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getDismissedOutgoingTestimonials(data) {
    return this.http.get(this.API_URL + '/outgoing?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=dismissed", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getPendingOutgoingTestimonials(data) {
    return this.http.get(this.API_URL + '/outgoing?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=pending", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getCancelledOutgoingTestimonials(data) {
    return this.http.get(this.API_URL + '/outgoing?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=canceled", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  
  //My testimonials refer to those i requested others to write or other people write for me
  getRequestedMyTestimonials(data) {
    return this.http.get(this.API_URL + '?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=requested", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getOpenedMyTestimonials(data) {
    return this.http.get(this.API_URL + '?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=open", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getDismissedMyTestimonials(data) {
    return this.http.get(this.API_URL + '?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=dismissed", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getPendingMyTestimonials(data) {
    return this.http.get(this.API_URL + '?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=pending", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getCancelledMyTestimonials(data) {
    return this.http.get(this.API_URL + '?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=canceled", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getCloseMyTestimonials(data) {
    return this.http.get(this.API_URL + '?accountId=' + data.accountId + "&accountType=" + data.accountType + "&status=close", httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateMyTestimonialStatus(data) {
    return this.http.post(this.API_URL + '/update/status', {"testimonialId": data.testimonialId, "status": data.status}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateMyOutgoingTestimonialStatus(data) {
    return this.http.post(this.API_URL + "/outgoing/update/status", {"testimonialId": data.testimonialId, "status": data.status, "desc": data.desc}, httpOptions).pipe(
      tap(res => {
        },  error => this.handleError(error))
      );
  }

  writeTestimonialForOthers(data) {
    return this.http.post(this.API_URL + '/write', {"accountId": data.accountId, "accountType": data.accountType, "projectId": data.projectId, "desc": data.desc}, httpOptions).pipe(
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
