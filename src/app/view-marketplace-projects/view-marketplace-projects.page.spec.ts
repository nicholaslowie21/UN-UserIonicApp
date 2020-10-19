import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceProjectsPage } from './view-marketplace-projects.page';

describe('ViewMarketplaceProjectsPage', () => {
  let component: ViewMarketplaceProjectsPage;
  let fixture: ComponentFixture<ViewMarketplaceProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarketplaceProjectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMarketplaceProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
