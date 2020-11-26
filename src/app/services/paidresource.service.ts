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
export class PaidresourceService {
  API_URL: string;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/paidresource';
   }

   createPaidResource(data): Observable<any> {
    return this.http.post(this.API_URL, data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deletePaidResource(data): Observable<any> {
    return this.http.post(this.API_URL + "/status", {
      "paidResourceId": data,
      "status": "deleted"
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  activatePaidResource(data): Observable<any> {
    return this.http.post(this.API_URL + "/status", {
      "paidResourceId": data,
      "status": "active"
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deactivatePaidResource(data): Observable<any> {
    return this.http.post(this.API_URL + "/status", {
      "paidResourceId": data,
      "status": "inactive"
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updatePaidResource(data): Observable<any> {
    return this.http.post(this.API_URL + "/updatePaidResource", {
      "paidResourceId": data.paidResourceId,
      "title": data.title,
      "desc": data.desc,
      "country": data.country,
      "category": data.category,
      "price": data.price
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  uploadPaidResourcePic(data) {
    return this.http.post(this.API_URL + "/uploadPaidResourcePicture", data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deletePaidResourcePic(data) {
    return this.http.post(this.API_URL + "/deletePaidResourcePicture", {
      "paidResourceId": data.paidResourceId,
      "indexes": data.indexes,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewPaidResourceDetail(data): Observable<any> {
    return this.http.get(this.API_URL + '/details?paidResourceId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getAllMyPaidResources(): Observable<any> {
    return this.http.get(this.API_URL + '/all/my', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getAllOthersPaidResources(data): Observable<any> {
    return this.http.get(this.API_URL + '/all/others?accountId=' + data.accountId + "&accountType=" + data.accountType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createPaidResourceRequest(data) {
    return this.http.post(this.API_URL + "/purchase/request", {
      "paidResourceId": data.paidResourceId,
      "projectId": data.projectId,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateBuyerPaidResourceRequestStatus(data) {
    return this.http.post(this.API_URL + "/buyer/purchase/status", {
      "paidRequestId": data.paidRequestId,
      "status": data.status,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }


  //seller status(accepted, declined, cancelled)
  updateSellerPaidResourceRequestStatus(data) {
    return this.http.post(this.API_URL + "/seller/purchase/status", {
      "paidRequestId": data.paidRequestId,
      "status": data.status,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getMyPurchases(data): Observable<any> {
    return this.http.get(this.API_URL + '/my/purchase?status=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //paid res detail page
  getPaidResourceIncomingRequest(data) {
    return this.http.get(this.API_URL + '/seller/requests?status=' + data.status + '&paidResourceId=' + data.paidResourceId, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //get project purchases
  getProjectPurchases(data) {
    return this.http.get(this.API_URL + '/project/purchase?projectId=' + data, httpOptions).pipe(
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
