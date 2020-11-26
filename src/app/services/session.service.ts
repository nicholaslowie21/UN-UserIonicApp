import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  constructor(private platform: Platform)
	{		
  }
  
  getRootPath(): string
	{
		console.log('this.platform.is("hybrid"): ' + this.platform.is('hybrid'));
		
		if(this.platform.is('hybrid'))
		{
			// return "https://192.168.1.122:8080/api";
			return "https://192.168.1.122:8080/api";
		}
		else
		{
			return "/api";
		}
	}

	getRscPath(): string
	{
		console.log('this.platform.is("hybrid"): ' + this.platform.is('hybrid'));
		
		if(this.platform.is('hybrid'))
		{
			// return "http://192.168.1.122:8081";
			return "https://192.168.1.122:8080";
		}
		else
		{
			return "http://localhost:8081";
		}
	}
}
