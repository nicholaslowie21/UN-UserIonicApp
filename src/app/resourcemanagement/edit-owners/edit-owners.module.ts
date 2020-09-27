import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOwnersPageRoutingModule } from './edit-owners-routing.module';

import { EditOwnersPage } from './edit-owners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOwnersPageRoutingModule
  ],
  declarations: [EditOwnersPage]
})
export class EditOwnersPageModule {}
