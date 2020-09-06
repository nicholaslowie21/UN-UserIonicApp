import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestVerificationPageRoutingModule } from './request-verification-routing.module';

import { RequestVerificationPage } from './request-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestVerificationPageRoutingModule
  ],
  declarations: [RequestVerificationPage]
})
export class RequestVerificationPageModule {}
