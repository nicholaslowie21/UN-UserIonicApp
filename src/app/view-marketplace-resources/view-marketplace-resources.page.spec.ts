import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceResourcesPage } from './view-marketplace-resources.page';

describe('ViewMarketplaceResourcesPage', () => {
  let component: ViewMarketplaceResourcesPage;
  let fixture: ComponentFixture<ViewMarketplaceResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarketplaceResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMarketplaceResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
