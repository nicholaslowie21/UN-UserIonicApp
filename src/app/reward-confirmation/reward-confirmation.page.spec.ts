import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RewardConfirmationPage } from './reward-confirmation.page';

describe('RewardConfirmationPage', () => {
  let component: RewardConfirmationPage;
  let fixture: ComponentFixture<RewardConfirmationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardConfirmationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RewardConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
