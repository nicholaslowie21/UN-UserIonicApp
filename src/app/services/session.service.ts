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
<<<<<<< HEAD
			return "https://192.168.43.215:8080/api";
=======
			// return "https://192.168.86.250:8080/api";
			return "https://172.31.61.217:8080/api";
>>>>>>> c4ee8a101cb3b9b5cbe186f80322817458cb8162
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
<<<<<<< HEAD
			return "http://192.168.43.215:8081";
=======
			// return "http://192.168.86.250:8081";
			return "https://172.31.61.217:8081";
>>>>>>> c4ee8a101cb3b9b5cbe186f80322817458cb8162
		}
		else
		{
			return "http://localhost:8081";
		}
	}
}
