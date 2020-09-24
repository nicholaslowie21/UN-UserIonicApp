import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAdminsPageRoutingModule } from './view-admins-routing.module';

import { ViewAdminsPage } from './view-admins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAdminsPageRoutingModule
  ],
  declarations: [ViewAdminsPage]
})
export class ViewAdminsPageModule {}
