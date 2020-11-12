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

export class CommunicationService {
  API_URL: string;
  CHAT_URL: string;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private sessionService: SessionService) {
    this.API_URL = this.sessionService.getRootPath() + '/communication';
    this.CHAT_URL = this.API_URL + '/chat';
   }

   viewAnnouncements(): Observable<any> {
    return this.http.get(this.API_URL + '/announcement', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  chatWith(data): Observable<any> {
    return this.http.post(this.CHAT_URL + '/chatAccount', {"chatType": "normal", "targetId": data.targetId, "targetType": data.targetType}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  sendChatMessage(data) {
    return this.http.post(this.CHAT_URL + '/send', {"roomId": data.roomId, "message": data.message}, httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getChatRooms(): Observable<any> {
    return this.http.get(this.CHAT_URL + '/rooms?chatType=normal', httpOptions).pipe(
      tap(res => {
    }, error => this.handleError(error)),
    );
  }

  getChatMessages(data): Observable<any> {
    return this.http.get(this.CHAT_URL + '/chats?roomId=' + data, httpOptions).pipe(
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
