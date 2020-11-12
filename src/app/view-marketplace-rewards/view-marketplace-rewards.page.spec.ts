import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMarketplaceRewardsPage } from './view-marketplace-rewards.page';

describe('ViewMarketplaceRewardsPage', () => {
  let component: ViewMarketplaceRewardsPage;
  let fixture: ComponentFixture<ViewMarketplaceRewardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarketplaceRewardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMarketplaceRewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
