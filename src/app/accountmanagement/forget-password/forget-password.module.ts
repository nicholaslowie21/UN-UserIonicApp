import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetpasswordPageRoutingModule } from './forget-password-routing.module';

import { ForgetpasswordPage } from './forget-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetpasswordPageRoutingModule
  ],
  declarations: [ForgetpasswordPage]
})
export class ForgetpasswordPageModule {}
