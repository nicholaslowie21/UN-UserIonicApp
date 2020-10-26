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
export class ResourceService {
  resourceAPI_URL: any;
  userAPI_URL: any;
  institutionAPI_URL: any;
  privateAPI_URL: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.resourceAPI_URL = this.sessionService.getRootPath() + '/resource';
    this.userAPI_URL = this.sessionService.getRootPath() + '/resource/user';
    this.institutionAPI_URL = this.sessionService.getRootPath() + '/resource/institution';
    this.privateAPI_URL = this.sessionService.getRootPath() + '/resource/private';
   }

  getInstitutionKnowledgeResource(data): Observable<any> {
    return this.http.get(this.institutionAPI_URL + '/knowledge?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getInstitutionPrivateKnowledgeResource(): Observable<any> {
    return this.http.get(this.privateAPI_URL + '/institution/knowledge', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getInstitutionItemResource(data): Observable<any> {
    return this.http.get(this.institutionAPI_URL + '/item?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getInstitutionPrivateItemResource(): Observable<any> {
    return this.http.get(this.privateAPI_URL + '/institution/item', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getInstitutionVenueResource(data): Observable<any> {
    return this.http.get(this.institutionAPI_URL + '/venue?institutionId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getInstitutionPrivateVenueResource(): Observable<any> {
    return this.http.get(this.privateAPI_URL + '/institution/venue', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserManpowerResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/manpower?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserPrivateManpowerResource(): Observable<any> {
    return this.http.get(this.privateAPI_URL + '/user/manpower', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserKnowledgeResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/knowledge?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserPrivateKnowledgeResource(): Observable<any> {
    return this.http.get(this.privateAPI_URL + '/user/knowledge', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserItemResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/item?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserPrivateItemResource(): Observable<any> {
    return this.http.get(this.privateAPI_URL + '/user/item', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserVenueResource(data): Observable<any> {
    return this.http.get(this.userAPI_URL + '/venue?userId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getUserPrivateVenueResource(): Observable<any> {
    return this.http.get(this.privateAPI_URL + '/user/venue', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createItemResource(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/createItem", data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createVenueResource(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/createVenue", data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createManpowerResource(title: string, desc: string): Observable<any> {
    let createManpowerReq = {
      "title": title,
      "desc": desc
    }

    return this.http.post(this.resourceAPI_URL + "/createManpower", createManpowerReq, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  createKnowledgeResource(title: string, desc: string): Observable<any> {
    let createKnowledgeReq = {
      "title": title,
      "desc": desc
    }

    return this.http.post(this.resourceAPI_URL + "/createKnowledge", createKnowledgeReq, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewItemResourceDetail(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/item/details?itemId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewKnowledgeResourceDetail(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/knowledge/details?knowledgeId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewManpowerResourceDetail(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/manpower/details?manpowerId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  viewVenueResourceDetail(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/venue/details?venueId=' + data, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateItem(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/updateItem", {
      "itemId": data.itemId,
      "title": data.title,
      "desc": data.desc,
      "country": data.country
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateVenue(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/updateVenue", {
      "venueId": data.venueId,
      "title": data.title,
      "desc": data.desc,
      "address": data.address,
      "country": data.country
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateManpower(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/updateManpower", {
      "manpowerId": data.manpowerId,
      "title": data.title,
      "desc": data.desc,
      "country": data.country
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateKnowledge(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/updateKnowledge", {
      "knowledgeId": data.knowledgeId,
      "title": data.title,
      "desc": data.desc,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteItem(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/delete/item", {
      "itemId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteManpower(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/delete/manpower", {
      "manpowerId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteKnowledge(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/delete/knowledge", {
      "knowledgeId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteVenue(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + "/delete/venue", {
      "venueId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  activateItem(data) {
    return this.http.post(this.resourceAPI_URL + "/activate/item", {
      "itemId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deactivateItem(data) {
    return this.http.post(this.resourceAPI_URL + "/deactivate/item", {
      "itemId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  activateManpower(data) {
    return this.http.post(this.resourceAPI_URL + "/activate/manpower", {
      "manpowerId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deactivateManpower(data) {
    return this.http.post(this.resourceAPI_URL + "/deactivate/manpower", {
      "manpowerId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  activateKnowledge(data) {
    return this.http.post(this.resourceAPI_URL + "/activate/knowledge", {
      "knowledgeId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deactivateKnowledge(data) {
    return this.http.post(this.resourceAPI_URL + "/deactivate/knowledge", {
      "knowledgeId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  activateVenue(data) {
    return this.http.post(this.resourceAPI_URL + "/activate/venue", {
      "venueId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deactivateVenue(data) {
    return this.http.post(this.resourceAPI_URL + "/deactivate/venue", {
      "venueId": data,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  updateKnowledgeOwner(data) {
    return this.http.post(this.resourceAPI_URL + "/updateKnowledgeOwner", {
      "knowledgeId": data.knowledgeId,
      "owners": data.owner,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  uploadItemPic(data) {
    return this.http.post(this.resourceAPI_URL + "/uploadItemPicture", data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteItemPic(data) {
    return this.http.post(this.resourceAPI_URL + "/deleteItemPicture", {
      "itemId": data.itemId,
      "indexes": data.indexes,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  uploadVenuePic(data) {
    return this.http.post(this.resourceAPI_URL + "/uploadVenuePicture", data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  deleteVenuePic(data) {
    return this.http.post(this.resourceAPI_URL + "/deleteVenuePicture", {
      "venueId": data.venueId,
      "indexes": data.indexes,
    }, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  uploadKnowledgeAttachment(data) {
    return this.http.post(this.resourceAPI_URL + "/uploadKnowledgeAttachment", data).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  addKnowledgeOwner(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + '/addKnowledgeOwner', data, httpOptions).pipe(
      tap(res => {
    }, error => console.log(error)),
    );
  }

  delKnowledgeOwner(data): Observable<any> {
    return this.http.post(this.resourceAPI_URL + '/deleteKnowledgeOwner', data, httpOptions).pipe(
      tap(res => {
    }, error => console.log(error)),
    );
  }

  searchItem(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/search/item?title=' + data, httpOptions).pipe(
      tap(res => {
      }, error => this.handleError(error)),
      );
  }

  searchKnowledge(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/search/knowledge?title=' + data, httpOptions).pipe(
      tap(res => {
      }, error => this.handleError(error)),
      );
  }

  searchManpower(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/search/manpower?title=' + data, httpOptions).pipe(
      tap(res => {
      }, error => this.handleError(error)),
      );
  }

  searchVenue(data): Observable<any> {
    return this.http.get(this.resourceAPI_URL + '/search/venue?title=' + data, httpOptions).pipe(
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
