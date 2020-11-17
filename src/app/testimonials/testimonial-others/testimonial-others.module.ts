import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestimonialOthersPageRoutingModule } from './testimonial-others-routing.module';

import { TestimonialOthersPage } from './testimonial-others.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestimonialOthersPageRoutingModule
  ],
  declarations: [TestimonialOthersPage]
})
export class TestimonialOthersPageModule {}
