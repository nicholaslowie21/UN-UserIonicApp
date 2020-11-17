import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestTestimonialPageRoutingModule } from './request-testimonial-routing.module';

import { RequestTestimonialPage } from './request-testimonial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestTestimonialPageRoutingModule
  ],
  declarations: [RequestTestimonialPage]
})
export class RequestTestimonialPageModule {}
