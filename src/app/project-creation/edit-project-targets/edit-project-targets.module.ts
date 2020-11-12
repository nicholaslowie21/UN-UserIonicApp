import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProjectTargetsPageRoutingModule } from './edit-project-targets-routing.module';

import { EditProjectTargetsPage } from './edit-project-targets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProjectTargetsPageRoutingModule
  ],
  declarations: [EditProjectTargetsPage]
})
export class EditProjectTargetsPageModule {}
