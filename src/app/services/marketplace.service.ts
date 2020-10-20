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

  getFilteredFundingNeeds(data): Observable<any> {
    return this.http.post(this.API_URL + '/filter/fundingNeeds', {"filterSDGs": data.filterSDGs}, httpOptions).pipe(
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
  //incoming Pending resource request
  viewPendingResourceResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/resourceReq?reqStatus=pending&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  //incoming Accepted resource request
  viewAcceptedResourceResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/resourceReq?reqStatus=accepted&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //incoming Accepted resource request
  viewDeclinedResourceResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/resourceReq?reqStatus=declined&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //incoming Accepted resource request
  viewCancelledResourceResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/resourceReq?reqStatus=cancelled&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //outgoing pending resource request
  viewPendingResourceProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/projectReq?reqStatus=pending&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //outgoing accepted resource request
  viewAcceptedResourceProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/projectReq?reqStatus=accepted&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  //outgoing declined resource request
  viewDeclinedResourceProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/projectReq?reqStatus=declined&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //outgoing cancelled resource request
  viewCancelledResourceProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/resource/detail/projectReq?reqStatus=cancelled&resourceId=' + data.id + "&resType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
  //incoming pending project request
  viewPendingProjectResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/resourceReq?reqStatus=pending&projectId=' + data.id , httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

   //incoming accepted project request
   viewAcceptedProjectResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/resourceReq?reqStatus=accepted&projectId=' + data.id , httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //incoming declined project request
  viewDeclinedProjectResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/resourceReq?reqStatus=declined&projectId=' + data.id , httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //incoming cancelled project request
  viewCancelledProjectResourceRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/resourceReq?reqStatus=cancelled&projectId=' + data.id , httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //outgoing pending project request
  viewPendingProjectProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/projectReq?reqStatus=pending&projectId=' + data.id, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  //outgoing accepted project request
  viewAcceptedProjectProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/projectReq?reqStatus=accepted&projectId=' + data.id, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

   //outgoing declined project request
   viewDeclinedProjectProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/projectReq?reqStatus=declined&projectId=' + data.id, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }
   //outgoing accepted project request
   viewCancelledProjectProjectRequest(data): Observable<any> {
    return this.http.get(this.API_URL + '/project/projectReq?reqStatus=cancelled&projectId=' + data.id, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  acceptProjectRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/accept/projectReq', {"projectReqId": data}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  declineProjectRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/decline/projectReq', {"projectReqId": data}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  completeProjectRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/complete/projectReq', {"projectReqId": data.id, "theRating": data.rating}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  cancelProjectRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/cancel/projectReq', {"projectReqId": data}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  acceptResourceRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/accept/resourceReq', {"resourceReqId": data}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  declineResourceRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/decline/resourceReq', {"resourceReqId": data}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  completeResourceRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/complete/resourceReq', {"resourceReqId": data.id, "theRating": data.rating}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  cancelResourceRequest(data): Observable<any> {
    return this.http.post(this.API_URL + '/cancel/resourceReq' , {"resourceReqId": data}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getResourceSuggestionForResourceNeed(data): Observable<any> {
    return this.http.get(this.API_URL + '/suggestion/resource?needId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getResourceNeedSuggestionForResource(data): Observable<any> {
    return this.http.get(this.API_URL + '/suggestion/resourceneed?resourceId=' + data.id + "&resourceType=" + data.resType, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  discoverWeekly(): Observable<any> {
    return this.http.get(this.API_URL + '/discoverWeekly', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  triggerDiscoverWeekly(): Observable<any> {
    return this.http.post(this.API_URL + '/triggerDiscoverWeekly', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewConsolidatedPendingProjectReq(): Observable<any> {
    return this.http.get(this.API_URL + '/myConsolidatedProjectReq?reqStatus=pending', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewConsolidatedAcceptedProjectReq(): Observable<any> {
    return this.http.get(this.API_URL + '/myConsolidatedProjectReq?reqStatus=accepted', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewConsolidatedDeclinedProjectReq(): Observable<any> {
    return this.http.get(this.API_URL + '/myConsolidatedProjectReq?reqStatus=declined', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewConsolidatedCancelledProjectReq(): Observable<any> {
    return this.http.get(this.API_URL + '/myConsolidatedProjectReq?reqStatus=cancelled', httpOptions).pipe(
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
