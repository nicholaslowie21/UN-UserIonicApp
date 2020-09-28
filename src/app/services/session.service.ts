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
			// return "https://192.168.100.161:8080/api";
			return "https://172.31.60.157:8080/api";
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
			// return "http://192.168.100.161:8081";
			return "http://172.31.60.157:8081";
		}
		else
		{
			return "http://localhost:8081";
		}
	}
}
