import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateKpiPage } from './update-kpi.page';

describe('UpdateKpiPage', () => {
  let component: UpdateKpiPage;
  let fixture: ComponentFixture<UpdateKpiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKpiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateKpiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
