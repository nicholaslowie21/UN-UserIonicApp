import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Router } from '@angular/router';
import { NavController, Platform} from '@ionic/angular';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slidesPerView : number = 1;
  constructor(public navCtrl: NavController, private router: Router, private storage: Storage, public platform: Platform) { }

  ngOnInit() {
  }
  
  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/tabs');
  }

  next() {
    this.finish();
    this.router.navigateByUrl('/tabs');
  }

}
