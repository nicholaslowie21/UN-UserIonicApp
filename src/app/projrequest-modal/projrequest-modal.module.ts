import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjrequestModalPageRoutingModule } from './projrequest-modal-routing.module';

import { ProjrequestModalPage } from './projrequest-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjrequestModalPageRoutingModule
  ],
  declarations: [ProjrequestModalPage]
})
export class ProjrequestModalPageModule {}
