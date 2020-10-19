import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourceSuggestionsPageRoutingModule } from './resource-suggestions-routing.module';

import { ResourceSuggestionsPage } from './resource-suggestions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourceSuggestionsPageRoutingModule
  ],
  declarations: [ResourceSuggestionsPage]
})
export class ResourceSuggestionsPageModule {}
