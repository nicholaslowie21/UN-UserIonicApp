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

  deleteProject(data): Observable<any> {
    return this.http.post(this.API_URL + '/deleteProject',{
      "projectId": data
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createKpi(data, projectId): Observable<any> {
    return this.http.post(this.API_URL + '/createKPI', {
      "projectId": projectId,
      "title": data.title,
      "desc": data.desc
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateKpi(data): Observable<any> {
    return this.http.post(this.API_URL + '/updateKPI', {
      "kpiId": data.kpiId,
      "title": data.title,
      "desc": data.desc,
      "completion":data.completion
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }


  getKpi(data): Observable<any> {
    return this.http.get(this.API_URL + '/projectKPI?projectId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteKpi(data): Observable<any> {
    return this.http.post(this.API_URL + '/deleteKPI',{
      "kpiId": data
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getAdmins(data): Observable<any> {
    return this.http.get(this.API_URL + '/projectAdmins?projectId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  uploadProjectPicture(data): Observable<any> {
    return this.http.post(this.API_URL + '/uploadProjectPicture', data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  searchUser(data): Observable<any> {
    return this.http.get(this.API_URL + '/searchUsers?username='  + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  completeProject(data): Observable<any> {
    return this.http.post(this.API_URL + '/completeProject', {
      "projectId": data
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  addAdmin(data, projectId): Observable<any> {
    return this.http.post(this.API_URL + '/addAdmin', {
      "projectId": projectId,
      "userId": data.userId
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteAdmin(data, projectId): Observable<any> {
    return this.http.post(this.API_URL + '/deleteAdmin', {
      "projectId": projectId,
      "userId": data.userId
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createResourceNeed(data, projectId): Observable<any> {
    return this.http.post(this.API_URL + '/createResourceNeed', {
      "projectId": projectId,
      "title": data.title,
      "desc": data.desc,
      "resourceType": data.resourceType
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createMoneyResourceNeed(data, projectId): Observable<any> {
    return this.http.post(this.API_URL + '/createResourceNeed', {
      "projectId": projectId,
      "title": data.title,
      "desc": data.desc,
      "resourceType": data.resourceType,
      "total": data.total
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateResourceNeed(data): Observable<any> {
    return this.http.post(this.API_URL + '/editResourceNeed', {
      "needId": data.needId,
      "title": data.title,
      "desc": data.desc,
      "total": data.total,
      "completion": data.completion
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateMoneyResourceNeed(data): Observable<any> {
    return this.http.post(this.API_URL + '/editResourceNeed', {
      "needId": data.needId,
      "title": data.title,
      "desc": data.desc,
      "total": data.total,
      "pendingSum": data.pendingSum,
      "receivedSum": data.receivedSum,
      "completion": data.completion
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }


  getResourceNeeds(data): Observable<any> {
    return this.http.get(this.API_URL + '/resourceNeeds?projectId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteResourceNeed(data): Observable<any> {
    return this.http.post(this.API_URL + '/deleteResourceNeed',{
      "needId": data
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getResourceContributions(data): Observable<any> {
    return this.http.get(this.API_URL + '/contributions?projectId=' + data, httpOptions).pipe(
      tap(res => {

    }, error => this.handleError(error)));
  }

  getNewsFeed(): Observable<any> {
    return this.http.get(this.API_URL + '/accountNewsFeed', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)));
  }


  removeResourceContribution(data): Observable<any> {
    return this.http.post(this.API_URL + '/removeContribution', {"contributionId":data}, httpOptions).pipe(
      tap(res => {

    }, error => this.handleError(error)));
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
