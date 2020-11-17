import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestTestimonialPage } from './request-testimonial.page';

const routes: Routes = [
  {
    path: '',
    component: RequestTestimonialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestTestimonialPageRoutingModule {}
