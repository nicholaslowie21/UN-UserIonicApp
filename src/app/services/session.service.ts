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
			return "https://192.168.100.55:8080/";
		}
		else
		{
			return "/api";
		}
	}
}
