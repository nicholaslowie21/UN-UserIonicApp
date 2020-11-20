import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular'
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private activeTab?: HTMLElement;
  gotNotifs: boolean = false;
  constructor(private commService: CommunicationService) {}

  ngOnInit() {
    this.commService.gotNewNotifs().subscribe((res) => {
      this.gotNotifs = res.data.gotNew;
    }, (err) => {
      console.log("View Notifications Error: " + err.error.msg);
    })
  }

  tabChange(tabsRef: IonTabs) {
    this.activeTab = (tabsRef.outlet as any).activatedView.element;
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }
  
  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }
  
  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }
  
  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
  }
  
  private propagateToActiveTab(eventName: string) {    
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }

  checkRead() {
    this.gotNotifs = false;
    console.log("i ran");
  }

  ionSelected() {
    this.checkRead();
  }
}
