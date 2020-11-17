import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTestimonialsPageRoutingModule } from './my-testimonials-routing.module';

import { MyTestimonialsPage } from './my-testimonials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTestimonialsPageRoutingModule
  ],
  declarations: [MyTestimonialsPage]
})
export class MyTestimonialsPageModule {}
