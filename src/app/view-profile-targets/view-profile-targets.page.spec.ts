import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewProfileTargetsPage } from './view-profile-targets.page';

describe('ViewProfileTargetsPage', () => {
  let component: ViewProfileTargetsPage;
  let fixture: ComponentFixture<ViewProfileTargetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileTargetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProfileTargetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
