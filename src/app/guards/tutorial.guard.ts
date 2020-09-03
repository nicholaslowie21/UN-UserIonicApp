import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/Storage';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor(private storage:Storage, private router: Router){

  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
      var isComplete = await this.storage.get('tutorialComplete');//determine if the user has completed the tutorial
      if(!isComplete) {
        this.router.navigateByUrl('/intro');
        isComplete = true;
      } 
      console.log(isComplete);
      return isComplete;
  }
  
}
