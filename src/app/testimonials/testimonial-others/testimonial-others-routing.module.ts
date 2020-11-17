import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestimonialOthersPage } from './testimonial-others.page';

const routes: Routes = [
  {
    path: '',
    component: TestimonialOthersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonialOthersPageRoutingModule {}
