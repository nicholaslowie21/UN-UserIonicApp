import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstitutionRegisterPageRoutingModule } from './institution-register-routing.module';

import { InstitutionRegisterPage } from './institution-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstitutionRegisterPageRoutingModule
  ],
  declarations: [InstitutionRegisterPage]
})
export class InstitutionRegisterPageModule {}
