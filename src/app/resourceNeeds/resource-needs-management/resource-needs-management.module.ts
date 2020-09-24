import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourceNeedsManagementPageRoutingModule } from './resource-needs-management-routing.module';

import { ResourceNeedsManagementPage } from './resource-needs-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourceNeedsManagementPageRoutingModule
  ],
  declarations: [ResourceNeedsManagementPage]
})
export class ResourceNeedsManagementPageModule {}
