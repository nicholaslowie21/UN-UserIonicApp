import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterSplitPageRoutingModule } from './register-split-routing.module';

import { RegisterSplitPage } from './register-split.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterSplitPageRoutingModule
  ],
  declarations: [RegisterSplitPage]
})
export class RegisterSplitPageModule {}
