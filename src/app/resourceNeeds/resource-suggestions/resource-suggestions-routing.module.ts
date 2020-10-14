import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceSuggestionsPage } from './resource-suggestions.page';

const routes: Routes = [
  {
    path: '',
    component: ResourceSuggestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceSuggestionsPageRoutingModule {}
