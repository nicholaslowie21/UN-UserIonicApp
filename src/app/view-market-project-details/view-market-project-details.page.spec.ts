import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMarketProjectDetailsPage } from './view-market-project-details.page';

describe('ViewMarketProjectDetailsPage', () => {
  let component: ViewMarketProjectDetailsPage;
  let fixture: ComponentFixture<ViewMarketProjectDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarketProjectDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMarketProjectDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
