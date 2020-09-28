import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOthersProjectsPageRoutingModule } from './view-others-projects-routing.module';

import { ViewOthersProjectsPage } from './view-others-projects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOthersProjectsPageRoutingModule
  ],
  declarations: [ViewOthersProjectsPage]
})
export class ViewOthersProjectsPageModule {}
