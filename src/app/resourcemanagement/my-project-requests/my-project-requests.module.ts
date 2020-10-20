import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProjectRequestsPageRoutingModule } from './my-project-requests-routing.module';

import { MyProjectRequestsPage } from './my-project-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProjectRequestsPageRoutingModule
  ],
  declarations: [MyProjectRequestsPage]
})
export class MyProjectRequestsPageModule {}
