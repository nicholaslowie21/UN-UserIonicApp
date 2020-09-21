import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProjectPageRoutingModule } from './update-project-routing.module';

import { UpdateProjectPage } from './update-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProjectPageRoutingModule
  ],
  declarations: [UpdateProjectPage]
})
export class UpdateProjectPageModule {}
