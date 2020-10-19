import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFundingNeedsPage } from './view-funding-needs.page';

describe('ViewFundingNeedsPage', () => {
  let component: ViewFundingNeedsPage;
  let fixture: ComponentFixture<ViewFundingNeedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFundingNeedsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFundingNeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
