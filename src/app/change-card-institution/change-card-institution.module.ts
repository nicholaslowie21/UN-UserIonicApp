import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCardInstitutionPageRoutingModule } from './change-card-institution-routing.module';

import { ChangeCardInstitutionPage } from './change-card-institution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeCardInstitutionPageRoutingModule
  ],
  declarations: [ChangeCardInstitutionPage]
})
export class ChangeCardInstitutionPageModule {}
