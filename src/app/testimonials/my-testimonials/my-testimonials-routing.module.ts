import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTestimonialsPage } from './my-testimonials.page';

const routes: Routes = [
  {
    path: '',
    component: MyTestimonialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTestimonialsPageRoutingModule {}
