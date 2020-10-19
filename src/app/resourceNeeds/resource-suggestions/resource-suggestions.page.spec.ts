import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResourceSuggestionsPage } from './resource-suggestions.page';

describe('ResourceSuggestionsPage', () => {
  let component: ResourceSuggestionsPage;
  let fixture: ComponentFixture<ResourceSuggestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceSuggestionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceSuggestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
