import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateContributorsPage } from './rate-contributors.page';

describe('RateContributorsPage', () => {
  let component: RateContributorsPage;
  let fixture: ComponentFixture<RateContributorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateContributorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RateContributorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
