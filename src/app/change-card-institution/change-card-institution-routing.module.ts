import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeCardInstitutionPage } from './change-card-institution.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeCardInstitutionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeCardInstitutionPageRoutingModule {}
