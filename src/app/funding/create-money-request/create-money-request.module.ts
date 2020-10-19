import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMoneyRequestPageRoutingModule } from './create-money-request-routing.module';

import { CreateMoneyRequestPage } from './create-money-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMoneyRequestPageRoutingModule
  ],
  declarations: [CreateMoneyRequestPage]
})
export class CreateMoneyRequestPageModule {}
