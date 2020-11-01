import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceRewardDetailsPage } from './view-marketplace-reward-details.page';

describe('ViewMarketplaceRewardDetailsPage', () => {
  let component: ViewMarketplaceRewardDetailsPage;
  let fixture: ComponentFixture<ViewMarketplaceRewardDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarketplaceRewardDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMarketplaceRewardDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
