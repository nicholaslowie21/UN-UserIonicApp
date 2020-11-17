import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteTestimonialPageRoutingModule } from './write-testimonial-routing.module';

import { WriteTestimonialPage } from './write-testimonial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WriteTestimonialPageRoutingModule
  ],
  declarations: [WriteTestimonialPage]
})
export class WriteTestimonialPageModule {}
