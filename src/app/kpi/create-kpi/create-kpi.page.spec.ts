import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateKpiPage } from './create-kpi.page';

describe('CreateKpiPage', () => {
  let component: CreateKpiPage;
  let fixture: ComponentFixture<CreateKpiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKpiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateKpiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
