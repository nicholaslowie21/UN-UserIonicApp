import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferRewardsPage } from './transfer-rewards.page';

describe('TransferRewardsPage', () => {
  let component: TransferRewardsPage;
  let fixture: ComponentFixture<TransferRewardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferRewardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferRewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
