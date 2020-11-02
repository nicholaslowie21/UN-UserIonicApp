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
export class RewardsService {
  API_URL: string;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService:SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/reward';
   }

   getRewardMarketplace(): Observable<any> {
    return this.http.get(this.API_URL + '/marketplace', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getMarketplaceRewardDetails(data): Observable<any> {
    return this.http.get(this.API_URL + '/marketplace/rewardDetail?rewardId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getFilteredMarketplaceReward(data): Observable<any> {
    return this.http.get(this.API_URL + '/filter/tier/marketplace?minTier=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  redeemReward(data) {
    return this.http.post(this.API_URL + '/redeem', {"rewardId": data.id}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getVouchers(): Observable<any> {
    return this.http.get(this.API_URL + '/voucher?status=active', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  

  transferReward(data) {
    return this.http.post(this.API_URL + '/transfer/voucher', {"voucherId": data.voucherId, "targetId": data.targetId}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  claimVoucher(data) {
    return this.http.post(this.API_URL + '/claim/voucher', {"voucherId": data}, httpOptions).pipe(
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
