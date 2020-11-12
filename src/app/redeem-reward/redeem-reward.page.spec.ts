import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedeemRewardPage } from './redeem-reward.page';

describe('RedeemRewardPage', () => {
  let component: RedeemRewardPage;
  let fixture: ComponentFixture<RedeemRewardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemRewardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedeemRewardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
